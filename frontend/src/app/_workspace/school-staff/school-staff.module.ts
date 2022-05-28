import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolStaffRoutingModule } from './school-staff-routing.module';
import { AddStudentComponent } from './add-student/add-student.component';
import { AttachStudentsComponent } from './attach-students/attach-students.component';
import {CommonUtilsModule } from '../common-utils/common-utils.module';
import { SharedModule } from '../../shared/shared.module';
import { AllStudentsComponent } from './all-students/all-students.component';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
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
import { StudentsRoutingModule } from 'src/app/admin/students/students-routing.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { DeleteComponent } from './all-students/dialogs/delete/delete.component';
import { FormDeleteComponent } from './all-students/dialogs/form-delete/form-delete.component';
import { StudentslistComponent } from './studentslist/studentslist.component';
import { StudentcardComponent } from './studentcard/studentcard.component';
import { ProgramcardComponent } from './programcard/programcard.component';
import { ProgramlistComponent } from './programlist/programlist.component';
import { SchoolslistComponent } from './schoolslist/schoolslist.component';
import { SchoolcardComponent } from './schoolcard/schoolcard.component';
import { ClassroomcardComponent } from './classroomcard/classroomcard.component';
import { ClassroomlistComponent } from './classroomlist/classroomlist.component';
import { ImportFileComponent } from './all-students/dialogs/import-file/import-file.component';
import { AviableProgramCardComponent } from './aviable-program-card/aviable-program-card.component';
import { LinkProgramToSchoolComponent } from './link-program-to-school/link-program-to-school.component';
import { SelectorClassesRoomInSchoolStaffComponent } from './selector-classes-room-in-school-staff/selector-classes-room-in-school-staff.component';
import { AllClassesRoomsInSchoolStaffComponent } from './all-classes-rooms-in-school-staff/all-classes-rooms-in-school-staff.component';



@NgModule({
  declarations: [
    AddStudentComponent,
    AllStudentsComponent,
    UpdateStudentComponent,
    DeleteComponent,
    FormDeleteComponent,
    AttachStudentsComponent,
    StudentslistComponent,
    StudentcardComponent,
    ProgramcardComponent,
    ProgramlistComponent,
    SchoolslistComponent,
    SchoolcardComponent,
    ClassroomcardComponent,
    ClassroomlistComponent,
    ImportFileComponent,
    AviableProgramCardComponent,
    LinkProgramToSchoolComponent,
    SelectorClassesRoomInSchoolStaffComponent,
    AllClassesRoomsInSchoolStaffComponent
  ],
  imports: [
    CommonModule,
    SchoolStaffRoutingModule,
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
    StudentsRoutingModule,
    MatProgressSpinnerModule,
    ComponentsModule,
    
  ]
})
export class SchoolStaffModule { }
