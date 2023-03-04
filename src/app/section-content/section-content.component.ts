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

    @HostListener('window:scroll', ['$event']) // for window scroll events
    onScroll(element: { getBoundingClientRect: () => any; }, threshold: number, mode: string) {
        this.isOnScreen(element, threshold, mode);
    }

    isOnScreen(elm: { getBoundingClientRect: () => any; }, threshold: number, mode?: string) {
        threshold = threshold || 0;
        mode = mode || 'visible';

        const rect = elm.getBoundingClientRect();
        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        const above = rect.bottom - threshold < 0;
        const below = rect.top - viewHeight + threshold >= 0;

        return mode === 'above' ? above : (mode === 'below' ? below : !above && !below);
    }
}
