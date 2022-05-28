import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-copyright',
  templateUrl: './copyright.component.html',
  styleUrls: ['./copyright.component.scss']
})
export class CopyrightComponent {
    year: Date = new Date();
    yearOut: string | null;

    constructor(private datePipe: DatePipe){
        this.yearOut = this.datePipe.transform(this.year, 'yyyy');
    }
}
