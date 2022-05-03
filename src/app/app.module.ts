import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { SectionHomeComponent } from './section-home/section-home.component';
import { ScrollProgressComponent } from './scroll-progress/scroll-progress.component';
import { SectionContentComponent } from './section-content/section-content.component';
import { LinksComponent } from './links/links.component';
import { ContentSkeletonPlaceholderComponent } from './content-skeleton-placeholder/content-skeleton-placeholder.component';
import { TypeBadgeComponent } from './type-badge/type-badge.component';
import { SectionFooterComponent } from './section-footer/section-footer.component';
import { SkillBoxComponent } from './skill-box/skill-box.component';
import { LinkComponent } from './link/link.component';
import { LangBadgeComponent } from './lang-badge/lang-badge.component';
import { ContentEmptyComponent } from './content-empty/content-empty.component';

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
    SectionFooterComponent,
    SkillBoxComponent,
    LinkComponent,
    LangBadgeComponent,
    ContentEmptyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
