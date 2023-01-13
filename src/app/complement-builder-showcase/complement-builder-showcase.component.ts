import {Component, Input} from '@angular/core';
import {ToolShowcaseModel} from "../interface/tool-showcase-model";
import {ComplementBuilderService} from "../service/complement-builder.service";

@Component({
    selector: 'app-complement-builder-showcase',
    templateUrl: './complement-builder-showcase.component.html',
    styleUrls: ['./complement-builder-showcase.component.scss']
})
export class ComplementBuilderShowcaseComponent {
    inputString: string = "";
    radix: number = 2;
    length: number = 8;

    constructor(private complementBuilderService: ComplementBuilderService) {
    }

    public outputs:{ text: string, className?: string}[] = [
        { text:"Output will be given here", className: "hint" },
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

    pushOutput(output: string) {
    }

    getOutput(): void {
        this.complementBuilderService.sendComplementBuilderRequest();

        //this.outputs.push({text: "ERROR: the tool is yet to be implemented. please be patient", className: "error"});
        //this.outputs.push({text: `SUCCESS: your values are (l: ${this.length} r: ${this.radix} i:${this.inputString}).`, className: "success"});
    }

    checkForErrorMessage(input: string): boolean {
        return input.startsWith("ERROR");
    }

    checkForSuccessMessage(input: string): boolean {
        return input.startsWith("SUCCESS");
    }

    checkForHintMessage(input: string): boolean {
        return input.startsWith("HINT");
    }
}
