import {Component, Input} from '@angular/core';
import {ContentModel} from "../interface/content-model";

@Component({
  selector: 'app-section-content',
  templateUrl: './section-content.component.html',
  styleUrls: ['./section-content.component.scss']
})
export class SectionContentComponent {
    @Input()
    content?: ContentModel;
}
