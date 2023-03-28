import {Component} from '@angular/core';
import { sectionContentModels } from "./constants/section-content.constant";
import { SectionContentModel } from "./interface/section-content-model";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: []
})
export class AppComponent {
    textSectionContent: SectionContentModel[] = sectionContentModels;
    showWebring: boolean = true;
    minimizeWebring: boolean = true;

    toggleShowWebring(): void {
        this.showWebring = !this.showWebring;
    }

    toggleMinimizeWebring(): void {
        this.minimizeWebring = !this.minimizeWebring;
    }
}
