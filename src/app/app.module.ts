import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { ContributionCardComponent } from './contribution-card/contribution-card.component';
import { HeadingSectionComponent } from './heading-section/heading-section.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    ContributionCardComponent,
    HeadingSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
