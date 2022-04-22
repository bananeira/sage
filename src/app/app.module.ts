import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { HeadingSectionComponent } from './heading-section/heading-section.component';
import { ScrollProgressComponent } from './scroll-progress/scroll-progress.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    HeadingSectionComponent,
    ScrollProgressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
