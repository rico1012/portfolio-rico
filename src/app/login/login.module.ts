import { NgModule } from '@angular/core';
import { CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MyMaterialModule} from "../my-material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatTooltipModule} from "@angular/material/tooltip";
import {LoginComponent} from "./login.component";

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MyMaterialModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    // CLI adds AppRoutingModule to the AppModule's imports array
  ],
  providers: [],
  exports: [
    LoginComponent
  ],
  bootstrap: [LoginComponent]
})
export class LoginModule { }
