import {Component, Input, ViewChild} from '@angular/core';
import {ToolShowcaseModel} from "../interface/tool-showcase-model";
import {ComplementBuilderService, Output} from "../service/complement-builder.service";
import {catchError, map, of, take} from "rxjs";

@Component({
    selector: 'app-complement-builder-showcase',
    templateUrl: './complement-builder-showcase.component.html',
    styleUrls: ['./complement-builder-showcase.component.scss'],
})
export class ComplementBuilderShowcaseComponent {
    hideAlertBox: boolean = false;
    inputString: string = "00000000";
    radix: number = 2;
    length: number = 0;
    getMinusOneComplement: boolean = false;
    interpretAsBinary: boolean = true;
    tweaksWindow: boolean = false;
    complementExplanation: boolean = false;

    constructor(private complementBuilderService: ComplementBuilderService) {
    }

    public outputs: Output[] = [
        {text: "The output will appear here.\n", status: "hint"},
        {text: "There are default values that will be used if you do not enter your own. " +
                "These are (\"input\", default = \"00000000\"),\n" +
                "(\"radix\", default = \"2\"),\n" +
                "(\"length\", default = \"0\"),\n" +
                "(\"getMinusOneComplement\", default = \"false\"),\n" +
                "(\"interpretAsBinary\", default = \"true\")", status: ""},
    ]

    setHideAlertBox() {
        this.hideAlertBox = !this.hideAlertBox;
    }

    getInputString(value: string) {
        this.inputString = value;
    }

    getRadix(value: string) {
        this.radix = Number(value);
    }

    getLength(value: string) {
        this.length = Number(value);
    }

    @Input()
    complementBuilder?: ToolShowcaseModel;

    public toolShowcaseActive!: boolean;

    setActive(toolShowcaseActive: boolean) {
        this.toolShowcaseActive = toolShowcaseActive;
    }

    public toggleReturnMinusOneComplement(): void {
        this.getMinusOneComplement = !this.getMinusOneComplement;
    }

    public toggleInterpretAsBinary(): void {
        this.interpretAsBinary = !this.interpretAsBinary;
    }

    public toggleTweaksWindow(): void {
        this.tweaksWindow = !this.tweaksWindow;
    }

    public toggleComplementExplanation(): void {
        this.complementExplanation = !this.complementExplanation;
    }

    getOutput(): void {
        this.complementBuilderService.sendComplementBuilderRequest(
            this.inputString,
            this.radix,
            this.length,
            this.getMinusOneComplement,
            this.interpretAsBinary
        )
            .pipe(
                take(1),
                map((output: Output) => {
                        let givenValues: Output = {status: "", text: `Your input was:
                        ("input": ${this.inputString}),
                        ("radix": ${this.radix}),
                        ("length": ${this.length}),
                        ("getMinusOneComplement": ${this.getMinusOneComplement}),
                        ("interpretAsBinary": ${this.interpretAsBinary}).`};
                        this.outputs.push(givenValues);
                        this.outputs.push(output);
                    }
                ),
                catchError(error => {
                    if (error.error instanceof ErrorEvent) {
                        let output: Output = {status: "error", text: `error: ${error.error.message}`};
                        this.outputs.push(output);
                    } else {
                        let output: Output = {status: "error", text: `error: ${error.message}`};
                        this.outputs.push (output);
                    }
                    return of([])
                })
            )
            .subscribe();
    }

    complementTutorial =
        `
            The concept by which the complement is calculated is not thoroughly formalizable by my personal way
            of implementation. There are certainly more reasonable approaches to calculate the complement, for example,
            if a known definition range of numerical values is fixed; just like in real hardware architecture.
            I use here furthermore an arbitrary radix, on the basis of which the complement is calculated.
            But this is usually done in the binary system and the result is then transferred to the desired place
            value system if necessary.
            <br/><br/>
            In the following part, we depict a number as $n_b$ with $n$ being the number and $b$ the radix.
            Single digits of a number will be depicted as $n_{b,i}$. Furthermore, let $nM :=$ a boolean $\\text{{true, false}}$ mapped to an according number
            $\\in \\text{{0,1}}$.
            $nM$ is a term that determines whether we look at the $k$ or $k-1$ complement. The complement is then written as $K_{b-nM}(n_b)$.
            <br/><br/>
            To make this clearer, we will approach this procedure with an example:
            Let $n := 209$ as a decimal value $(b = 10)$. In the next part, we want to form the complement
            $K_{{10}}$ of that number $n_b$.
            <br/><br/>
            To get $K_{{10}}(n_b)$, we define $K_{10-1}(n_b)$.
            This is done by inverting the digits of $n_b (209_{10})$, hence the decimal system $S_{10} := \\text{{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}}$ mapped to
            the inverted decimal system $\\overline{S_{10}}$ as follows:
            <br/><br/>
            $S_{10} \\text{ (top row)} $ $\\rightarrow \\overline{S_{10}} \\text{ (bottom row)}:$
            \\begin{array}{|cccccccccc|}
                \\hline
                0 & 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9\\\\
                \\hline
                9 & 8 & 7 & 6 & 5 & 4 & 3 & 2 & 1 & 0\\\\
                \\hline
            \\end{array}
            <br/>
            $\\implies n_b \\mapsto \\overline{n_b}$
            via $( 10 - 209_{10,i} - 1 )$ or in general
            $( b - n_{b,i} - 1 ) \\mod{10}$. The modulo operator is relevant for later arithmetic operations (e.g.
            determining the two's complement in one step).
            In this case, however, it is not.
            <br/><br/>
            Through $( 10 - 209_{10,i} - 1 )$
            we receive
            \\begin{aligned}
                7 & = ( 10 - 2 - 1 )\\\\
                9 & = ( 10 - 0 - 1 )\\\\
                0 & = ( 10 - 9 - 1 ),
            \\end{aligned}
            $\\implies (2 \\leftrightarrow 7, 0 \\leftrightarrow 9, 9 \\leftrightarrow 0)$
            $\\implies K_{10-1}(209_{10}) = 790_{10}$.
            <br/><br/>
            From latter we conclude
            \\begin{aligned}
            &K_{10-1}(209_{10}) + 1_{10}\\\\
                ={} & K_{10}(209_{10})\\\\
                ={} & 790_{10} + 1_{10}\\\\
                ={} & 791_{10}.
            \\end{aligned}
        `
}
