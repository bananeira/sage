import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {BadgeModel} from "../interface/badge-model";

@Component({
  selector: 'app-type-badge',
  templateUrl: './type-badge.component.html',
  styleUrls: ['./type-badge.component.scss']
})
export class TypeBadgeComponent {
    @Input()
    badge!: BadgeModel;
}
