import {Component, Input} from '@angular/core';
import {ToolShowcaseModel} from "../interface/tool-showcase-model";

@Component({
  selector: 'app-complement-builder-showcase',
  templateUrl: './complement-builder-showcase.component.html',
  styleUrls: ['./complement-builder-showcase.component.scss']
})
export class ComplementBuilderShowcaseComponent {

    public output: string = "Output will be given here";
    public isErrorMessage: boolean = false;
    public isSuccessMessage: boolean = false;

    @Input()
    complementBuilder?: ToolShowcaseModel;

    public toolShowcaseActive!: boolean;

    setActive(toolShowcaseActive: boolean) {
        this.toolShowcaseActive = toolShowcaseActive;
    }

    getOutput(): void {
        this.output = "ERROR: tool is yet to be implemented. please be patient.";
        this.checkForErrorMessage(this.output);
        this.checkForSuccessMessage(this.output);
    }

    checkForErrorMessage(input: string): void {
        this.isErrorMessage = this.output.startsWith("ERROR");
    }

    checkForSuccessMessage(input: string): void {
        this.isSuccessMessage = this.output.startsWith("SUCCESS");
    }
}
