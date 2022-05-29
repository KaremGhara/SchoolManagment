import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProgramManagerURL } from '../../models/global-constant';
import { UserModel } from '../../models/user-model';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-profile-program-manager',
  templateUrl: './profile-program-manager.component.html',
  styleUrls: ['./profile-program-manager.component.sass']
})
export class ProfileProgramManagerComponent implements OnInit {

  breadscrums = [
    {
      title: 'My Profile',
      items: ['profile'],
      active: 'My Profile',
    },
  ];

  programManagerId:number;

  programManager:UserModel=new UserModel();
  
  constructor(
    private router: Router,
    private programManagerService: UserServiceService,
    ){}
  ngOnInit(): void {
       const storedItems= JSON.parse(localStorage.getItem('currentUser'))
       this.programManagerId=storedItems.id;
       this.programManagerService.getUserById(this.programManagerId).subscribe(data=>{
       this.programManager=data;
         
       })
      
  }

  updateProfileProgramManager(){
    this.router.navigate([ProgramManagerURL+'/updateProfileProgramManager'])
  }


}
