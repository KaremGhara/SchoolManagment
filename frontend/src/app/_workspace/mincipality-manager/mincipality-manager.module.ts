import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MincipalityManagerRoutingModule } from './mincipality-manager-routing.module';
import {CommonUtilsModule } from '../common-utils/common-utils.module';
import { SharedModule } from '../../shared/shared.module';
import { AllSchoolsComponent } from './all-schools/all-schools.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    
    AllSchoolsComponent
  ],
  imports: [
    CommonModule,
    MincipalityManagerRoutingModule,
    CommonUtilsModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
  ]
})
export class MincipalityManagerModule { }
