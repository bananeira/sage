import {Component, Input, OnInit} from '@angular/core';
import {LinkModel} from "../interface/link-box-model";
import {TypeBadgeModel} from "../interface/type-badge-model";
import {typeBadgeModels} from "../constants/type-badge-constant";

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {
    @Input()
    link!: LinkModel;

    badges: TypeBadgeModel[] = [];

    ngOnInit(): void {
        for (const badge of this.link.badges) {
            const foundBadge = typeBadgeModels.find(
                (contributionBadge: TypeBadgeModel) => (contributionBadge.id === badge)
            )

            if (undefined === foundBadge) {
                continue;
            }

            this.badges.push(foundBadge);
        }
    }
}
