import { NgModule } from '@angular/core';
import { CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MyMaterialModule} from "../my-material.module";
import {ContactComponent} from "./contact.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [
    ContactComponent,
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
  bootstrap: [ContactComponent]
})
export class ContactModule { }
