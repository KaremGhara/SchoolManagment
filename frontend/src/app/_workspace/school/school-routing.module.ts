import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllSchoolComponent } from './all-school/all-school.component';
import { SchoolToProgramComponent } from './school-to-program/school-to-program.component';
import {EditLinkedProgramComponent}from './edit-linked-program/edit-linked-program.component';
import { ProgramsToSchoolComponent } from './programs-to-school/programs-to-school.component';

const routes: Routes = [{
    path:"all",
      component:AllSchoolComponent
  },
  {
    path:"link/:id/:id2",
      component:SchoolToProgramComponent
  },
  {
    path:"edit/:id/:id2",
    component:EditLinkedProgramComponent},
    {path:"linkProgramsSchool",
      component:ProgramsToSchoolComponent
  }
  /*,{
    path: 'selectSchool',
    component: SelectSchoolComponent,
  }
*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolRoutingModule { }
