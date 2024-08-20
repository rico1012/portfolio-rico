import { NgModule } from '@angular/core';
import { CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MyMaterialModule} from "../my-material.module";
import {DisposibleComponent} from "./disposible.component";

@NgModule({
  declarations: [
    DisposibleComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MyMaterialModule,
    // CLI adds AppRoutingModule to the AppModule's imports array
  ],
  providers: [],
  bootstrap: [DisposibleComponent]
})
export class DisposibleModule { }

