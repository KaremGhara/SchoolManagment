import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommonUtilsModule } from '../common-utils/common-utils.module';
import { SharedModule } from '../../shared/shared.module';
import { SchoolRoutingModule } from './school-routing.module';
import { AllSchoolComponent } from './all-school/all-school.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{SchoolToProgramComponent} from './school-to-program/school-to-program.component'

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SchoolSelectorComponent } from './school-selector/school-selector.component';
import { EditLinkedProgramComponent } from './edit-linked-program/edit-linked-program.component';
import { ProgramsToSchoolComponent } from './programs-to-school/programs-to-school.component';
// import { DragulaModule } from 'ng2-dragula';



@NgModule({
  declarations: [
    AllSchoolComponent,
    SchoolSelectorComponent,
    SchoolToProgramComponent,
    EditLinkedProgramComponent,
    ProgramsToSchoolComponent
  ],
  imports: [
    CommonModule,
    SchoolRoutingModule,
    CommonUtilsModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatTabsModule,
    MatMenuModule,
    MaterialFileInputModule,
    MatProgressSpinnerModule,
    // DragulaModule.forRoot(),

 
  ]
})
export class SchoolModule { }
