import {Component, Input, ViewChild} from '@angular/core';
import {ToolShowcaseModel} from "../interface/tool-showcase-model";
import {ComplementBuilderService, Output} from "../service/complement-builder.service";
import {map, take} from "rxjs";

@Component({
    selector: 'app-complement-builder-showcase',
    templateUrl: './complement-builder-showcase.component.html',
    styleUrls: ['./complement-builder-showcase.component.scss'],
})
export class ComplementBuilderShowcaseComponent {
    inputString: string = "";
    radix: number = 2;
    length: number = 8;
    getMinusOneComplement: boolean = false;
    tweaksWindow: boolean = false;
    complementExplanation: boolean = false;

    constructor(private complementBuilderService: ComplementBuilderService) {
    }

    public outputs: Output[] = [
        {text: "The output will appear here. There are default values that will be used if you do not enter your own. " +
                "These are (\"input\", default = \"00000000\"),\n" +
                "(\"radix\", default = \"2\"),\n" +
                "(\"length\", default = \"8\"),\n" +
                "(\"getMinusOneComplement\", default = \"false\")", status: "hint"},
    ]

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

    public toggleTweaksWindow(): void {
        this.tweaksWindow = !this.tweaksWindow;
    }

    public toggleComplementExplanation(): void {
        this.complementExplanation = !this.complementExplanation;
    }

    getOutput(): void {
        this.complementBuilderService.sendComplementBuilderRequest(this.inputString, this.radix, this.length, this.getMinusOneComplement)
            .pipe(
                take(1),
                map((output: Output) => {
                        this.outputs.push(output);
                    }
                )
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
            \\begin{align}
            \\end{align}
            In the following part, we depict a number as $n_b$ with $n$ being the number and $b$ the radix.
            Single digits of a number will be depicted as $n_{b,i}$. The complement is marked as $K_{b-nTC}(n_b)$
            with $nTC =$ notTwosComplement and $nTC \\in \\text{{0,1}}$.
            \\begin{align}
            \\end{align}
            Let $n := 209$ as a decimal value $(b = 10)$. In the next part, we want to form the complement
            $K_{{10}}$ of that number $n_b$.
            \\begin{align}
            \\end{align}
            To get $K_{{10}}(n_b)$, we will firstly define $K_{10-1}(n_b)$.
            This is achieved by inverting the digits of $n_b (209_{10})$.
            To visualize: Invert the decimal system $\\overline{S_{10}}$ and map it to the non-inverted decimal
            system $S_{10}$ as follows
            (please note that this is a non-formal concept, which applies to any arbitrary radix):
            \\begin{align}
            \\end{align}
            $S_{10} \\rightarrow \\overline{S_{10}}:\\;\\begin{array}{|c|cccccccccc|}
                \\hline
                S_{10} & 0 & 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9\\\\
                \\hline
                \\overline{S_{10}} & 9 & 8 & 7 & 6 & 5 & 4 & 3 & 2 & 1 & 0\\\\
                \\hline
            \\end{array}$
            \\begin{align}
            \\end{align}
            $\\implies n_b \\mapsto \\overline{n_b}$
            via $( 10 - 209_{10,i} - 1 )$ or in general
            $( b - n_{b,i} - 1 ) \\mod{10}$. The modulo operator is relevant for later arithmetic operations (e.g.
            determining the two's complement in one step).
            In this case, however, it is not.

            Through
            \\begin{align}
                7 & = ( 10 - 2 - 1 )\\\\
                9 & = ( 10 - 0 - 1 )\\\\
                0 & = ( 10 - 9 - 1 ),
            \\end{align}
            we receive $(2 \\leftrightarrow 7, 0 \\leftrightarrow 9, 9 \\leftrightarrow 0)
            \\implies K_{10-1}(209_{10}) = 790_{10}$.

            From latter we conclude
            \\begin{align}
            &\\quad K_{10-1}(209_{10}) + 1_{10}\\\\
                & = K_{10}(209_{10})\\\\
                & = 790_{10} + 1_{10}\\\\
                & = 791_{10}.
            \\end{align}
        `
}
