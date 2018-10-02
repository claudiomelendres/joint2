import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Pagina1Component } from './pagina1/pagina1.component';
import { UmlComponent } from './uml/uml.component';

@NgModule({
  declarations: [
    AppComponent,
    Pagina1Component,
    UmlComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
