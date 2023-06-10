import {Component, Input} from '@angular/core';
import {ToolShowcaseModel} from "../interface/tool-showcase-model";
import {map, take, tap} from "rxjs";
import {GaussAlgoService, GaussOutput, RandomGaussMatrix} from "../service/gauss-algo.service";

@Component({
    selector: 'app-gauss-tool-showcase',
    templateUrl: './gauss-tool-showcase.component.html',
    styleUrls: ['./gauss-tool-showcase.component.scss']
})
export class GaussToolShowcaseComponent {
    hideAlertBox: boolean = false;

    protected m: number = 3;
    protected n: number = 3;

    protected rows: number[];
    protected columns: number[];

    protected correctDimensions: number = 0;
    protected incorrectMatrixInputs: number[] = [];

    protected matrixElements: string[] = new Array<string>(this.m * (this.n + 1)).fill(String(0));

    protected matrixHistory!: {den: string, num: string}[][][];
    protected matrixOperations!: string[];
    protected operationsOnPass!: number[];
    protected eqSysTransformationHistory!: {den: string, num: string}[][][];
    protected eqSysTransformationCopy: {den: string, num: string}[][] = [];
    protected containsIllegalEquation!: boolean;
    protected foundVariables!: number[];

    protected illegalEquationRow!: string;

    protected stringifiedSolutionList: string[] = new Array<string>(this.n).fill("");
    protected solutionListWithDependencies: string[][] = [];

    protected visualizedGaussAlgorithm: string = "";
    protected visualizedEquationSystem: string = "";
    protected visualizedSolution: string = "";

    protected numOfFreeVars: number = 0;
    protected generateFractions: boolean = false;
    protected generatingRadius: number = 20;
    protected illegalFreeVars: boolean = false;

    protected illegalRad: boolean = false;

    constructor(private gaussAlgoService: GaussAlgoService, private randomGaussMatrixService: RandomGaussMatrix) {
        this.rows = Array(this.m).map((x, i) => i);
        this.columns = Array(this.n + 1).map((x, i) => i);
    }

    public toolShowcaseActive: boolean = false;
    processLoading: boolean = false;

    setHideAlertBox() {
        this.hideAlertBox = !this.hideAlertBox;
    }

    @Input()
    gauss?: ToolShowcaseModel;

    setActive(toolShowcaseActive: boolean) {
        this.toolShowcaseActive = toolShowcaseActive;
    }

    getDisplayX(index: number): string {
        if (index < this.columns.length - 2) {
            return `$x_{${index + 1}} +$`
        } else if (index < this.columns.length - 1) {
            return `$x_{${index + 1}} =$`
        } else {
            return "";
        }
    }

    updateDimM(value: string) {
        if (Number(value) > 0 && Number(value) <= 10) {
            this.m = Number(value);
            this.rows = Array(this.m).map((x, i) => i);
            this.correctDimensions = 0;
            this.matrixElements = new Array<string>(this.m * (this.n + 1)).fill(String(0));
        } else {
            this.correctDimensions = 1;
        }
    }

    updateDimN(value: string) {
        if (Number(value) > 0 && Number(value) <= 10) {
            this.n = Number(value);
            this.columns = Array(this.n + 1).map((x, i) => i);
            this.correctDimensions = 0;
            this.matrixElements = new Array<string>(this.m * (this.n + 1)).fill(String(0));
            this.stringifiedSolutionList = new Array<string>(this.n).fill("");
        } else {
            this.correctDimensions = 2;
        }
    }

    setMatrixElement(at: number, value: string) {
        if (value == "") {
            this.matrixElements[at] = "0";
            if (this.incorrectMatrixInputs.includes(at)) {
                this.incorrectMatrixInputs = this.incorrectMatrixInputs.filter(function(e) { return e !== at })
            }
        } else if (Number.isInteger(Number(value))) {
            this.matrixElements[at] = value;
            if (this.incorrectMatrixInputs.includes(at)) {
                this.incorrectMatrixInputs = this.incorrectMatrixInputs.filter(function(e) { return e !== at })
            }
        } else if (Number.isInteger(Number(value.split("/", 2)[0]))
            && Number.isInteger(Number(value.split("/", 2)[1]))
            && value.split("/", 2)[1].length > 0
            && value.split("/", 2)[0].length > 0
            && Number(value.split("/", 2)[1]) > 0) {
            let split = value.split("/", 2);

            let numerator = Number(split[0]);
            let denominator = Number(split[1]);

            this.matrixElements[at] = numerator + "/" + denominator;
            this.incorrectMatrixInputs = this.incorrectMatrixInputs.filter(function(e) { return e !== at })
        } else {
            if (!this.incorrectMatrixInputs.includes(at)) {
                this.incorrectMatrixInputs.push(at)
            }
        }
    }


    getRandomMatrixOutput() {
        this.processLoading = true;

        this.randomGaussMatrixService.sendRandomMatrixRequest(this.generatingRadius, this.generateFractions, this.m, this.n, this.numOfFreeVars)
            .pipe(
                take(1),
                map((output: string[]) => {
                        this.matrixElements = output;
                    }
                ),
                tap(() => this.getGaussOutput())
            )
            .subscribe();
    }

    getGaussOutput(): void {
        this.processLoading = true;

        this.gaussAlgoService.sendGaussRequest(this.m, this.n + 1, this.matrixElements)
            .pipe(
                take(1),
                map((output: GaussOutput) => {
                        this.matrixHistory = output.matrixHistory;
                        this.matrixOperations = output.matrixOperations;
                        this.operationsOnPass = output.operationsOnPass;
                        this.eqSysTransformationHistory = output.eqSysTranformationHistory;
                        this.containsIllegalEquation = output.containsIllegalEquation;
                        this.foundVariables = output.foundVariables;
                    }
                ),
                tap(() => this.doDisplayProcedure())
            )
            .subscribe();
    }

    doDisplayProcedure() {
        this.processLoading = false;
        this.resetValues(this.m, this.n);

        this.visualizeGaussAlgorithm();
    }

    protected resetValues(m: number, n: number) {
        this.visualizedGaussAlgorithm = "";
        this.visualizedEquationSystem = "";
        this.visualizedSolution = "";
        this.matrixElements = new Array<string>(this.m * (this.n + 1)).fill(String(0));
        this.m = m;
        this.n = n;
        this.rows = Array(this.m).map((x, i) => i);
        this.columns = Array(this.n + 1).map((x, i) => i);
    }

    private visualizeGaussAlgorithm() {
        this.eqSysTransformationCopy = this.eqSysTransformationHistory[2].slice();
        this.visualizedGaussAlgorithm = `Wir schreiben das gegebene Gleichungssystem wie folgt als erweiterte Koeffizientenmatrix auf: <br>`
        this.visualizedGaussAlgorithm = this.visualizedGaussAlgorithm.concat(`\\begin{aligned} & \\left[\\begin{array}{`);

        for (let i = 0; i < this.matrixHistory[0][0].length; i++) {
            if (i < this.matrixHistory[0][0].length - 1) {
                this.visualizedGaussAlgorithm = this.visualizedGaussAlgorithm.concat("c")
            } else {
                this.visualizedGaussAlgorithm = this.visualizedGaussAlgorithm.concat("|c")
            }
        }

        this.visualizedGaussAlgorithm = this.visualizedGaussAlgorithm.concat("}");

        for (let i = 0; i < this.matrixHistory[0].length; i++) {
            for (let j = 0; j < this.matrixHistory[0][i].length; j++) {
                const { den, num } = this.matrixHistory[0][i][j];

                if (j < this.matrixHistory[0][i].length - 1) {
                    this.visualizedGaussAlgorithm = this.visualizedGaussAlgorithm.concat(this.generalNumberFormatter(
                        {den, num},
                        0,
                        false,
                        false,
                        false) + `&`);
                } else {
                    if (i < this.matrixHistory[0].length - 1) {
                        this.visualizedGaussAlgorithm = this.visualizedGaussAlgorithm.concat(this.generalNumberFormatter(
                            {den, num},
                            0,
                            false,
                            false,
                            false) + `\\\\`);
                    } else {
                        this.visualizedGaussAlgorithm = this.visualizedGaussAlgorithm.concat(this.generalNumberFormatter(
                            {den, num},
                            0,
                            false,
                            false,
                            false));
                    }
                }
            }
        }

        this.visualizedGaussAlgorithm = this.visualizedGaussAlgorithm.concat(`\\end{array}\\right]\\end{aligned}`);
        this.visualizedGaussAlgorithm = this.visualizedGaussAlgorithm.concat(`
            Die erweiterte Koeffizientenmatrix lässt sich dann mittels des Gauß-Algorithmus in eine
            Matrix in Zeilenstufenform überführen. <br>
            <div class="definition-box">
            Eine Matrix ist genau dann in <strong>Zeilenstufenform</strong>, wenn die folgenden drei Eigenschaften für diese gelten:
                <ol style="margin: 8px 0 0 0;">
                    <li>Alle Zeilen, in denen nur Nullen enthalten sind, stehen unten in der Matrix.</li>
                    <li>Sofern eine Zeile nicht nur Nullen enthält, so ist der Eintrag, der am weitesten links steht,
                    eine Eins. Diese Eins nennen wir führende Eins.</li>
                    <li>Wenn wir zwei beliebige Zeilen der Matrix betrachten, so steht die führende Eins der oberen Zeile
                    immer links (und nicht genau unter oder rechts) von der führenden Eins der unteren Zeile.</li>
                </ol>
            </div>
        `)
        if (this.matrixHistory.length == 1) {
            this.visualizedGaussAlgorithm = this.visualizedGaussAlgorithm.concat(`
                Weil die Matrix also schon in Zeilenstufenform ist,
                braucht der Gauß-Algorithmus nicht mehr angewendet zu werden. Es gilt:
            `)
        } else {
            this.visualizedGaussAlgorithm = this.visualizedGaussAlgorithm.concat(`
                Um die Matrix in Zeilenstufenform zu überführen, können wir wie folgt Operationen auf die Matrix anwenden.
                <br>
            `)
        }

        this.visualizedGaussAlgorithm = this.visualizedGaussAlgorithm.concat(`\\begin{align*}`);

        for (let h = 0; h < this.matrixHistory.length; h++) {
            if (h == 0) {
                this.visualizedGaussAlgorithm = this.visualizedGaussAlgorithm.concat(`\\left[\\begin{array}{`);
            } else {
                this.visualizedGaussAlgorithm = this.visualizedGaussAlgorithm.concat(`\\sim \\left[\\begin{array}{`);
            }

            for (let i = 0; i < this.matrixHistory[h][0].length; i++) {
                if (i < this.matrixHistory[h][0].length - 1) {
                    this.visualizedGaussAlgorithm = this.visualizedGaussAlgorithm.concat("c")
                } else {
                    this.visualizedGaussAlgorithm = this.visualizedGaussAlgorithm.concat("|c")
                }
            }

            this.visualizedGaussAlgorithm = this.visualizedGaussAlgorithm.concat("}");

            for (let i = 0; i < this.matrixHistory[h].length; i++) {
                for (let j = 0; j < this.matrixHistory[h][i].length; j++) {
                    const { den, num } = this.matrixHistory[h][i][j];

                    if (j < this.matrixHistory[h][i].length - 1) {
                        this.visualizedGaussAlgorithm =
                            this.visualizedGaussAlgorithm.concat(
                                this.generalNumberFormatter(this.matrixHistory[h][i][j], 0, false, false, false) + `&`);
                    } else {
                        if (i < this.matrixHistory[h].length - 1) {
                            this.visualizedGaussAlgorithm =
                                this.visualizedGaussAlgorithm.concat(
                                    this.generalNumberFormatter(this.matrixHistory[h][i][j], 0, false, false, false) + `\\\\`);
                        } else {
                            this.visualizedGaussAlgorithm =
                                this.visualizedGaussAlgorithm.concat(
                                    this.generalNumberFormatter(this.matrixHistory[h][i][j], 0, false, false, false));
                        }
                    }
                }
            }

            this.visualizedGaussAlgorithm = this.visualizedGaussAlgorithm.concat(`\\end{array}\\right]&`);
            this.visualizedGaussAlgorithm = this.visualizedGaussAlgorithm.concat(`\\begin{array}{l}`);

            for (let i = 0; i < this.matrixHistory[h].length; i++) {
                let currentMatrixOperations: string[] = [];
                let operationsExistsForRow: boolean = false;
                let num;
                let den;

                for (let o = 0; o < this.matrixOperations.length; o++) {
                    if (this.matrixOperations[o].split("::")[0] == h.toString()
                        && this.matrixOperations[o].split("::")[2] == i.toString()) {
                        currentMatrixOperations.push(this.matrixOperations[o])
                        operationsExistsForRow = true;
                    }
                }

                if (!operationsExistsForRow) {
                    currentMatrixOperations.push("dummy::dummy::dummy")
                }

                for (let o = 0; o < currentMatrixOperations.length; o++) {
                    let currentOperation: string[] = currentMatrixOperations[o].split("::");

                    if (i.toString() == currentOperation[2]) {
                        switch (currentOperation[1]) {
                            case "swap" :
                                this.visualizedGaussAlgorithm =
                                    this.visualizedGaussAlgorithm.concat(`
                                    \\quad \\mathrm{${this.int2roman(Number(currentOperation[2]) + 1)}}
                                    \\leftrightarrow
                                    \\mathrm{${this.int2roman(Number(currentOperation[3]) + 1)}}
                                `);
                                this.visualizedGaussAlgorithm =
                                    this.visualizedGaussAlgorithm.concat(o < currentMatrixOperations.length - 1
                                        ? `, \\!\\!\\!\\!\\!`
                                        : i < this.matrixHistory[h].length - 1 ? `\\\\` : ``);
                                break;
                            case "add" :
                                if (currentOperation[4].split("/").length == 2) {
                                    den = currentOperation[4].split("/")[1];
                                    num = currentOperation[4].split("/")[0];
                                } else {
                                    den = "1";
                                    num = currentOperation[4];
                                }
                                this.visualizedGaussAlgorithm =
                                    this.visualizedGaussAlgorithm.concat(`
                                    \\quad \\mathrm{${this.int2roman(Number(currentOperation[2]) + 1)}} +
                                    ${this.generalNumberFormatter({den, num}, 0, false, false, true)}
                                    \\mathrm{${this.int2roman(Number(currentOperation[3]) + 1)}}
                                `);
                                this.visualizedGaussAlgorithm =
                                    this.visualizedGaussAlgorithm.concat(o < currentMatrixOperations.length - 1
                                        ? `, \\!\\!\\!\\!\\!`
                                        : h < this.matrixHistory[h].length - 1 ? `\\\\` : ``);
                                break;
                            case "mult" :
                                if (currentOperation[3].split("/").length == 2) {
                                    den = currentOperation[3].split("/")[1];
                                    num = currentOperation[3].split("/")[0];
                                } else {
                                    den = "1";
                                    num = currentOperation[3];
                                }
                                this.visualizedGaussAlgorithm =
                                    this.visualizedGaussAlgorithm.concat(`
                                    \\quad \\mathrm{${this.int2roman(Number(currentOperation[2]) + 1)}} \\cdot
                                    ${this.generalNumberFormatter(
                                        {den, num},
                                        0,
                                        false,
                                        false,
                                        true)
                                    }
                                `);
                                this.visualizedGaussAlgorithm =
                                    this.visualizedGaussAlgorithm.concat(o < currentMatrixOperations.length - 1
                                        ? `, \\!\\!\\!\\!\\!`
                                        : h < this.matrixHistory[h].length - 1 ? `\\\\` : ``);
                                break;
                            case "dummy" :
                                this.visualizedGaussAlgorithm = this.visualizedGaussAlgorithm.concat(`\\\\`);
                                break;
                        }
                    } else {
                        this.visualizedGaussAlgorithm = this.visualizedGaussAlgorithm.concat(`\\\\`);
                    }
                }
            }

            this.visualizedGaussAlgorithm = this.visualizedGaussAlgorithm.concat(`\\end{array} \\\\`);
        }

        this.visualizedGaussAlgorithm = this.visualizedGaussAlgorithm.concat(`\\end{align*}`);


        for (let i = 0; i < this.n; i++) {
            this.solutionListWithDependencies[i] = new Array<string>(this.n + 1).fill(String(""));
        }

        this.visualizedEquationSystem = "Die erweiterte Koeffizientenmatrix kann dann im Weiteren wieder in das " +
            `entsprechende lineare Gleichungssystem überführt werden. Die Matrix ist dann mit dem folgenden äquivalenten Gleichungssystem zu assoziieren:<br>`;

        this.visualizedEquationSystem = this.visualizedEquationSystem.concat(`\\begin{aligned}`);


        for (let i = 0; i < this.matrixHistory[this.matrixHistory.length - 1].length; i++) {
            let firstVar = -1;
            this.visualizedEquationSystem =
                this.visualizedEquationSystem.concat(`\\mathrm{(${this.int2roman(i + 1)})} && \\quad `);

            for (let j = 0; j < this.matrixHistory[this.matrixHistory.length - 1][i].length; j++) {
                if (this.matrixHistory[this.matrixHistory.length - 1][i][j].num != "0") {
                    firstVar = j;

                    if (firstVar == this.matrixHistory[this.matrixHistory.length - 1][i].length - 1) {
                        this.illegalEquationRow = `\\mathrm{` + this.int2roman(i + 1) + `}`;
                    }

                    break;
                }
            }

            for (let j = 0; j < this.matrixHistory[0][i].length; j++) {
                let currVar = this.matrixHistory[this.matrixHistory.length - 1][i][j];

                if (j == this.matrixHistory[0][i].length - 1) {
                    if (firstVar == this.matrixHistory[0][i].length - 1 || firstVar == -1) {
                        this.visualizedEquationSystem = this.visualizedEquationSystem.concat("0");
                    }
                    this.visualizedEquationSystem = this.visualizedEquationSystem.concat(" & = ");
                }

                if (j == firstVar && j < this.matrixHistory[0][i].length - 2) {
                    this.visualizedEquationSystem = this.visualizedEquationSystem.concat(
                        this.generalNumberFormatter(currVar, j + 1, false,
                            true,
                            false));
                } else if (j == firstVar && j < this.matrixHistory[0][i].length - 1) {
                    this.visualizedEquationSystem = this.visualizedEquationSystem.concat(
                        this.generalNumberFormatter(currVar, j + 1, false,
                            false,
                            false));
                } else if (j != this.matrixHistory[0][i].length - 1) {
                    this.visualizedEquationSystem = this.visualizedEquationSystem.concat(
                        this.generalNumberFormatter(currVar, j + 1, true,
                            true,
                            false));
                } else {
                    this.visualizedEquationSystem = this.visualizedEquationSystem.concat(
                        this.generalNumberFormatter(currVar, 0, false,
                            false,
                            false));
                }

                if (j == this.matrixHistory[0][i].length - 1) {
                    if (i != this.m - 1) {
                        this.visualizedEquationSystem = this.visualizedEquationSystem.concat("\\\\");
                    }
                }
            }
        }

        this.visualizedEquationSystem = this.visualizedEquationSystem.concat(`\\end{aligned}`);

        if (this.containsIllegalEquation) {
            this.visualizedEquationSystem = this.visualizedEquationSystem.concat(`
                Aus dem Gleichungssystem folgt, dass $0 = 1$ gelte. Das führt zu einem
                Widerspruch. Folglich existiert keine Lösung für die Gleichung $\\mathrm{${this.illegalEquationRow}}$
                und damit auch kein Vektor $\\ell$, der das Gleichungssystem löst.
            `);
            this.eqSysTransformationHistory = null!;
            return;
        }

        this.visualizedEquationSystem = this.visualizedEquationSystem.concat(`Mittels Rückwärtssubstitution erhalten wir im
         Folgenden eine Lösung für die Unbekannten $`);

        for (let j = 0; j < this.n; j++) {
            this.visualizedEquationSystem = this.visualizedEquationSystem.concat(j < this.n - 1 ? `x_{${j + 1}},` : `x_{${j + 1}}`);
        }

        this.visualizedEquationSystem = this.visualizedEquationSystem.concat(`$. Das tun wir wie folgt:`);
        this.visualizedEquationSystem = this.visualizedEquationSystem.concat(`\\begin{aligned}`);

        let old: string = "";

        for (let i = 0; i < this.eqSysTransformationHistory[0].length; i++) {
            let oldH: number = 0;
            for (let h = 0; h < this.eqSysTransformationHistory.length; h++) {
                let firstVar = -1;

                for (let j = 0; j < this.eqSysTransformationHistory[h][i].length; j++) {
                    if (this.eqSysTransformationHistory[h][i][j].num != "0") {
                        firstVar = j;

                        if (firstVar == this.matrixHistory[this.matrixHistory.length - 1][i].length - 1) {
                            this.illegalEquationRow = `\\mathrm{` + this.int2roman(i + 1) + `}`;
                        }

                        break;
                    }
                }

                for (let j = this.eqSysTransformationHistory[h][i].length - 1; j > 0; j--) {
                    if (this.eqSysTransformationHistory[h][i][j].num != "0"
                        || j == this.eqSysTransformationHistory[h][i].length / 2) {
                        firstVar = j;

                        if (firstVar == this.matrixHistory[this.matrixHistory.length - 1][i].length - 1) {
                            this.illegalEquationRow = `\\mathrm{` + this.int2roman(i + 1) + `}`;
                        }

                        break;
                    }
                }

                let line: string = this.getFrontOfEqSign(this.eqSysTransformationHistory[h][i])
                    .concat("& =".concat(this.getBackOfEqSign(this.eqSysTransformationHistory[h][i], i)));

                this.visualizedEquationSystem = this.visualizedEquationSystem.concat(
                    line == old && h != oldH
                        ? ""
                        : `\\\\ ${h == 0
                            ? `(\\mathrm{${this.int2roman(this.eqSysTransformationHistory[h].length - i)}})`
                            : ""} && ${h > 0 ? "\\Leftrightarrow " : ""}` + line
                );


                oldH = h;
                old = line.slice();
            }
        }

        let stringifiedSolutionListCopy = this.stringifiedSolutionList.slice();

        stringifiedSolutionListCopy.reverse();

        this.visualizedEquationSystem = this.visualizedEquationSystem.concat(`\\end{aligned}`);

        let solutionDefinite: boolean = true;

        for (let j = 0; j < stringifiedSolutionListCopy.length; j++) {
            for (let k = 0; k < stringifiedSolutionListCopy.length; k++) {
                if (stringifiedSolutionListCopy[j].includes("x")) {
                    solutionDefinite = false;
                }
            }
        }

        if (solutionDefinite && this.getDependencies().length == 0) {
            this.visualizedSolution = this.visualizedSolution.concat(`Aus dem Rückwärtssubstituieren folgt für alle
             Unbekannten $x_i$ eine eindeutige Lösung. Folglich hat das Gleichungssystem nur eine Lösung. Mit dieser
              lässt sich auch ein eindeutiger Lösungsvektor aufstellen.
              Sei $\\ell$ dazu ein $${this.n}$-Tupel, für das gilt: \\begin{gather*}`);

            this.visualizedSolution = this.visualizedSolution.concat(`\\ell = \\left(`);

            for (let j = 0; j < this.n; j++) {
                if (j < this.n - 1) {
                    this.visualizedSolution = this.visualizedSolution.concat(`x_{${j + 1}}, `);
                } else {
                    this.visualizedSolution = this.visualizedSolution.concat(`x_{${j + 1}}`);
                }
            }

            this.visualizedSolution = this.visualizedSolution.concat(`\\right) = \\left(`);

            for (let j = 0; j < this.n; j++) {
                if (j < this.n - 1) {
                    this.visualizedSolution = this.visualizedSolution.concat(`${stringifiedSolutionListCopy[j]}, `);
                } else {
                    this.visualizedSolution = this.visualizedSolution.concat(`${stringifiedSolutionListCopy[j]}`);
                }
            }

            this.visualizedSolution = this.visualizedSolution.concat(`\\right).\\end{gather*} Damit haben wir für unser
            anfängliches Gleichungssystem mittels Gauß-Algorithmus einen Lösungsvektor $\\ell$ gefunden, der dieses
            eindeutig löst.`);
        } else {
            this.visualizedSolution = this.visualizedSolution.concat(`Aus dem Rückwärtssubstituieren folgt für alle
             Unbekannten $x_i$ eine nicht-eindeutige Lösung. Folglich hat das Gleichungssystem unendlich viele Lösungen.
             <br>
             In diesem Falle stellen wir eine allgemeine Lösung als Linearkombination, also in Parameterform dar.
              Sei $\\ell$ dazu ein $(${this.n} \\times 1)$-Vektor mit allen $x_i$ der Form \\begin{gather*}`);

            this.visualizedSolution = this.visualizedSolution.concat(`\\ell = \\left(`);

            for (let j = 0; j < this.n; j++) {
                if (j < this.n - 1) {
                    this.visualizedSolution = this.visualizedSolution.concat(`x_{${j + 1}}, `);
                } else {
                    this.visualizedSolution = this.visualizedSolution.concat(`x_{${j + 1}}`);
                }
            }

            this.visualizedSolution = this.visualizedSolution.concat(`\\right)\\end{gather*} und `);

            if (this.getDependencies().length == 1) {
                this.visualizedSolution =
                    this.visualizedSolution.concat(`$\\lambda \\in \\mathbb{Q}$, sodass dieses der freien Variable wie folgt entspricht:
                     $\\lambda = x_{${this.getDependencies()[0] - this.n}}$.
                    Dann gilt mit diesen im Weiteren: \\begin{gather*}`);
            } else {
                this.visualizedSolution = this.visualizedSolution.concat(`$`);

                for (let i = 0; i < this.getDependencies().length; i++) {
                    this.visualizedSolution =
                        this.visualizedSolution.concat(`\\lambda_{${this.getDependencies()[i] - this.n}}`);
                    this.visualizedSolution =
                        this.visualizedSolution.concat(i < this.getDependencies().length - 1 ? "," : "");
                }

                this.visualizedSolution = this.visualizedSolution.concat(`\\in \\mathbb{Q}$, sodass diese $\\lambda_i$ den freien Variablen wie folgt entsprechen: $`);

                for (let i = 0; i < this.getDependencies().length; i++) {
                    this.visualizedSolution =
                        this.visualizedSolution.concat(`\\lambda_{${this.getDependencies()[i] - this.n}} = x_{${this.getDependencies()[i] - this.n}}`);
                    this.visualizedSolution =
                        this.visualizedSolution.concat(i < this.getDependencies().length - 2 ? "$, $" : i < this.getDependencies().length - 1 ? "$ und $" : "");
                }

                this.visualizedSolution = this.visualizedSolution.concat(`$. Dann gilt mit diesen im Weiteren: \\begin{gather*}`);
            }

            this.visualizedSolution = this.visualizedSolution.concat(`\\ell =`);

            this.eqSysTransformationCopy.reverse();

            this.visualizedSolution = this.visualizedSolution.concat(`\\begin{bmatrix}`);

            for (let j = 0; j < this.n; j++) {
                if (j < this.n - 1) {
                    this.visualizedSolution = this.visualizedSolution.concat(`x_{${j + 1}} \\\\`);
                } else {
                    this.visualizedSolution = this.visualizedSolution.concat(`x_{${j + 1}}`);
                }
            }

            this.visualizedSolution = this.visualizedSolution.concat(`\\end{bmatrix} = `);

            let columnIsAllZeroes: boolean = true;

            this.foundVariables.reverse();

            for (let j = 0; j < this.eqSysTransformationHistory[2].length; j++) {
                if (this.generalNumberFormatter(
                    this.eqSysTransformationCopy[j][this.n],
                    0,
                    false,
                    false,
                    false) != "0") {
                    columnIsAllZeroes = false;
                }
            }

            for (let i = 0; i <= this.getDependencies().length; i++) {
                if (i == 0) {
                    if (!columnIsAllZeroes) {
                        this.visualizedSolution = this.visualizedSolution.concat(`\\begin{bmatrix}`);

                        for (let j = 0; j < this.n; j++) {
                            if (j < this.m) {
                                this.visualizedSolution =
                                    this.visualizedSolution.concat(this.generalNumberFormatter(
                                        this.eqSysTransformationCopy[j][this.n],
                                        0,
                                        false,
                                        false,
                                        false));
                            } else {
                                this.visualizedSolution =
                                    this.visualizedSolution.concat("0");
                            }

                            if (j < this.n - 1) {
                                this.visualizedSolution =
                                    this.visualizedSolution.concat("\\\\");
                            }
                        }

                        this.visualizedSolution = this.visualizedSolution.concat(`\\end{bmatrix}`);
                    }
                } else {
                    this.visualizedSolution = this.visualizedSolution.concat(!columnIsAllZeroes ? `+` : "");

                    columnIsAllZeroes = false;

                    this.visualizedSolution = this.visualizedSolution.concat(`\\lambda${this.getDependencies().length > 1 ? `_{${(this.getDependencies()[i - 1] - this.n).toString()}}` : ""}`);

                    this.visualizedSolution = this.visualizedSolution.concat(`\\begin{bmatrix}`);

                    for (let j = 0; j < this.n; j++) {
                        if (this.foundVariables.includes(j)) {
                            this.visualizedSolution =
                                this.visualizedSolution.concat(this.getDependencies()[i - 1] - this.n - 1 != j ?
                                    this.generalNumberFormatter(
                                        this.eqSysTransformationCopy[this.foundVariables.indexOf(j)][this.getDependencies()[i - 1]],
                                        0,
                                        false,
                                        false,
                                        false) : "1");
                        } else {
                            this.visualizedSolution =
                                this.visualizedSolution.concat(this.getDependencies()[i - 1] - this.n - 1 != j ? "0" : "1");
                        }

                        if (j < this.n - 1) {
                            this.visualizedSolution = this.visualizedSolution.concat("\\\\");
                        }
                    }

                    this.visualizedSolution = this.visualizedSolution.concat(`\\end{bmatrix}`);
                }
            }

            this.visualizedSolution = this.visualizedSolution.concat(`.\\end{gather*}`);

            this.visualizedSolution = this.visualizedSolution.concat(`Damit haben wir für unser
            anfängliches Gleichungssystem mittels Gauß-Algorithmus einen Lösungsvektor $\\ell$ gefunden, der das Gleichungssystem
            allgemein löst.`);
        }

    }
    getDependencies() {
        let dependencyList: number[] = [];

        for (let j = this.matrixHistory[0][0].length; j < this.eqSysTransformationHistory[2][0].length; j++) {
            if (this.isDependency(j) && !dependencyList.includes(j)) {
                dependencyList.push(j);
            }
        }

        return dependencyList;
    }

    isDependency(column: number) {
        let isDependency: boolean = false;

        for (let j = this.matrixHistory[0][0].length - 1; j < this.eqSysTransformationHistory[2][0].length; j++) {
            for (let i = 0; i < this.m; i++) {
                if (this.eqSysTransformationHistory[2][i][column].num != "0") {
                    isDependency = true;
                }
            }
        }

        if (!isDependency) {
            isDependency = true;

            for (let j = 0; j < this.matrixHistory[0][0].length; j++) {
                for (let i = 0; i < this.m; i++) {
                    if (this.matrixHistory[this.matrixHistory.length - 1][i][column - this.n - 1].num != "0") {
                        isDependency = false;
                    }
                }
            }
        }

        return isDependency;
    }

    getFrontOfEqSign = (matrixRow: { den: string, num: string }[]): string => {
        let output: string = "";
        let firstVar: number = -1;

        for (let j = 0; j < matrixRow.length; j++) {
            if (matrixRow[j].num != "0"
                || j == matrixRow.length / 2) {
                firstVar = j;

                break;
            }
        }

        if (firstVar != -1) {
            for (let j = firstVar; j < (matrixRow.length - 1)/2; j++) {
                if (j == firstVar) {
                    output = output.concat(this.generalNumberFormatter(matrixRow[j], j + 1, false,
                        true,
                        false));
                } else {
                    output = output.concat(this.generalNumberFormatter(matrixRow[j], j + 1, true,
                        true,
                        false));
                }
            }
        }

        if (output == "") {
            return "0";
        } else return output;
    }

    getBackOfEqSign = (matrixRow: { den: string, num: string }[], iIndex: number): string => {
        let output: string = "";
        let lastVar: number = matrixRow.length - 1;
        let firstVar: number = parseInt(String(matrixRow.length / 2));

        for (let j = parseInt(String(matrixRow.length / 2)); j < matrixRow.length; j++) {
            if (matrixRow[j].num != "0") {
                firstVar = j;

                break;
            }
        }

        for (let j = matrixRow.length - 1; j >= 0; j--) {
            if (matrixRow[j].num != "0"
                && j == matrixRow.length / 2 + 1) {
                lastVar = j;

                break;
            }
        }

        for (let j = (matrixRow.length - 1)/2; j < matrixRow.length; j++) {
            if (j == (matrixRow.length - 1)/2) {
                output = output.concat(
                    this.generalNumberFormatter(
                        matrixRow[j],
                        0,
                        false,
                        true,
                        false));
            } else if (j == firstVar) {
                output = output.concat(
                    this.generalNumberFormatter(
                        matrixRow[j],
                        j <= (matrixRow.length - 1)/2
                            ? j + 1
                            : parseInt(String(j - (matrixRow.length) / 2)) + 1,
                        false,
                        true,
                        false));
            } else {
                output = output.concat(
                    this.generalNumberFormatter(
                        matrixRow[j],
                        j <= (matrixRow.length - 1)/2
                            ? j + 1
                            : parseInt(String(j - (matrixRow.length) / 2)) + 1,
                        true,
                        true,
                        false));
            }
        }

        if (output == "") {
            this.stringifiedSolutionList[iIndex] = "0";
            return "0";
        } else {
            this.stringifiedSolutionList[iIndex] = output;
            return output;
        }
    }

    generalNumberFormatter(fraction: {den: string, num: string}, index: number, getAllSigns: boolean, hideZeroes: boolean, usePars: boolean): string {
        let formattedFraction: string = "";

        let newNum = fraction.num;
        let numIsNegative = fraction.num.toString().includes("-");

        if (numIsNegative && usePars) {
            formattedFraction = formattedFraction.concat("(")
        }

        if (numIsNegative) {
            newNum = fraction.num.toString().replace("-", "");
            formattedFraction = formattedFraction.concat(`-`);
        } else if (getAllSigns && fraction.num != "0") {
            formattedFraction = formattedFraction.concat(`+`);
        }

        if (fraction.den == "1" && fraction.num != "0") {
            formattedFraction = formattedFraction.concat(newNum == "1" && index > 0 ? "" : newNum);
        } else if (newNum != "0") {
            formattedFraction = formattedFraction.concat(`\\frac{${newNum}}{${fraction.den}}`);
        } else {
            formattedFraction = formattedFraction.concat(hideZeroes ? `` : "0");
        }

        formattedFraction = formattedFraction.concat(index > 0 && newNum != "0" ? `x_{${index}}` : "");

        if (numIsNegative && usePars) {
            formattedFraction = formattedFraction.concat(")")
        }

        return formattedFraction;
    }

    int2roman = (original: number): string => {
        if (original < 1 || original > 3999) {
            throw new Error('Error: Input integer limited to 1 through 3,999');
        }

        const numerals = [
            ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'], // 1-9
            ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'], // 10-90
            ['C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'], // 100-900
            ['M', 'MM', 'MMM'], // 1000-3000
        ];

        const digits = Math.round(original).toString().split('');
        let position = (digits.length - 1);

        return digits.reduce((roman, digit) => {
            if (digit !== '0') {
                roman += numerals[position][parseInt(digit) - 1];
            }

            position -= 1;

            return roman;
        }, '');
    }

    toggleFreeVars() {
        if (this.numOfFreeVars != -1) {
            this.numOfFreeVars = -1;
            this.illegalFreeVars = false;
        } else {
            this.numOfFreeVars = 0;
            this.illegalFreeVars = false;
        }
    }

    toggleGenerateFractions() {
        this.generateFractions = !this.generateFractions;
    }

    setFreeVars(freeVars: string) {
        if (Number(freeVars) > this.n || Number(freeVars) < -1) {
            if (Number(freeVars) == -1) {
                this.numOfFreeVars = -1;
                this.illegalFreeVars = false;
            }
            this.illegalFreeVars = true;
        } else {
            this.numOfFreeVars = Number(freeVars);
            this.illegalFreeVars = false;
        }
    }

    setRadius(rad: string) {
        if (Number(rad) < 0 || Number(rad) > 100) {
            this.illegalRad = true;
        } else {
            this.generatingRadius = Number(rad);
            this.illegalRad = false;
        }
    }

    getFreeVarsInterval(val: string) {
        return `Die Anzahl der freien Variablen sollte im Bereich $0 - ${val}$ liegen`;
    }

    protected readonly Number = Number;
}
