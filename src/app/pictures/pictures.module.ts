import { NgModule } from '@angular/core';
import { CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MyMaterialModule} from "../my-material.module";
import {PicturesComponent} from "./pictures.component";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  declarations: [
    PicturesComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    MyMaterialModule,
    BrowserModule
    // CLI adds AppRoutingModule to the AppModule's imports array
  ],
  providers: [],
  exports: [PicturesComponent],
  bootstrap: [PicturesComponent]
})
export class PicturesModule { }

