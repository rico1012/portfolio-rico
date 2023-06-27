import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MyMaterialModule} from "./my-material.module";
import {NavbarComponent} from "./navbar/navbar.component";
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing-module";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    MyMaterialModule,
    AppRoutingModule,
    BrowserModule,
    RouterModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
