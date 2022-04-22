import {
    AfterContentInit,
    AfterViewInit,
    Component,
    HostListener,
    OnInit,
    Renderer2,
    TemplateRef,
    ViewChild
} from '@angular/core';

@Component({
    selector: 'app-scroll-progress',
    templateUrl: './scroll-progress.component.html',
    styleUrls: ['./scroll-progress.component.scss']
})
export class ScrollProgressComponent {
    public progress = 0;

    @HostListener("window:scroll", [])
    determineScrollProgress(): void {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const scrollProgress = (scrollTop / (scrollHeight - clientHeight)) * 100;

        this.progress = this.round(scrollProgress, 0, 100);
    }

    round(value: number, min: number, max: number): number {
        if (value > max) {
            return max;
        }

        if (value < min) {
            return min;
        }

        return value;
    }
}
