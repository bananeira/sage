import {Component, Input, OnInit} from '@angular/core';
import {ToolShowcaseModel} from "../interface/tool-showcase-model";

@Component({
  selector: 'app-tool-showcase',
  templateUrl: './tool-showcase.component.html',
  styleUrls: ['./tool-showcase.component.scss']
})
export class ToolShowcaseComponent {
    @Input()
    tools?: ToolShowcaseModel;
}
