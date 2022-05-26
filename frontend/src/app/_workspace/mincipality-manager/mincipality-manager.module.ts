import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MincipalityManagerRoutingModule } from './mincipality-manager-routing.module';
import {CommonUtilsModule } from '../common-utils/common-utils.module';
import { SharedModule } from '../../shared/shared.module';
import { AllSchoolsComponent } from './all-schools/all-schools.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AllStudentForMuncipalityComponent } from './all-student-for-muncipality/all-student-for-muncipality.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { UpdateStudentInMuncipalityComponent } from './update-student-in-muncipality/update-student-in-muncipality.component';

@NgModule({
  declarations: [
    
    AllSchoolsComponent,
          AllStudentForMuncipalityComponent,
          AddStudentComponent,
          UpdateStudentInMuncipalityComponent
  ],
  imports: [
    CommonModule,
    MincipalityManagerRoutingModule,
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
    ComponentsModule,
  ]
})
export class MincipalityManagerModule { }
