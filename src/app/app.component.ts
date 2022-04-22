import {Component} from '@angular/core';
import {textSectionContent} from "./constants/section-content.constant";
import {SectionContentModel} from "./interface/section-content-model";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [

    ]
})
export class AppComponent {
    textSectionContent: SectionContentModel[] = textSectionContent;
}
