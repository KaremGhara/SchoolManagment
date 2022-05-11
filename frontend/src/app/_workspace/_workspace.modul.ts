import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // <<<< import it here
import {UserServiceService} from './services/user-service.service';
import { UserModel } from './models/user-model';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports:[
    UserServiceService,
    UserModel
  ]

  
})
export class _WorkSpaceAdminModule { }
