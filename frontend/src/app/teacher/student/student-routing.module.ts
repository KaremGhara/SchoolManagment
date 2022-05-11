import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutStudentComponent } from './about-student/about-student.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { AllStudentsComponent } from './all-students/all-students.component';
import { EditStudentComponent } from './edit-student/edit-student.component';

const routes: Routes = [
  {
    path: 'all-students',
    component: AllStudentsComponent
  },
  {
    path: 'add-student',
    component: AddStudentComponent
  },
  {
    path: 'edit-student',
    component: EditStudentComponent
  },
  {
    path: 'about-student',
    component: AboutStudentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
