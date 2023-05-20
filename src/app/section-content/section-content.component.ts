import {Component, HostListener, Input} from '@angular/core';
import {SectionContentModel} from "../interface/section-content-model";
import {ToolShowcaseModel} from "../interface/tool-showcase-model";
import {tools} from "../constants/tools.constant";

@Component({
  selector: 'app-section-content',
  templateUrl: './section-content.component.html',
  styleUrls: ['./section-content.component.scss']
})
export class SectionContentComponent {
    @Input()
    content?: SectionContentModel;

    complementTool = tools.find(
        (toolShowcaseModel?: ToolShowcaseModel) => (toolShowcaseModel?.id === "complement-builder-tool")
    );

    rsaTool = tools.find(
        (toolShowcaseModel?: ToolShowcaseModel) => (toolShowcaseModel?.id === "rsa")
    );

    gaussTool = tools.find(
        (toolShowcaseModel?: ToolShowcaseModel) => (toolShowcaseModel?.id === "gauss")
    );
}
