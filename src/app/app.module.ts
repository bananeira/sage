import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SectionHomeComponent} from './section-home/section-home.component';
import {CopyrightComponent} from './copyright/copyright.component';
import {HttpClientModule} from "@angular/common/http";
import {MathjaxModule} from "mathjax-angular";

@NgModule({
    declarations: [
        AppComponent,
        SectionHomeComponent,
        CopyrightComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        MathjaxModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
