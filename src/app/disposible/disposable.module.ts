import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MyMaterialModule} from "../my-material.module";
import {DisposableComponent} from "./disposable.component";
import {WebcamModule} from "ngx-webcam";

@NgModule({
  declarations: [
    DisposableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MyMaterialModule,
    WebcamModule


    // CLI adds AppRoutingModule to the AppModule's imports array
  ],
  providers: [],
  bootstrap: [DisposableComponent]
})
export class DisposableModule { }

