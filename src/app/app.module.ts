import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { SectionHomeComponent } from './section-home/section-home.component';
import { ScrollProgressComponent } from './scroll-progress/scroll-progress.component';
import { SectionContentComponent } from './section-content/section-content.component';
import { ContributionBoxComponent } from './contribution-box/contribution-box.component';
import { ContentPlaceholderComponent } from './content-placeholder/content-placeholder.component';
import { ContributionBadgeComponent } from './contribution-badge/contribution-badge.component';
import { SectionFooterComponent } from './section-footer/section-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    SectionHomeComponent,
    ScrollProgressComponent,
    SectionContentComponent,
    ContributionBoxComponent,
    ContentPlaceholderComponent,
    ContributionBadgeComponent,
    SectionFooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
