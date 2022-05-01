import {Component, Input, OnInit} from '@angular/core';
import {LinkModel} from "../interface/link-box-model";
import {TypeBadgeModel} from "../interface/type-badge-model";
import {typeBadgeModels} from "../constants/type-badge-constant";
import {LangBadgeModel} from "../interface/lang-badge-model";
import {langBadgeModels} from "../constants/lang-badge-constant";

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {
    @Input()
    link!: LinkModel;

    typeBadges: TypeBadgeModel[] = [];
    langBadges: TypeBadgeModel[] = [];

    ngOnInit(): void {
        for (const remit of this.link.remit) {
            const foundTypeBadge = typeBadgeModels.find(
                (remitBadge: TypeBadgeModel) => (remitBadge.id === remit)
            )

            if (undefined === foundTypeBadge) {
                continue;
            }

            this.typeBadges.push(foundTypeBadge);
        }

        for (const lang of this.link.language) {
            const foundLangBadge = langBadgeModels.find(
                (langBadge: LangBadgeModel) => (langBadge.id === lang)
            )

            if (undefined === foundLangBadge) {
                continue;
            }

            this.langBadges.push(foundLangBadge);
        }
    }
}
