import { NgModule }                 from '@angular/core';
import { MatToolbarModule }         from '@angular/material/toolbar';
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTableModule} from "@angular/material/table";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatChipGrid, MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatCardModule} from "@angular/material/card";


const materialModules = [
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatDialogModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatSelectModule,
  MatButtonModule,
  MatInputModule,
  MatSnackBarModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatCardModule
]

@NgModule({
  imports: materialModules,
  exports: materialModules
})
export class MyMaterialModule
{
}
