import { NgModule } from '@angular/core';
import { CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MyMaterialModule} from "../my-material.module";
import {HomeComponent} from "./home.component";

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MyMaterialModule,
    // CLI adds AppRoutingModule to the AppModule's imports array
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class HomeModule { }

