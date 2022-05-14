import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from '../authentication/page404/page404.component';
import { AuthLayoutComponent } from '../layout/app-layout/auth-layout/auth-layout.component';

const routes: Routes = [
 
  {
    path: 'school-staff',
    loadChildren: () =>
      import('./school-staff/school-staff.module').then((m) => m.SchoolStaffModule),
  },
  {
    path: 'municipality-manager',
    loadChildren: () =>
      import('./mincipality-manager/mincipality-manager.module').then((m) => m.MincipalityManagerModule),
  },
  {
    path: 'program-manager',
    loadChildren: () =>
      import('./program-manager/program-manager.module').then((m) => m.ProgramManagerModule),
  },
  {
    path: 'system-admin',
    loadChildren: () =>
      import('./system-admin/system-admin.module').then((m) => m.SystemAdminModule),
  },{
    path: 'school',
    loadChildren: () =>
      import('./school/school.module').then((m) => m.SchoolModule),
  },
  {
    path: 'authentication',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  { path: '**', component: Page404Component },
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class _WorkSpaceRoutingModule { }
