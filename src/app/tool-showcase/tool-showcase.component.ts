import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ToolShowcaseModel} from "../interface/tool-showcase-model";

@Component({
  selector: 'app-tool-showcase',
  templateUrl: './tool-showcase.component.html',
  styleUrls: ['./tool-showcase.component.scss']
})
export class ToolShowcaseComponent {
    @Input()
    tool?: ToolShowcaseModel;

    public toolShowcaseActive: boolean = false;

    @Output()
    public toolShowcaseActiveOutput: EventEmitter<boolean> = new EventEmitter<boolean>();

    public toggleToolShowcase(): void {
        this.toolShowcaseActive = !this.toolShowcaseActive
        this.toolShowcaseActiveOutput.emit(this.toolShowcaseActive);
    }
}
