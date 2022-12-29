import {Component, Input} from '@angular/core';
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

    tool = tools.find(
        (toolShowcaseModel?: ToolShowcaseModel) => (toolShowcaseModel?.id === "complement-builder-tool")
    );
}
