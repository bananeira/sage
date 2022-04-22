import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { SectionHomeComponent } from './section-home/section-home.component';
import { ScrollProgressComponent } from './scroll-progress/scroll-progress.component';
import { SectionContentComponent } from './section-content/section-content.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    SectionHomeComponent,
    ScrollProgressComponent,
    SectionContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
