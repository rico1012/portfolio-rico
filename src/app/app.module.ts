import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MyMaterialModule} from "./my-material.module";
import {NavbarComponent} from "./navbar/navbar.component";
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing-module";
import {HomeModule} from "./home/home.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ContactModule} from "./contact/contact.module";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    MyMaterialModule,
    AppRoutingModule,
    BrowserModule,
    RouterModule,
    HomeModule,
    NgbModule,
    ContactModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
