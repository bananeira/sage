import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {TypeBadgeModel} from "../interface/type-badge-model";

@Component({
  selector: 'app-type-badge',
  templateUrl: './type-badge.component.html',
  styleUrls: ['./type-badge.component.scss']
})
export class TypeBadgeComponent {
    @Input()
    badge!: TypeBadgeModel;
}
