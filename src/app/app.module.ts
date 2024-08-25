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
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {environment} from "../environments/environment";
import {LoginModule} from "./login/login.module";
import {AngularFirestore, AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {FormsModule} from "@angular/forms";
import {PicturesModule} from "./pictures/pictures.module";
import {WebcamModule} from 'ngx-webcam';
import {DisposableModule} from "./disposible/disposable.module";


@NgModule({ declarations: [
        AppComponent,
        NavbarComponent,
    ],
    bootstrap: [AppComponent], imports: [
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebaseConfig, 'portfolio-Rico'),
        AngularFirestoreModule,
        AngularFireStorageModule,
        MyMaterialModule,
        AppRoutingModule,
        BrowserModule,
    FormsModule,
        RouterModule,
        HomeModule,
        NgbModule,
        ContactModule,
        LoginModule,
    PicturesModule,
    WebcamModule,
    DisposableModule
  ], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
