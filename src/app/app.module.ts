import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MyMaterialModule} from "./my-material.module";
import {NavbarComponent} from "./navbar/navbar.component";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    MyMaterialModule,
    BrowserModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
