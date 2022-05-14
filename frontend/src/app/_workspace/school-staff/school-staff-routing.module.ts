import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './add-student/add-student.component';
import { AllStudentsComponent } from './all-students/all-students.component';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { AttachStudentsComponent } from './attach-students/attach-students.component';

const routes: Routes = [
  {
  path:"add/:id/:schoolName",
    component:AddStudentComponent
},
{
  path:"all",
  component:AllStudentsComponent
},
{
  path:"update/:id/:idrow/:schoolName",
  component:UpdateStudentComponent
},
{
  path:"attach",
    component:AttachStudentsComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolStaffRoutingModule {

 }
