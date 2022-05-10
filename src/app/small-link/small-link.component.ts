import {Component, Input } from '@angular/core';
import {SmallLinkModel} from "../interface/small-link-model";

@Component({
  selector: 'app-small-link',
  templateUrl: './small-link.component.html',
  styleUrls: ['./small-link.component.scss']
})
export class SmallLinkComponent {
    @Input()
    smallLink!: SmallLinkModel;
}
