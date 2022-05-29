import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramDetailsComponent } from '../program-manager/program-details/program-details.component';
import { AllProgramComponent } from './all-program/all-program.component';
import{ AddProgramComponent} from './add-program/add-program.component';
import {EditProgramComponent} from './edit-program/edit-program.component';
import {DeleteProgramComponent} from './delete-program/delete-program.component';
import { AttachStudentsComponent } from '../school-staff/attach-students/attach-students.component';
import { ProgramsSchoolsComponent } from './programs-schools/programs-schools.component';
import { UpdateProgramLinkInProgramManagerComponent } from './update-program-link-in-program-manager/update-program-link-in-program-manager.component';
import { ProfileProgramManagerComponent } from './profile-program-manager/profile-program-manager.component';
import { UpdateProgramManagerComponent } from './update-program-manager/update-program-manager.component';
const routes: Routes = [{

    path:"allPrograms",
      component:AllProgramComponent
  },
{
  path:"details/:id",
  //path:"program-details",
  component:ProgramDetailsComponent

},
{
path:"add-program",
component:AddProgramComponent
},
{
  path:"edit-program/:id",
  // path:"edit-program",
  component:EditProgramComponent
  },
  {
   path:"delete-program",
   component:DeleteProgramComponent
  },
  {
  path:"attach-student",
  component:AttachStudentsComponent
  },
  {
  path:"programsSchools",
  component:ProgramsSchoolsComponent
  },
  {
   path:"updateProgramLink/:schoolId/:programId",
   component:UpdateProgramLinkInProgramManagerComponent
  },
  {
    path:"ProfileProgramManager",
    component:ProfileProgramManagerComponent
    },
    {
      path:"updateProfileProgramManager",
      component:UpdateProgramManagerComponent
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramManagerRoutingModule { }
