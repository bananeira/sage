import {Component, Input } from '@angular/core';

@Component({
    selector: 'app-source-badge',
    templateUrl: './source-badge.component.html',
    styleUrls: ['./source-badge.component.scss']
})
export class SourceBadgeComponent {
    @Input()
    displayName?: string;
}
