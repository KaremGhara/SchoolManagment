import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../../models/user-model';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.sass']
})
export class AdminDetailsComponent implements OnInit {
  breadscrums = [
    {
      title: 'profile admin',
      items: ['admin'],
      active: 'profile admin',
    },
  ];
  adminId:number;

  adminDetails:UserModel=new UserModel();
  

  constructor(
    private router: Router,
    private userServiceService: UserServiceService,
    ){}
  ngOnInit(): void {
       const storedItems= JSON.parse(localStorage.getItem('currentUser'))
       this.adminId=storedItems.id;
       this.userServiceService.getUserById(this.adminId).subscribe(data=>{
       this.adminDetails=data;
         
       })
      
  }
  updateProfileAdmin(){
    this.router.navigate(['/workspace/system-admin/update',this.adminId])
  }
}
