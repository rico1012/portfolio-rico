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
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";


@NgModule({ declarations: [
        AppComponent,
        NavbarComponent,
    ],
    bootstrap: [AppComponent], imports: [MyMaterialModule,
        AppRoutingModule,
        BrowserModule,
        RouterModule,
        HomeModule,
        NgbModule,
        ContactModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
