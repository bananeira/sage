import {Component, Input, OnInit} from '@angular/core';
import {LinkModel} from "../interface/link-box-model";

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
}
