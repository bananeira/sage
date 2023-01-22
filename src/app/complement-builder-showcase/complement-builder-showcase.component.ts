import {Component, Input} from '@angular/core';
import {ToolShowcaseModel} from "../interface/tool-showcase-model";
import {ComplementBuilderService, Output} from "../service/complement-builder.service";
import {map, take} from "rxjs";

@Component({
    selector: 'app-complement-builder-showcase',
    templateUrl: './complement-builder-showcase.component.html',
    styleUrls: ['./complement-builder-showcase.component.scss']
})
export class ComplementBuilderShowcaseComponent {
    inputString: string = "";
    radix: number = 2;
    length: number = 8;
    getMinusOneComplement: boolean = false;

    constructor(private complementBuilderService: ComplementBuilderService) {
    }

    public outputs: Output[] = [
        {text: "Output will be given here", status: "hint"},
    ]
    public isErrorMessage: boolean = false;
    public isSuccessMessage: boolean = false;

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
        console.log(this.getMinusOneComplement);
    }
}
