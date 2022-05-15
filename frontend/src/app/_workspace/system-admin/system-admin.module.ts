import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemAdminRoutingModule } from './system-admin-routing.module';
import {CommonUtilsModule } from '../common-utils/common-utils.module';
import { SharedModule } from '../../shared/shared.module';
import { AddUserComponent } from './add-user/add-user.component';
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
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AllUsersComponent } from './all-users/all-users.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { AttachUsersComponent } from './attach-users/attach-users.component';
import { DeleteComponent } from '../system-admin/all-users/dialogs/delete/delete.component';
import { ImportComponent } from '../system-admin/all-users/dialogs/import/import.component';
import { AttachSchoolStaffToSchoolComponent } from './attach-school-staff-to-school/attach-school-staff-to-school.component';
import { SchoolStaffSelectorComponent } from './school-staff-selector/school-staff-selector.component';
import { AdminDetailsComponent } from './admin-details/admin-details.component';
import { MatCardModule } from '@angular/material/card';





@NgModule({
  declarations: [
    AddUserComponent,
    AllUsersComponent,
    UpdateUserComponent,
    AttachUsersComponent,
    DeleteComponent,
    ImportComponent,
    AttachSchoolStaffToSchoolComponent,
    SchoolStaffSelectorComponent,
    AdminDetailsComponent
    
  ],
  imports: [
    CommonModule,
    SystemAdminRoutingModule,
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
    //
    CommonModule,
    SystemAdminRoutingModule,
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
    SystemAdminRoutingModule,
    MatCardModule
    
  ]
})
export class SystemAdminModule { }
