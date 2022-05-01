import {Component, Input} from '@angular/core';
import {LangBadgeModel} from "../interface/lang-badge-model";

@Component({
  selector: 'app-lang-badge',
  templateUrl: './lang-badge.component.html',
  styleUrls: ['./lang-badge.component.scss']
})
export class LangBadgeComponent {
    @Input()
    badge!: LangBadgeModel;
}
