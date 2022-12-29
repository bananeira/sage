import {Component, Input, OnInit} from '@angular/core';
import {LinkModel} from "../interface/link-box-model";
import {BadgeModel} from "../interface/badge-model";
import {typeBadgeModels} from "../constants/type-badge-constant";
import {langBadgeModels} from "../constants/lang-badge-constant"
import {stateBadgeModels} from "../constants/state-badge-constant";
import {StateBadgeModel} from "../interface/state-badge-model";

@Component({
    selector: 'app-link',
    templateUrl: './link.component.html',
    styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {
    @Input()
    link!: LinkModel;
    typeBadges: BadgeModel[] = [];
    langBadges: BadgeModel[] = [];
    stateBadge?: StateBadgeModel;

    boxLink?: string;
    sourceLinks: string[] = [];

    ngOnInit(): void {
        if (this.link.link) {
            this.boxLink = this.link.link;
        } else {
            this.boxLink = this.link.codeLink;
        }

        this.stateBadge = stateBadgeModels.find(
            (stateBadge: StateBadgeModel) => (stateBadge.state === this.link.state)
        );

        if (this.link.remit)
            for (const remit of this.link.remit) {
                const foundTypeBadge = typeBadgeModels.find(
                    (remitBadge: BadgeModel) => (remitBadge.id === remit)
                )

                if (undefined === foundTypeBadge) {
                    continue;
                }

                this.typeBadges.push(foundTypeBadge);
            }

        for (const lang of this.link.language) {
            const foundLangBadge = langBadgeModels.find(
                (langBadge: BadgeModel) => (langBadge.id === lang)
            )

            if (undefined === foundLangBadge) {
                continue;
            }

            this.langBadges.push(foundLangBadge);
        }
        this.buildSourceBadgeName();
    }

    private buildSourceBadgeName() {
        if (this.link.codeLink?.includes("github.com/")) {
            this.sourceLinks.push("GitHub");
        }

        if (this.link.link?.includes("vercel.app/")) {
            this.sourceLinks.push("Vercel");
        }

        if (this.link.link?.includes("insightmaker.com/")) {
            this.sourceLinks.push("InsightMaker");
        }
    }
}
