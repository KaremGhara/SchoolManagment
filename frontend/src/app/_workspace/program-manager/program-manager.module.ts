import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramManagerRoutingModule } from './program-manager-routing.module';
import {CommonUtilsModule } from '../common-utils/common-utils.module';
import { SharedModule } from '../../shared/shared.module';
import { ProgramImageComponent } from './program-image/program-image.component';
import { ProgramDetailsComponent } from './program-details/program-details.component';
import { AllProgramComponent } from './all-program/all-program.component';
import { AddProgramComponent } from './add-program/add-program.component';
import { EditProgramComponent } from './edit-program/edit-program.component';
import { DeleteProgramComponent } from './delete-program/delete-program.component';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { AttachStudentsComponent } from './attach-students/attach-students.component';
import { ProgramsSchoolsComponent } from './programs-schools/programs-schools.component';
import { UpdateProgramLinkInProgramManagerComponent } from './update-program-link-in-program-manager/update-program-link-in-program-manager.component';
import { ProfileProgramManagerComponent } from './profile-program-manager/profile-program-manager.component';
import { MatCardModule } from '@angular/material/card';
import { UpdateProgramManagerComponent } from './update-program-manager/update-program-manager.component';
@NgModule({
  declarations: [

    ProgramImageComponent,
      ProgramDetailsComponent,
      AllProgramComponent,
      AddProgramComponent,
      EditProgramComponent,
      DeleteProgramComponent,
      AttachStudentsComponent,
      ProgramsSchoolsComponent,
      UpdateProgramLinkInProgramManagerComponent,
      ProfileProgramManagerComponent,
      UpdateProgramManagerComponent,

  ],
  imports: [
    CommonModule,
    ProgramManagerRoutingModule,
    CommonUtilsModule,
    SharedModule,
    ReactiveFormsModule,
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
    MatCardModule,
  ]
})
export class ProgramManagerModule { }
