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

    ngOnInit(): void {
    }

    getRSAOutputWithKey(): void {
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
        if (procedure == "with-key") {
            this.e = Number(newE);
            this.N = Number(newN);

            if (this.e > 2147483647) {
                this.exception = 12;
            } else if (this.N > 2147483647) {
                this.exception = 15;
            } else {
                this.getRSAOutputWithKey();
            }
        } else if (procedure == "with-primes") {
            this.e = Number(newE);
            this.p = Number(newP);
            this.q = Number(newQ);

            if (this.e > 2147483647) {
                this.exception = 12;
            } else if (this.p > 2147483647) {
                this.exception = 13;
            } else if (this.q > 2147483647) {
                this.exception = 14;
            } else {
                this.getRSAOutputWithPrimes();
            }
        }
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
        let formattedGCDList = "";

        if (this.p && this.q && this.e) {
            this.findRSAModulProcess =
                `
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
                    Man definiere die eulersche $\\varphi$-Funktion grundsätzlich durch
                    $\\varphi (n) := \\,\\mid \\{a \\in \\mathbb{N} $$ : 1 \\leq a \\leq n \\land ggT(a,n) = 1\\} \\mid$.
                    Sie gibt also die Anzahl aller teilerfremden natürlichen Zahlen zu einer natürlichen Zahl $n$ an.
                    <br/>
                    <br/>
                    Weil hier zwei feste Primfaktoren vorliegen, lässt sich die $\\varphi$-Funktion wie folgt berechnen:
                    es gilt $\\varphi (N)$$\\: := \\varphi (p) \\cdot \\varphi (q)$
                    $ \\: := (p - 1) \\cdot (q - 1)$.
                    <br/>
                    <br/>
                    Damit ergibt sich $\\varphi (${this.N}) $$\\: = (${this.p} - 1) \\cdot (${this.q} - 1)$
                    $\\: = ${this.eulerTotient}$.
                    <br/>
                    <br/>
                    Mittels $\\varphi (N) = \\varphi (${this.N})$ lässt sich im Folgenden versuchen, $d$ für den
                    Schlüssel $(d, N)$ zu ermitteln. Bei dem gesuchten $d$ handelt es sich also um das multiplikative
                    Inverse $[${this.e}]_{\\varphi (N)}^{-1}$ von $[${this.e}]_{\\varphi (N)}$ oder von $${this.e}$ in
                    $\\mathbb{Z}/${this.eulerTotient}\\mathbb{Z}$. Dafür muss $e \\cdot d \\equiv 1 \\pmod{\\varphi (N)}$
                    gelten.
                `
            } else {
                this.eulerTotient = (this.p - 1) * (this.q);
                this.eulerTotientProcess =
                    `
                    Man definiere die eulersche $\\varphi$-Funktion grundsätzlich durch
                    $\\varphi (n) := \\,\\mid \\{a \\in \\mathbb{N} $$ : 1 \\leq a \\leq n \\land ggT(a,n) = 1\\} \\mid$.
                    Sie gibt also die Anzahl aller teilerfremden natürlichen Zahlen zu einer natürlichen Zahl $n$ an.
                    <br/>
                    <br/>
                    Weil hier zwei feste Primfaktoren vorliegen, lässt sich die $\\varphi$-Funktion wie folgt berechnen:
                    es gilt $\\varphi (N)$$\\: := \\varphi (p) \\cdot \\varphi (q)$
                    $ \\: := (p - 1) \\cdot (q - 1)$.
                    <br/>
                    <br/>
                    Damit ergibt sich $\\varphi (${this.N}) $$\\: = (${this.p} - 1) \\cdot ${this.q}$
                    $\\: = ${this.eulerTotient}$.
                    <br/>
                    <br/>
                    Mittels $\\varphi (N) = \\varphi (${this.N})$ lässt sich im Folgenden versuchen, $d$ für den
                    Schlüssel $(d, N)$ zu ermitteln. Bei dem gesuchten $d$ handelt es sich also um das multiplikative
                    Inverse $[${this.e}]_{\\varphi (N)}^{-1}$ von $[${this.e}]_{\\varphi (N)}$ oder von $${this.e}$ in
                    $\\mathbb{Z}/${this.eulerTotient}\\mathbb{Z}$. Dafür muss $e \\cdot d \\equiv 1 \\pmod{\\varphi (N)}$
                    gelten.
                `
            }

            if (this.divisorFormatList!.length == 1) {
                formattedGCDList = formattedGCDList.concat(
                    `
                        ${String(this.divisorFormatList![0][0])} & = ${String(this.divisorFormatList![0][1])}
                        \\cdot \\underline{${String(this.divisorFormatList![0][2])}}
                        + ${String(this.divisorFormatList![0][3])} \\leftarrow ggT(${String(this.e)},
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
                                + \\underline{${String(this.divisorFormatList![i][3])}} \\leftarrow ggT(${String(this.e)},
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
                Es ist der Schlüssel $(e, N) = (${this.e}, ${this.N})$ gegeben.
                <br/>
                <br/>
                Man finde also $\\varphi (N)$. Dafür muss zunächst $N$ durch Primfaktorzerlegung bestimmt werden.
                Bei der Primfaktorzerlegung einer Zahl hilft es grundsätzlich, wenn man nur bis zur abgerundeten Wurzel
                dieser Zahl sucht. Also suche man in dem Fall bis $\\lfloor\\sqrt{${this.N}}\\rfloor
                = ${Math.floor(Math.sqrt(this.N))}$. Wurde ein solcher Teiler dann gefunden, so spalte man diesen durch
                Division ab. Es bleibt der zweite Faktor. Sollte auch dieser keine Primzahl sein, so wiederholt man
                das Prinzip, bis nur noch Primfaktoren vorliegen. Im Kontext RSA sollte dies allerdings nicht der Fall
                sein, da hier nur mit zwei Primfaktoren gerechnet wird.
            `
            this.exception = 0;

            if (this.primeFactors.length != 2) {
                this.eulerTotientProcess =
                `
                    Man definiere die eulersche $\\varphi$-Funktion grundsätzlich durch
                    $\\varphi (n) := \\,\\mid \\{a \\in \\mathbb{N} $$ : 1 \\leq a \\leq n \\land ggT(a,n) = 1\\} \\mid$.
                    Sie gibt also die Anzahl aller teilerfremden natürlichen Zahlen zu einer natürlichen Zahl $n$ an.
                    <br/>
                    <br/>
                    $\\varphi (N)$ ist also $${this.eulerTotient}$. Allerdings setzt sich $N = ${this.N}$ nicht
                    aus genau 2 Primfaktoren zusammen. Das Verfahren wird in diesem Falle nicht weitergeführt.
                `
                this.exception = 2;
            } else {
                this.eulerTotientProcess =
                    `
                    Es gilt $N = p \\cdot q = ${formattedFactorList} = ${this.N}$.
                    <br/>
                    <br/>
                    Man definiere die eulersche $\\varphi$-Funktion grundsätzlich durch
                    $\\varphi (n) := \\,\\mid \\{a \\in \\mathbb{N} $$ : 1 \\leq a \\leq n \\land ggT(a,n) = 1\\} \\mid$.
                    Sie gibt also die Anzahl aller teilerfremden natürlichen Zahlen zu einer natürlichen Zahl $n$ an.
                    <br/>
                    <br/>
                    Für $\\varphi (N)$ gibt es zwei eindeutige Primfaktoren $p = ${this.totientComponents![0]}$
                    und $q = ${this.totientComponents![2]}$, sodass folglich
                    $\\varphi (N)$$\\: := \\varphi (p) \\cdot \\varphi (q)$$ \\: := (p - 1) \\cdot (q - 1) $ gilt.
                    <br/>
                    <br/>
                    Damit ergibt sich $\\varphi (${this.N}) $$\\: =(${this.totientComponents![0]} -
                    ${this.totientComponents![1]}) \\cdot (${this.totientComponents![2]} - ${this.totientComponents![3]})
                    $$\\: = ${this.eulerTotient}$.
                    <br/>
                    <br/>
                    Mittels $\\varphi (N) = \\varphi (${this.N})$ lässt sich im Folgenden versuchen, $d$ für den
                    Schlüssel $(d, N)$ zu ermitteln. Bei dem gesuchten $d$ handelt es sich also um das multiplikative
                    Inverse $[${this.e}]_{\\varphi (N)}^{-1}$ von $[${this.e}]_{\\varphi (N)}$ oder von $${this.e}$ in
                    $\\mathbb{Z}/${this.eulerTotient}\\mathbb{Z}$. Dafür muss $e \\cdot d \\equiv 1 \\pmod{\\varphi (N)}$
                    gelten.
                `

                if (this.divisorFormatList!.length == 1) {
                    formattedGCDList = formattedGCDList.concat(
                        `
                            ${String(this.divisorFormatList![0][0])} & = ${String(this.divisorFormatList![0][1])}
                            \\cdot \\underline{${String(this.divisorFormatList![0][2])}}
                            + ${String(this.divisorFormatList![0][3])} \\leftarrow ggT(${String(this.e)},
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
                                + \\underline{${String(this.divisorFormatList![i][3])}} \\leftarrow ggT(${String(this.e)},
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

    private doUnifiedRSA(formattedGCDList: string) {
        let formattedExtendedGCDList = "";

        this.findingGCDProcess =
            `
                Die Kongruenz $e \\cdot d \\equiv 1 \\pmod{\\varphi (N)}$ ist genau dann korrekt, wenn der
                $ggT(e, \\varphi (N)) = 1$, also $ggT(${this.e}, ${this.eulerTotient})) = 1$. Der euklidische Algorithmus
                liefert die Antwort darauf, ob das der Fall ist, oder nicht.

                Es folgt also:
                \\begin{align*}
                    ${formattedGCDList}
                \\end{align*}
            `

        if (this.gcd == 1) {
            this.findingGCDProcess = this.findingGCDProcess.concat(
                `
                    Aus dem euklidischen Algorithmus ergibt sich also $ggT(${this.e}, ${this.eulerTotient}) = 1$.
                    Damit lässt sich der euklidische Algorithmus erweitern, um das gesuchte multiplikative Inverse
                    $[${this.e}]_{\\varphi (N)}^{-1}$ von $[${this.e}]_{\\varphi (N)}$ zu finden.
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
                Aus dem euklidischen Algorithmus ergibt sich also $ggT(${this.e}, ${this.eulerTotient}) = ${this.gcd}$.
                Damit lässt sich der euklidische Algorithmus nicht erweitern. Das Verfahren wird in diesem Falle nicht
                weitergeführt.
            `
            );
        }

        this.extendGCDProcess =
            `
                Der erweiterte euklidische Algorithmus lautet nun wie folgt:

                \\begin{align*}
                    ${formattedExtendedGCDList}
                \\end{align*}

                Daraus lässt sich auch die folgende Kongruenz ableiten:
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
                    Also:
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
                    Also:
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
                    Das multiplikative Inverse $[${this.e}]_{\\varphi (${this.N})}^{-1}$ von
                    $[${this.e}]_{\\varphi (${this.N})}$ ergibt sich aus der gefundenen Kongruenz
                    $${this.foundKey} \\cdot ${this.e} \\equiv 1 \\pmod{${this.eulerTotient}}$.
                    Also ist $[${this.foundKey}]_{\\varphi (${this.N})}
                    = [${this.e}]_{\\varphi (${this.N})}^{-1}$.
                    Es liegt nun allerdings eine negative Restklasse vor, sodass man vorerst nach dem
                    Standardrepräsentant sucht. Dazu wird solange $\\varphi (N) = ${this.eulerTotient}$ auf
                    das gefundene multiplikative Inverse addiert, bis man den ersten positiven Repräsentanten erhält.
                    Das Ergebnis lautet $[${defaultRepresentative}]_{\\varphi (${this.N})}
                    = [${this.foundKey}]_{\\varphi (${this.N})}
                    = [${this.e}]_{\\varphi (${this.N})}^{-1}$.
                    <br/>
                    <br/>
                    Man erhält nun das Schlüsselpaar $(d, N) = (${this.foundKey}, ${this.N}), (e, N)
                    = (${this.e}, ${this.N})$. Der öffentliche Schlüssel ist dabei $(${this.e}, ${this.N})$
                    und der private Schlüssel ist $(${defaultRepresentative}, ${this.N})$.
                `
        } else {
            this.displayKeys =
                `
                    Das multiplikative Inverse $[${this.e}]_{\\varphi (${this.N})}^{-1}$ von
                    $[${this.e}]_{\\varphi (${this.N})}$ ergibt sich aus der gefundenen Kongruenz
                    $${this.foundKey} \\cdot ${this.e} \\equiv 1 \\pmod{${this.N}}$.
                    Also ist $[${this.foundKey}]_{\\varphi (${this.N})}
                    = [${this.e}]_{\\varphi (${this.N})}^{-1}$.
                    <br/>
                    <br/>
                    Man erhält nun das Schlüsselpaar $(d, N) = (${this.foundKey}, ${this.N}), (e, N)
                    = (${this.e}, ${this.N})$. Der öffentliche Schlüssel ist dabei $(${this.e}, ${this.N})$
                    und der private Schlüssel ist $(${this.foundKey}, ${this.N})$.
                `
        }
    }
}
