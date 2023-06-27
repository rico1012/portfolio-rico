import { NgModule } from '@angular/core';
import { CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NavbarComponent} from "./navbar.component";
import {MyMaterialModule} from "../my-material.module";

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MyMaterialModule,
    // CLI adds AppRoutingModule to the AppModule's imports array
  ],
  providers: [],
  bootstrap: [NavbarComponent]
})
export class NavbarModule { }

