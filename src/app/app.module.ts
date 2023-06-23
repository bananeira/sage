import {Component, NgModule, OnInit} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavigationBarComponent} from './navigation-bar/navigation-bar.component';
import {SectionHomeComponent} from './section-home/section-home.component';
import {ScrollProgressComponent} from './scroll-progress/scroll-progress.component';
import {SectionContentComponent} from './section-content/section-content.component';
import {LinksComponent} from './links/links.component';
import {
    ContentSkeletonPlaceholderComponent
} from './content-skeleton-placeholder/content-skeleton-placeholder.component';
import {TypeBadgeComponent} from './type-badge/type-badge.component';
import {LinkComponent} from './link/link.component';
import {LangBadgeComponent} from './lang-badge/lang-badge.component';
import {SmallLinkComponent} from './small-link/small-link.component';
import {SourceBadgeComponent} from './source-badge/source-badge.component';
import {CopyrightComponent} from './copyright/copyright.component';
import {StateBadgeComponent} from './state-badge/state-badge.component';
import {ToolShowcaseComponent} from './tool-showcase/tool-showcase.component';
import {ComplementBuilderShowcaseComponent} from './complement-builder-showcase/complement-builder-showcase.component';
import {HttpClientModule} from "@angular/common/http";
import {MathjaxModule} from "mathjax-angular";
import { RsaToolShowcaseComponent } from './rsa-tool-showcase/rsa-tool-showcase.component';
import {DashLoadingComponent} from "./dash-loading/dash-loading.component";
import { GaussToolShowcaseComponent } from './gauss-tool-showcase/gauss-tool-showcase.component';
import {environment} from "../environments/environment";

@NgModule({
    declarations: [
        AppComponent,
        NavigationBarComponent,
        SectionHomeComponent,
        ScrollProgressComponent,
        SectionContentComponent,
        LinksComponent,
        ContentSkeletonPlaceholderComponent,
        TypeBadgeComponent,
        LinkComponent,
        LangBadgeComponent,
        SmallLinkComponent,
        SourceBadgeComponent,
        CopyrightComponent,
        StateBadgeComponent,
        ToolShowcaseComponent,
        ComplementBuilderShowcaseComponent,
        RsaToolShowcaseComponent,
        DashLoadingComponent,
        GaussToolShowcaseComponent
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
