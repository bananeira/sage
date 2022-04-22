import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-progress',
  templateUrl: './scroll-progress.component.html',
  styleUrls: ['./scroll-progress.component.scss']
})

export class ScrollProgressComponent implements OnInit {
    outProgress: any;

  constructor() { }

  ngOnInit(): void {
  }

}

document.addEventListener("scroll", scrollProgressBar);

function scrollProgressBar(this: any) {
    let scrollTop = document.documentElement.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight;
    let clientHeight = document.documentElement.clientHeight;
    let scrollProgress = (scrollTop / (scrollHeight - clientHeight)) * 100;

    function round(value: number, min: number, max: number) {
        if (value > max) {
            return max;
        }

        if (value < min) {
            return min;
        }

        return value;
    }

    this.outProgress = round(scrollProgress, 0, 100);
}
