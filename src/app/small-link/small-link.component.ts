import {Component, Input, OnInit} from '@angular/core';
import {SmallLinkModel} from "../interface/small-link-model";
import {typeBadgeModels} from "../constants/type-badge-constant";
import {TypeBadgeModel} from "../interface/type-badge-model";
import {langBadgeModels} from "../constants/lang-badge-constant";
import {LangBadgeModel} from "../interface/lang-badge-model";

@Component({
  selector: 'app-small-link',
  templateUrl: './small-link.component.html',
  styleUrls: ['./small-link.component.scss']
})
export class SmallLinkComponent {
    @Input()
    smallLink!: SmallLinkModel;
}
