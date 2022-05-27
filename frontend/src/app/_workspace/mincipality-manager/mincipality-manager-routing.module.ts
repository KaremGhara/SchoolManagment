import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './add-student/add-student.component';
import { AllSchoolsComponent } from './all-schools/all-schools.component';
import { AllStudentForMuncipalityComponent } from './all-student-for-muncipality/all-student-for-muncipality.component';
import { ProgramsInSchoolsComponent } from './programs-in-schools/programs-in-schools.component';
import { UpdateProgramLinkComponent } from './update-program-link/update-program-link.component';
import { UpdateStudentInMuncipalityComponent } from './update-student-in-muncipality/update-student-in-muncipality.component';
const routes: Routes = [{
  path:"allSchools",
    component:AllSchoolsComponent
},
{
  path:"allStudentsToMuncipality/:schoolId",
    component:AllStudentForMuncipalityComponent
},
{
  path:"addStudent/:schoolId",
    component:AddStudentComponent
},
{
  path:"updateStudent/:idrow/:schoolId",
    component:UpdateStudentInMuncipalityComponent
},
{
  path:"showProgramsInSchool/:schoolId",
    component:ProgramsInSchoolsComponent
},
{
  path:"updateProgramLink/:schoolId/:programId",
    component:UpdateProgramLinkComponent
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MincipalityManagerRoutingModule { }
