import {Component, Input, OnInit} from '@angular/core';
import {ToolShowcaseModel} from "../interface/tool-showcase-model";
import {map, take, tap} from "rxjs";
import {rsaOutputWithKey, rsaOutputWithPrimes, RSAService} from "../service/rsa.service";

@Component({
  selector: 'app-rsa-tool-showcase',
  templateUrl: './rsa-tool-showcase.component.html',
  styleUrls: ['./rsa-tool-showcase.component.scss']
})
export class RsaToolShowcaseComponent implements OnInit {
    @Input()
    rsa?: ToolShowcaseModel;

    processLoading: boolean = false;
    hideAlertBox: boolean = false;

    validRange: string = "";

    // procedure with rsa key

    factorizationProcess: string = "";

    // procedure with rsa primes

    findRSAModulProcess: string = "";

    // procedure common

    eulerTotientProcess: string = "";
    findingGCDProcess: string = "";
    gcd: number = 0;
    extendGCDProcess: string = "";
    findCongurenceProcess: string = "";
    displayKeys: string = "";
    foundKey: number = 0;

    min: number = 0;
    max: number = 0;

    e: number = 0;
    p: number = 0;
    q: number = 0;
    N: number = 0;
    exception: number = 0;

    totientComponents?: number[];
    eulerTotient?: number;
    primeFactors?: number[];
    divisorFormatList?: number[][];
    extendedGCDList?: number[][];

    constructor(private rsaService: RSAService) {
    }

    public toolShowcaseActive!: boolean;

    setActive(toolShowcaseActive: boolean) {
        this.toolShowcaseActive = toolShowcaseActive;
    }

    setHideAlertBox() {
        this.hideAlertBox = !this.hideAlertBox;
    }

    ngOnInit(): void {
    }

    getRSAOutputWithGeneratedKey(): void {
        this.resetProcedure();
        this.processLoading = true;

        this.rsaService.sendGenerateRSAKeySetRequest(this.min, this.max)
            .pipe(
                take(1),
                map((output: number[]) => {
                        this.N = output[0];
                        this.e = output[1];
                    }
                ),
                tap(() => this.getRSAOutputWithKey())
            )
            .subscribe();
    }

    getRSAOutputWithGeneratedPrimes(): void {
        this.resetProcedure();
        this.processLoading = true;

        this.rsaService.sendGenerateRSAPrimesSetRequest(this.min, this.max)
            .pipe(
                take(1),
                map((output: number[]) => {
                        this.p = output[0];
                        this.q = output[1];
                        this.e = output[2];
                    }
                ),
                tap(() => this.getRSAOutputWithPrimes())
            )
            .subscribe();
    }

    getRSAOutputWithKey(): void {
        this.processLoading = true;

        if (this.e == null) {
            this.resetProcedure();
            this.processLoading = false;
            this.exception = 19;

            return;
        }

        this.rsaService.sendRSAWithKeyRequest(
            this.e,
            this.N
        )
            .pipe(
                take(1),
                map((output: rsaOutputWithKey) => {
                        this.exception = output.exception;
                        this.totientComponents = output.totientComponents;
                        this.eulerTotient = output.eulerTotient;
                        this.primeFactors = output.primeFactors;
                        this.divisorFormatList = output.divisorFormatList;
                        this.extendedGCDList = output.extendedGCDList;
                    }
                ),
                tap(() => this.doRSAWithKeyProcedure())
            )
            .subscribe();
    }

    getRSAOutputWithPrimes(): void {
        this.processLoading = true;

        if (this.e == null) {
            this.processLoading = false;
            this.exception = 19;

            return;
        }

        this.processLoading = true;

        this.rsaService.sendRSAWithPrimesRequest(
            this.p,
            this.q,
            this.e
        )
            .pipe(
                take(1),
                map((output: rsaOutputWithPrimes) => {
                        this.exception = output.exception;
                        this.totientComponents = output.totientComponents;
                        this.eulerTotient = output.eulerTotient;
                        this.divisorFormatList = output.divisorFormatList;
                        this.extendedGCDList = output.extendedGCDList;
                    }
                ),
                tap(() => this.doRSAWithPrimesProcedure())
            )
            .subscribe();
    }

    refreshInputs(procedure: string, newE: string, newP: string, newQ: string, newN: string): void {
        this.resetProcedure();

        if (procedure == "with-key") {
            if (!Number.isInteger(Number(newE)))
            {
                this.exception = 23;
                return;
            }

            if (!Number.isInteger(Number(newN)))
            {
                this.exception = 24;
                return;
            }

            this.e = Number(newE);
            this.N = Number(newN);

            if (this.e > 2147483647) {
                this.exception = 12;
                return;
            } else if (this.N > 2147483647) {
                this.exception = 15;
                return;
            } else {
                this.getRSAOutputWithKey();
            }
        } else if (procedure == "with-primes") {
            if (!Number.isInteger(Number(newE)))
            {
                this.exception = 23;
                return;
            }

            if (!Number.isInteger(Number(newP)))
            {
                this.exception = 21;
                return;
            }

            if (!Number.isInteger(Number(newQ)))
            {
                this.exception = 22;
                return;
            }

            this.e = Number(newE);
            this.p = Number(newP);
            this.q = Number(newQ);

            if (this.e > 2147483647) {
                this.exception = 12;
                return;
            } else if ((this.p * this.q) > 2147483647) {
                this.exception = 27;
                return;
            } else {
                this.getRSAOutputWithPrimes();
            }
        }
    }

    randomInputs(procedure: string, min: string = '0', max: string = '0'): void {
        this.resetProcedure();

        if (!Number.isInteger(Number(min)))
        {
            this.exception = 25;
            return;
        }

        if (!Number.isInteger(Number(max)))
        {
            this.exception = 26;
            return;
        }

        this.min = Number(min);
        this.max = Number(max);

        if (this.min > this.max) {
            this.exception = 18;
            return;
        } else if (this.min > 256 || this.min <= 1) {
            this.exception = 16;
            return;
        } else if (this.max > 256 || this.max <= 1) {
            this.exception = 17;
            return;
        }

        if (procedure == "with-key") {
            this.getRSAOutputWithGeneratedKey();

            return;
        }

        this.getRSAOutputWithGeneratedPrimes();
    }

    resetProcedure(): void {
        this.p = 0;
        this.q = 0;
        this.e = 0;
        this.N = 0;
        this.exception = 0;

        this.totientComponents = [];
        this.eulerTotient = 0;
        this.primeFactors = [];
        this.divisorFormatList = [];
        this.extendedGCDList = [];

        this.factorizationProcess = "";

        // procedure with rsa primes

        this.findRSAModulProcess = "";

        // procedure common

        this.eulerTotientProcess = "";
        this.findingGCDProcess = "";
        this.gcd = 0;
        this.extendGCDProcess = "";
        this.findCongurenceProcess = "";
        this.displayKeys = "";
        this.foundKey = 0;
    }
    setPrimeP(value: string) {
        this.p = Number(value);
    }

    setPrimeQ(value: string) {
        this.q = Number(value);
    }

    setE(value: string) {
        this.e = Number(value);
    }

    setN(value: string) {
        this.N = Number(value);
    }
    // rsa primes procedure

    doRSAWithPrimesProcedure(): void {
        this.processLoading = false;

        this.validRange = "$e$ ist so zu wählen, " +
            "dass $(1 <) e < \\varphi (N)$ und $\\operatorname{ggT}(e, \\varphi (N)) = 1$ ($e$ ist teilerfremd zu $\\varphi (N)$) " +
            "gilt.";

        this.validRange +=
            ` $e$ muss also in der Menge $[1; ${this.eulerTotient! - 1}] \\cap \\mathbb{N}$ liegen.`;

        if (this.exception == 1 || this.exception == 4 || this.exception == 5) {
            return;
        }

        let formattedGCDList = "";

        if (this.p && this.q && this.e) {
            this.findRSAModulProcess =
            `
                Für das Verfahren seien die Werte
                \\begin{align}
                    p & = ${String(this.p)} \\tag{I}\\\\
                    q & = ${String(this.q)} \\tag{II}\\\\
                    e & = ${String(this.e)} \\tag{III}
                \\end{align}
                gegeben.
                <br/>
                <br/>
                Aus den gegebenen Primfaktoren $p = ${String(this.p)}$ und $q = ${String(this.q)}$ lässt sich der
                entsprechende RSA-Modul berechnen. Es gilt $N = p \\cdot q = ${String(this.p)} \\cdot
                ${String(this.q)} = ${String(this.p * this.q)}$. Im Nachfolgenden kann die
                eulersche $\\varphi$-Funktion des Moduls berechnet werden.
            `

            this.N = this.p * this.q;

            if (this.p != this.q) {
                this.eulerTotient = (this.p - 1) * (this.q - 1);
                this.eulerTotientProcess =
                    `
                    <div class="definition-box">Wir definieren die eulersche $\\varphi$-Funktion wie folgt:
                    $\\varphi : \\mathbb{N} \\to \\mathbb{N}$ mit $\\varphi(n) := \\big\\vert \\{a \\in \\mathbb{N} : 1 \\leq a \\leq n \\land \\operatorname{ggT}(a,n) = 1\\} \\big\\vert$ oder $\\varphi(n) = \\displaystyle\\sum\\limits_{\\scriptstyle 1 \\leq a \\leq n \\atop \\operatorname{ggT}(a,n) = 1} 1$.
                    Sie gibt die Anzahl aller teilerfremden natürlichen Zahlen zu einer natürlichen Zahl $n$ an.</div>
                    Weil hier zwei verschiedene Primfaktoren vorliegen, lässt sich die $\\varphi$-Funktion also wie folgt berechnen:
                    es gilt $\\varphi (N) := \\varphi (p) \\cdot \\varphi (q) := (p - 1) \\cdot (q - 1)$ - denn es wird von jedem einzigartigen Primfaktor genau einmal $1$ abgezogen.
                    <br/>
                    <br/>
                    Damit ergibt sich $\\varphi (${this.N}) $$\\: = (${this.p} - 1) \\cdot (${this.q} - 1)$
                    $\\: = ${this.eulerTotient}$.
                    <br/>
                    <br/>
                    Mittels $\\varphi (${this.N})$ lässt sich nun versuchen, ein $d$ für den Schlüssel
                    $(d,N)$ zu finden, sodass $e \\cdot d \\equiv 1 \\pmod{\\varphi (${this.N})}$ ist. Bei dem gesuchten $d$ handelt
                    es sich also um das multiplikative Inverse $[${this.e}]_{\\varphi (N)}^{-1}$ von $[${this.e}]_{\\varphi (N)}$
                    oder von $${this.e}$ in $\\mathbb{Z}/${this.eulerTotient}\\mathbb{Z}$ (Alt. $\\mathbb{Z}_{${this.eulerTotient}}$).
                `

                if (this.e == 1) {
                    this.eulerTotientProcess +=
                    `
                        <div class="definition-box">Weil $${this.e}$ in $\\mathbb{Z}/${this.eulerTotient}\\mathbb{Z}\\:(\\mathbb{Z}_{${this.eulerTotient}})$ bezüglich der Multiplikation
                        das neutrale Element ist, ist $${this.e}$ stets zu sich selbst invers. Damit ist $[${this.e}]_{\\varphi (N)}^{-1}
                        = [${this.e}]_{\\varphi (N)}$. Bei $d$ handelt es sich also um $${this.e}$.</div>
                    `;

                    this.displayKeys =
                        `
                        Wir erhalten das Schlüsselpaar
                        \\begin{array}{|l|l|}
                            \\hline
                            (e, N) & (${this.e}, ${this.N})\\\\
                            \\hline
                            (d, N) & (${this.foundKey}, ${this.N})\\\\
                            \\hline
                        \\end{array}
                        $(d,N)$ ist der private Schlüssel und $(e,N)$ der öffentliche.
                    `

                    this.exception = 20;
                    return;
                }
            } else {
                this.eulerTotient = (this.p - 1) * (this.q);
                this.eulerTotientProcess =
                    `
                    <div class="definition-box">Wir definieren die eulersche $\\varphi$-Funktion wie folgt:
                    $\\varphi : \\mathbb{N} \\to \\mathbb{N}$ mit $\\varphi(n) := \\big\\vert \\{a \\in \\mathbb{N} : 1 \\leq a \\leq n \\land \\operatorname{ggT}(a,n) = 1\\} \\big\\vert$ oder $\\varphi(n) = \\displaystyle\\sum\\limits_{\\scriptstyle 1 \\leq a \\leq n \\atop \\operatorname{ggT}(a,n) = 1} 1$.
                    Sie gibt die Anzahl aller teilerfremden natürlichen Zahlen zu einer natürlichen Zahl $n$ an.</div>
                    Weil hier zwei gleiche Primfaktoren vorliegen, lässt sich die $\\varphi$-Funktion wie folgt berechnen:
                    es gilt $\\varphi (N) := \\varphi (p) \\cdot q = p \\cdot \\varphi (q)$
                    $ \\: := (p - 1) \\cdot q = p \\cdot (q - 1)$ - denn es wird von jedem einzigartigen Primfaktor genau einmal $1$ abgezogen.
                    <br/>
                    <br/>
                    Damit ergibt sich $\\varphi (${this.N}) $$\\: = (${this.p} - 1) \\cdot ${this.q}$
                    $\\: = ${this.eulerTotient}$.
                    <br/>
                    <br/>
                    Mittels $\\varphi (${this.N})$ lässt sich nun versuchen, ein $d$ für den Schlüssel
                    $(d,N)$ zu finden, sodass $e \\cdot d \\equiv 1 \\pmod{\\varphi (${this.N})}$ ist. Bei dem gesuchten $d$ handelt
                    es sich also um das multiplikative Inverse $[${this.e}]_{\\varphi (N)}^{-1}$ von $[${this.e}]_{\\varphi (N)}$
                    oder von $${this.e}$ in $\\mathbb{Z}/${this.eulerTotient}\\mathbb{Z}$ (Alt. $\\mathbb{Z}_{${this.eulerTotient}}$).
                `

                if (this.e == 1) {
                    this.eulerTotientProcess = this.eulerTotientProcess.concat(
                    `
                        <div class="definition-box">Weil $${this.e}$ in $\\mathbb{Z}/${this.eulerTotient}\\mathbb{Z}\\:(\\mathbb{Z}_{${this.eulerTotient}})$ bezüglich der Multiplikation
                        das neutrale Element ist, ist $${this.e}$ stets zu sich selbst invers ($[${this.e}]_{\\varphi (N)}^{-1}
                        = [${this.e}]_{\\varphi (N)}$). Bei $d$ handelt es sich also um $${this.e}$.</div>
                    `
                    );

                    this.displayKeys =
                    `
                        Wir erhalten das Schlüsselpaar
                        \\begin{array}{|l|l|}
                            \\hline
                            (e, N) & (${this.e}, ${this.N})\\\\
                            \\hline
                            (d, N) & (${this.foundKey}, ${this.N})\\\\
                            \\hline
                        \\end{array}
                        $(d,N)$ ist der private Schlüssel und $(e,N)$ der öffentliche.
                    `

                    this.exception = 20;
                    return;
                }
            }

            if (this.e == 1) {
                this.exception = 20;
                return;
            }

            if (this.divisorFormatList!.length == 1) {
                formattedGCDList = formattedGCDList.concat(
                    `
                        ${String(this.divisorFormatList![0][0])} & = ${String(this.divisorFormatList![0][1])}
                        \\cdot \\underline{${String(this.divisorFormatList![0][2])}}
                        + ${String(this.divisorFormatList![0][3])} \\leftarrow \\operatorname{ggT}(${String(this.e)},
                        \\varphi (${String(this.N)})) = ${String(this.divisorFormatList![0][2])}\\\\
                    `
                );

                this.gcd = this.divisorFormatList![0][2];
                this.exception = this.gcd == 1 ? 0 : 7;
            } else {
                for (let i = 0; i < this.divisorFormatList!.length; i++) {
                    if (i == this.divisorFormatList!.length - 2) {
                        formattedGCDList = formattedGCDList.concat(
                            `
                                ${String(this.divisorFormatList![i][0])} & = ${String(this.divisorFormatList![i][1])}
                                \\cdot ${String(this.divisorFormatList![i][2])}
                                + \\underline{${String(this.divisorFormatList![i][3])}} \\leftarrow \\operatorname{ggT}(${String(this.e)},
                                \\varphi (${String(this.N)})) = ${String(this.divisorFormatList![i][3])}\\\\
                            `
                        );
                    } else if (i == this.divisorFormatList!.length - 1) {
                        formattedGCDList = formattedGCDList.concat(
                            `
                                ${String(this.divisorFormatList![i][0])} & = ${String(this.divisorFormatList![i][1])}
                                \\cdot ${String(this.divisorFormatList![i][2])}
                                + ${String(this.divisorFormatList![i][3])}
                            `
                        );
                    } else {
                        formattedGCDList = formattedGCDList.concat(
                            `
                                ${String(this.divisorFormatList![i][0])}
                                & = ${String(this.divisorFormatList![i][1])}
                                \\cdot ${String(this.divisorFormatList![i][2])}
                                + ${String(this.divisorFormatList![i][3])}\\\\
                            `
                        );
                    }
                }

                if (this.divisorFormatList![this.divisorFormatList!.length - 1][3] == 0) {
                    this.gcd = this.divisorFormatList![this.divisorFormatList!.length - 2][3];
                } else {
                    this.gcd = this.divisorFormatList![this.divisorFormatList!.length - 1][3];
                }
            }

            this.exception = 0;

            this.doUnifiedRSA(formattedGCDList);
        }
    }

    // rsa key procedure:

    doRSAWithKeyProcedure(): void {
        this.processLoading = false;

        this.validRange = "$e$ ist so zu wählen, " +
            "dass $(1 <) e < \\varphi (N)$ und $\\operatorname{ggT}(e, \\varphi (N)) = 1$ ($e$ ist teilerfremd zu $\\varphi (N)$) " +
            "gilt.";

        this.validRange = this.validRange.concat(
            ` $e$ muss also in der Menge $[1; ${this.eulerTotient! - 1}] \\cap \\mathbb{N}$ liegen.`
        )

        if (this.exception == 1) {
            return;
        }

        if (this.primeFactors) {
            let formattedFactorList = "";
            let formattedGCDList = "";

            for (let i = 0; i < this.primeFactors.length; i++) {
                if (i == this.primeFactors.length - 1) {
                    formattedFactorList = formattedFactorList.concat(String(this.primeFactors[i]));
                } else {
                    formattedFactorList = formattedFactorList.concat(String(this.primeFactors[i]) + "\\cdot");
                }
            }

            this.factorizationProcess =
            `
                Für das Verfahren sei der Schlüssel $(e, N) = (${this.e}, ${this.N})$ gegeben.
                <br/>
                <br/>
                Zu finden ist vorerst $\\varphi (N)$.
                Dafür muss der RSA-Modul $N$ in seine Primfaktoren zerlegt werden.
                <div class="definition-box">Bei der Primfaktorzerlegung einer Zahl hilft es grundsätzlich,
                wenn man nur bis zur abgerundeten Wurzel dieser Zahl nach Teilern sucht. Also suche man in dem Fall nach einem Teiler bis
                $\\lfloor\\sqrt{${this.N}}\\rfloor = ${Math.floor(Math.sqrt(this.N))}$. Wurde ein solcher Teiler
                dann gefunden, so spalte man diesen durch Division ab. Es bleibt der zweite Faktor. Sollte auch
                dieser keine Primzahl sein, so wiederholt man das Vorgehen, bis nur noch Primfaktoren vorliegen.
                Im Kontext RSA sollte dies allerdings nicht der Fall sein, da hier nur mit zwei Primfaktoren
                gerechnet wird.</div>
            `

            if (this.primeFactors.length != 2) {
                this.eulerTotientProcess =
                `
                    <div class="definition-box">Wir definieren die eulersche $\\varphi$-Funktion wie folgt:
                    $\\varphi : \\mathbb{N} \\to \\mathbb{N}$ mit $\\varphi(n) := \\big\\vert \\{a \\in \\mathbb{N} : 1 \\leq a \\leq n \\land \\operatorname{ggT}(a,n) = 1\\} \\big\\vert$ oder $\\varphi(n) = \\displaystyle\\sum\\limits_{\\scriptstyle 1 \\leq a \\leq n \\atop \\operatorname{ggT}(a,n) = 1} 1$.
                    Sie gibt die Anzahl aller teilerfremden natürlichen Zahlen zu einer natürlichen Zahl $n$ an.</div>
                    In dem Fall ist $\\varphi (N) = ${this.eulerTotient}$. Allerdings setzt sich $N = ${this.N}$ nicht
                    aus genau 2 Primfaktoren zusammen. Das Verfahren wird in diesem Falle nicht weitergeführt.
                `
                this.exception = 2;
            } else {
                this.eulerTotientProcess = `
                    Es gilt $N = p \\cdot q = ${formattedFactorList} = ${this.N}$.
                    <br/>
                    <br/>
                     <div class="definition-box">Wir definieren die eulersche $\\varphi$-Funktion wie folgt:
                    $\\varphi : \\mathbb{N} \\to \\mathbb{N}$ mit $\\varphi(n) := \\big\\vert \\{a \\in \\mathbb{N} : 1 \\leq a \\leq n \\land \\operatorname{ggT}(a,n) = 1\\} \\big\\vert$ oder $\\varphi(n) = \\displaystyle\\sum\\limits_{\\scriptstyle 1 \\leq a \\leq n \\atop \\operatorname{ggT}(a,n) = 1} 1$.
                    Sie gibt die Anzahl aller teilerfremden natürlichen Zahlen zu einer natürlichen Zahl $n$ an.</div>
                `

                if (this.totientComponents![2] == this.totientComponents![0]) {
                    this.eulerTotientProcess = this.eulerTotientProcess.concat(
                    `
                        Für $\\varphi (N)$ gibt es zwei gleiche Primfaktoren $p = ${this.totientComponents![0]}$
                        und $q = ${this.totientComponents![2]}$, sodass folglich
                        $\\varphi (N)$$\\: := \\varphi (p) \\cdot q$$\\: = p \\cdot \\varphi (q) \$$ \\: := (p - 1) \\cdot q $
                        $\\:= p \\cdot (q - 1)$ gilt - denn es wird von jedem einzigartigen Primfaktor genau einmal $1$ abgezogen.
                        <br>
                        <br>
                        Damit ergibt sich $\\varphi (${this.N}) $$\\: =(${this.totientComponents![0]} -
                        ${this.totientComponents![1]}) \\cdot ${this.totientComponents![2]}
                        $$\\: = ${this.eulerTotient}$.
                    `
                    );
                } else {
                    this.eulerTotientProcess = this.eulerTotientProcess.concat(
                    `
                        Für $\\varphi (N)$ gibt es zwei unterschiedliche Primfaktoren $p = ${this.totientComponents![0]}$
                        und $q = ${this.totientComponents![2]}$, sodass folglich
                        $\\varphi (N)$$\\: := \\varphi (p) \\cdot \\varphi (q)$$ \\: := (p - 1) \\cdot (q - 1) $ gilt -
                        denn es wird von jedem einzigartigen Primfaktor genau einmal $1$ abgezogen.
                        <br>
                        <br>
                        Damit ergibt sich $\\varphi (${this.N}) $$\\: =(${this.totientComponents![0]} -
                        ${this.totientComponents![1]}) \\cdot (${this.totientComponents![2]} - ${this.totientComponents![3]})
                        $$\\: = ${this.eulerTotient}$.
                    `
                    );
                }

                this.eulerTotientProcess = this.eulerTotientProcess.concat(
                `
                    Mittels $\\varphi (${this.N})$ lässt sich nun versuchen, ein $d$ für den Schlüssel
                    $(d,N)$ zu finden, sodass $e \\cdot d \\equiv 1 \\pmod{\\varphi (${this.N})}$ gilt. Bei dem gesuchten $d$ handelt
                    es sich also um das multiplikative Inverse $[${this.e}]_{\\varphi (N)}^{-1}$ von $[${this.e}]_{\\varphi (N)}$
                    oder von $${this.e}$ in $\\mathbb{Z}/${this.eulerTotient}\\mathbb{Z}$ (Alt. $\\mathbb{Z}_{${this.eulerTotient}}$).
                `
                );

                if (this.e == 1) {
                    this.eulerTotientProcess = this.eulerTotientProcess.concat(
                    `
                        <div class="definition-box">Weil $${this.e}$ in $\\mathbb{Z}/${this.eulerTotient}\\mathbb{Z}$ bezüglich der Multiplikation
                        das neutrale Element ist, ist $${this.e}$ stets zu sich selbst invers ($[${this.e}]_{\\varphi (N)}^{-1}
                        = [${this.e}]_{\\varphi (N)}$). Bei $d$ handelt es sich um $${this.e}$.</div>
                    `
                    );

                    this.displayKeys =
                    `
                        Wir erhalten das Schlüsselpaar
                        \\begin{array}{|l|l|}
                            \\hline
                            (e, N) & (${this.e}, ${this.N})\\\\
                            \\hline
                            (d, N) & (${this.foundKey}, ${this.N})\\\\
                            \\hline
                        \\end{array}
                        $(d,N)$ ist der private Schlüssel und $(e,N)$ der öffentliche.
                    `

                    this.exception = 20;
                    return;
                }

                if (this.divisorFormatList!.length == 1) {
                    formattedGCDList = formattedGCDList.concat(
                        `
                            ${String(this.divisorFormatList![0][0])} & = ${String(this.divisorFormatList![0][1])}
                            \\cdot \\underline{${String(this.divisorFormatList![0][2])}}
                            + ${String(this.divisorFormatList![0][3])} \\leftarrow \\operatorname{ggT}(${String(this.e)},
                            \\varphi (${String(this.N)})) = ${String(this.divisorFormatList![0][2])}\\\\
                        `
                    );

                    this.gcd = this.divisorFormatList![0][2];
                    this.exception = this.gcd == 1 ? 0 : 3;
                } else {
                    for (let i = 0; i < this.divisorFormatList!.length; i++) {
                        if (i == this.divisorFormatList!.length - 2) {
                            formattedGCDList = formattedGCDList.concat(
                            `
                                ${String(this.divisorFormatList![i][0])} & = ${String(this.divisorFormatList![i][1])}
                                \\cdot ${String(this.divisorFormatList![i][2])}
                                + \\underline{${String(this.divisorFormatList![i][3])}} \\leftarrow \\operatorname{ggT}(${String(this.e)},
                                \\varphi (${String(this.N)})) = ${String(this.divisorFormatList![i][3])}\\\\
                            `
                            );
                        } else if (i == this.divisorFormatList!.length - 1) {
                            formattedGCDList = formattedGCDList.concat(
                                `
                                ${String(this.divisorFormatList![i][0])} & = ${String(this.divisorFormatList![i][1])}
                                \\cdot ${String(this.divisorFormatList![i][2])}
                                + ${String(this.divisorFormatList![i][3])}
                            `
                            );
                        } else {
                            formattedGCDList = formattedGCDList.concat(
                                `
                                ${String(this.divisorFormatList![i][0])}
                                & = ${String(this.divisorFormatList![i][1])}
                                \\cdot ${String(this.divisorFormatList![i][2])}
                                + ${String(this.divisorFormatList![i][3])}\\\\
                            `
                            );
                        }
                    }

                    if (this.divisorFormatList![this.divisorFormatList!.length - 1][3] == 0) {
                        this.gcd = this.divisorFormatList![this.divisorFormatList!.length - 2][3];
                    } else {
                        this.gcd = this.divisorFormatList![this.divisorFormatList!.length - 1][3];
                    }
                }

                this.exception = 0;
            }

            this.doUnifiedRSA(formattedGCDList);
        }
    }

    doUnifiedRSA(formattedGCDList: string) {
        let formattedExtendedGCDList = "";

        if (this.e == 1) {
            this.exception = 20;
            return;
        }

        this.findingGCDProcess =
            `
                Vorweg muss allerdings gegeben sein, dass $e$ und $\\varphi (N)$ teilerfremd sind. Das ist der Fall, wenn
                $\\operatorname{ggT}(${this.e}, ${this.eulerTotient}) = 1$ ist.
                Der euklidische Algorithmus liefert u.a. die Antwort darauf, ob das der Fall ist, oder nicht.

                \\begin{align*}
                    ${formattedGCDList}
                \\end{align*}
            `

        if (this.gcd == 1) {
            this.findingGCDProcess = this.findingGCDProcess.concat(
                `
                    Aus dem euklidischen Algorithmus ergibt sich $\\operatorname{ggT}(${this.e}, ${this.eulerTotient}) = 1$.
                    Damit lässt sich der euklidische Algorithmus erweitern, um das gesuchte multiplikative Inverse
                    $d = [${this.e}]_{\\varphi (N)}^{-1}$ zu finden.
                `
            );

            if (this.extendedGCDList!.length == 1) {
                formattedExtendedGCDList =
                `
                    ${String(this.extendedGCDList![0][0])}
                    & = ${String(this.extendedGCDList![0][1])}
                    \\cdot ${String(this.extendedGCDList![0][2])}
                    ${String(this.extendedGCDList![0][3])}
                    \\cdot ${String(this.extendedGCDList![0][4])}\\\\
                `

                this.exception = 0;
            } else {
                for (let i = 0; i < this.extendedGCDList!.length; i++) {
                    if (i == 0) {
                        formattedExtendedGCDList = formattedExtendedGCDList.concat(
                            `
                            ${String(this.extendedGCDList![0][0])}
                            & = ${String(this.extendedGCDList![0][1])}
                            \\cdot ${String(this.extendedGCDList![0][2])}
                            ${String(this.extendedGCDList![0][3])}
                            \\cdot ${String(this.extendedGCDList![0][4])}\\\\
                        `
                        );
                    } else if (i % 3 == 0 && i != this.extendedGCDList!.length - 1) {
                        formattedExtendedGCDList = formattedExtendedGCDList.concat(
                            `
                            & = ${String(this.extendedGCDList![i][1])}
                            \\cdot ${String(this.extendedGCDList![i][2])}
                            ${this.extendedGCDList![i][3] < 0 ? "" : "+"} ${String(this.extendedGCDList![i][3])}
                            \\cdot ${String(this.extendedGCDList![i][4])}\\\\
                        `
                        );
                    } else if (i % 3 == 0 && i == this.extendedGCDList!.length - 1) {
                        formattedExtendedGCDList = formattedExtendedGCDList.concat(
                            `
                            & = ${String(this.extendedGCDList![i][1])}
                            \\cdot ${String(this.extendedGCDList![i][2])}
                            ${this.extendedGCDList![i][3] < 0 ? "" : "+"} ${String(this.extendedGCDList![i][3])}
                            \\cdot ${String(this.extendedGCDList![i][4])}
                        `
                        );
                    } else if (i % 3 == 1) {
                        formattedExtendedGCDList = formattedExtendedGCDList.concat(
                            `
                            & = ${String(this.extendedGCDList![i][1])}
                            \\cdot ${String(this.extendedGCDList![i][2])}
                            ${this.extendedGCDList![i][3] < 0 ? "" : "+"} ${String(this.extendedGCDList![i][3])}
                            \\cdot ( ${String(this.extendedGCDList![i][4])} \\cdot ${String(this.extendedGCDList![i][5])}
                            ${String(this.extendedGCDList![i][6])}
                            \\cdot ${String(this.extendedGCDList![i][7])})\\\\
                        `
                        );
                    } else {
                        formattedExtendedGCDList = formattedExtendedGCDList.concat(
                        `
                            & = ${String(this.extendedGCDList![i][1])}
                            \\cdot ${String(this.extendedGCDList![i][2])}
                            ${this.extendedGCDList![i][3] < 0 ? "" : "+"} ${String(this.extendedGCDList![i][3])}
                            \\cdot ${String(this.extendedGCDList![i][4])}
                            ${this.extendedGCDList![i][5] < 0 ? "" : "+"} ${String(this.extendedGCDList![i][5])}
                            \\cdot ${String(this.extendedGCDList![i][6])}\\\\
                        `
                        );
                    }
                }

                this.exception = 0;
            }
        } else {
            this.findingGCDProcess = this.findingGCDProcess.concat(
            `
                Aus dem euklidischen Algorithmus ergibt sich $\\operatorname{ggT}(${this.e}, ${this.eulerTotient}) = ${this.gcd}$.
                Damit lässt sich der euklidische Algorithmus nicht erweitern. Das Verfahren wird in diesem Falle nicht
                weitergeführt.
            `
            );
        }

        this.extendGCDProcess =
            `
                Der erweiterte euklidische Algorithmus lautet:

                \\begin{align*}
                    ${formattedExtendedGCDList}
                \\end{align*}

                Aus der vorangegangenen Gleichheit lässt sich die folgende Kongruenz ablesen:
            `

        if (this.extendedGCDList![this.extendedGCDList!.length - 1][4] % this.eulerTotient! == 0) {
            this.findCongurenceProcess =
                `
                    \\begin{align*}
                        1 & \\equiv ${String(this.extendedGCDList![this.extendedGCDList!.length - 1][1])}
                        \\cdot ${String(this.extendedGCDList![this.extendedGCDList!.length - 1][2])}
                        ${this.extendedGCDList![this.extendedGCDList!.length - 1][3] < 0 ? "" : "+"}
                        \\underbrace{
                        ${String(this.extendedGCDList![this.extendedGCDList!.length - 1][3])}
                        \\cdot ${String(this.extendedGCDList![this.extendedGCDList!.length - 1][4])}
                        }_{\\equiv\\:0}
                        \\pmod{${this.eulerTotient}}
                    \\end{align*}
                    Also ist
                    \\begin{align*}
                        1 & \\equiv ${String(this.extendedGCDList![this.extendedGCDList!.length - 1][1])}
                        \\cdot ${String(this.extendedGCDList![this.extendedGCDList!.length - 1][2])}
                        \\pmod{${this.eulerTotient}}
                    \\end{align*}
                `

            this.foundKey = this.extendedGCDList![this.extendedGCDList!.length - 1][1];
        } else {
            this.findCongurenceProcess =
                `
                    \\begin{align*}
                        1 & \\equiv \\underbrace{${String(this.extendedGCDList![this.extendedGCDList!.length - 1][1])}
                        \\cdot ${String(this.extendedGCDList![this.extendedGCDList!.length - 1][2])}
                        }_{\\equiv\\:0}
                        ${this.extendedGCDList![this.extendedGCDList!.length - 1][3] < 0 ? "" : "+"}
                        ${String(this.extendedGCDList![this.extendedGCDList!.length - 1][3])}
                        \\cdot ${String(this.extendedGCDList![this.extendedGCDList!.length - 1][4])}
                        \\pmod{${this.eulerTotient}}
                    \\end{align*}
                    Also ist
                    \\begin{align*}
                        1 & \\equiv ${String(this.extendedGCDList![this.extendedGCDList!.length - 1][3])}
                        \\cdot ${String(this.extendedGCDList![this.extendedGCDList!.length - 1][4])}
                        \\pmod{${this.eulerTotient}}
                    \\end{align*}
                `

            this.foundKey = this.extendedGCDList![this.extendedGCDList!.length - 1][3];
        }

        if (this.foundKey < 0) {
            let defaultRepresentative = this.foundKey;

            while (defaultRepresentative < 0) {
                defaultRepresentative += this.eulerTotient!;
            }

            this.displayKeys =
                `
                    Das multiplikative Inverse $[${this.e}]_{\\varphi (${this.N})}^{-1}$ ergibt sich aus der gefundenen Kongruenz, also $[${this.foundKey}]_{\\varphi (${this.N})}
                    \\cdot [${this.e}]_{\\varphi (${this.N})} = [1]_{\\varphi (${this.N})}$.
                    Es liegt nun allerdings eine negative Restklasse vor, sodass man nach dem
                    Standardrepräsentanten in der Restklasse $\\pmod{${this.eulerTotient}}$ sucht.
                    Dazu wird solange $\\varphi (N) = ${this.eulerTotient}$ auf
                    das gefundene multiplikative Inverse addiert, bis man den ersten positiven Repräsentanten
                    der Restklasse erhält.
                    Das Ergebnis lautet $d = [${defaultRepresentative}]_{\\varphi (${this.N})}
                    $$= [${this.e}]_{\\varphi (${this.N})}^{-1}$.

                    Wir erhalten das Schlüsselpaar
                    \\begin{array}{|l|l|}
                        \\hline
                        (e, N) & (${this.e}, ${this.N})\\\\
                        \\hline
                        (d, N) & (${defaultRepresentative}, ${this.N})\\\\
                        \\hline
                    \\end{array}
                    $(d,N)$ ist der private Schlüssel und $(e,N)$ der öffentliche.
                `
        } else {
            this.displayKeys =
                `
                    Das multiplikative Inverse $[${this.e}]_{\\varphi (${this.N})}^{-1}$ ergibt sich aus der gefundenen Kongruenz, also $[${this.foundKey}]_{\\varphi (${this.N})}
                    \\cdot [${this.e}]_{\\varphi (${this.N})} = [1]_{\\varphi (${this.N})}$.

                    Wir erhalten das Schlüsselpaar
                    \\begin{array}{|l|l|}
                        \\hline
                        (e, N) & (${this.e}, ${this.N})\\\\
                        \\hline
                        (d, N) & (${this.foundKey}, ${this.N})\\\\
                        \\hline
                    \\end{array}
                    $(d,N)$ ist der private Schlüssel und $(e,N)$ der öffentliche.
                `
        }
    }
}
