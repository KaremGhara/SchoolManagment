import { Component, OnDestroy, OnInit } from '@angular/core';
//import { SchoolClassModel } from 'src/app/_workspace/models/school-class-model';
import { UserServiceService } from '../../services/user-service.service';
import { UserModel } from '../../models/user-model';
// import * as XLSX from 'xlsx';

@Component({
  selector: 'app-attach-users',
  templateUrl: './attach-users.component.html',
  styleUrls: ['./attach-users.component.sass']
})

export class AttachUsersComponent implements OnInit {

  
  breadscrums = [
    {
      title: 'Attach user',
      items: ['User'],
      active: 'Attach User',
    },
  ];
  
  constructor(private UserServiceService: UserServiceService) { }
  users: UserModel[];

  ngOnInit(): void {

    this.UserServiceService.getAllUsers().subscribe({
      next: (users: UserModel[] )=>{this.users=users;},
      error:(error)=> {alert("Couldn't load users")}
    })
  }

}
function Injectable(arg0: { providedIn: string; }) {
  throw new Error('Function not implemented.');
}



