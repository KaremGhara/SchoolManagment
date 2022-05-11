import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllSchoolsComponent } from './all-schools/all-schools.component';
const routes: Routes = [{
  path:"allSchools",
    component:AllSchoolsComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MincipalityManagerRoutingModule { }
