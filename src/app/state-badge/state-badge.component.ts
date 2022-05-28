import {Component, Input, OnInit} from '@angular/core';
import {BadgeModel} from "../interface/badge-model";

@Component({
    selector: 'app-state-badge',
    templateUrl: './state-badge.component.html',
    styleUrls: ['./state-badge.component.scss']
})
export class StateBadgeComponent {

    @Input()
    badge?: BadgeModel;

    @Input()
    conclusionDate?: string;

}
