import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 
  {
    path: 'school-staff',
    loadChildren: () =>
      import('./school-staff/school-staff.module').then((m) => m.SchoolStaffModule),
  },
  {
    path: 'mincipality-manager',
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
  }
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class _WorkSpaceRoutingModule { }
