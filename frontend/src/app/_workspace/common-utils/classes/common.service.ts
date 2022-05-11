import { Injectable, ModuleWithProviders } from '@angular/core';
import { UserRole } from "./user-role";



export class CommonService {
 

  constructor() { }

  public getDefaultRoutByRole(role : UserRole):string
	{
		if ( role === UserRole.Admin) {
            return '/admin/dashboard/main';
          } else if (role === UserRole.MuncipalityManager) {
            return '/teacher/dashboard';
          } else if (role === UserRole.ProgramManager) {
            return '/student/dashboard';
          }
          else if (role === UserRole.SchoolStaff) {
            return '/student/dashboard';
          } else {
            return '/authentication/signin';
          }
	}
	
}
