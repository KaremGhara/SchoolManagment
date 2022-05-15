import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddUserComponent} from './add-user/add-user.component';
import { AdminDetailsComponent } from './admin-details/admin-details.component';
import {AllUsersComponent} from './all-users/all-users.component';
import { AttachSchoolStaffToSchoolComponent } from './attach-school-staff-to-school/attach-school-staff-to-school.component';
import {UpdateUserComponent} from './update-user/update-user.component';

const routes: Routes = [{
  path:"add",
    component:AddUserComponent
},
{
  path:"all",
    component:AllUsersComponent
},

{
path:"update/:id",
component:UpdateUserComponent
},
{
  path:"attachSchoolStaffToSchool",
  component:AttachSchoolStaffToSchoolComponent
  },
  {
    path:"adminDerails",
    component:AdminDetailsComponent
    },

];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemAdminRoutingModule { }
