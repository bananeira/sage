import {Component, Input, OnInit} from '@angular/core';
import {LinkModel} from "../interface/link-box-model";
import {SmallLinkModel} from "../interface/small-link-model";

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent {
    @Input()
    contributions?: LinkModel[]

    @Input()
    projects?: LinkModel[]

    @Input()
    skills?: SmallLinkModel[]

    @Input()
    resources?: SmallLinkModel[]
}
