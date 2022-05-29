import {Component, Input, OnInit} from '@angular/core';
import {LinkModel} from "../interface/link-box-model";
import {SmallLinkModel} from "../interface/small-link-model";
import {projects} from "../constants/projects.constant";

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit{
    @Input()
    contributions?: LinkModel[]

    @Input()
    projects?: LinkModel[]

    @Input()
    skills?: SmallLinkModel[]

    @Input()
    resources?: SmallLinkModel[]

    ngOnInit(): void {
        projects.sort((project1: LinkModel, project2: LinkModel) => (project1.state - project2.state));
    }
}
