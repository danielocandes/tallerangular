import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { App } from './app';
import { SeriesListComponent } from './series/series-list/series-list';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SeriesListComponent
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }