import {Component, Input, OnInit} from '@angular/core';
import {StateBadgeModel} from "../interface/state-badge-model";
import {projects} from "../constants/projects.constant";

@Component({
    selector: 'app-state-badge',
    templateUrl: './state-badge.component.html',
    styleUrls: ['./state-badge.component.scss']
})
export class StateBadgeComponent {

    @Input()
    badge?: StateBadgeModel;

    @Input()
    conclusionDate?: string;

}
