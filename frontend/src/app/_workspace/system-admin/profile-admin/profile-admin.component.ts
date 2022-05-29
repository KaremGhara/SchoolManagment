import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { admin } from '../../models/global-constant';
import { UserModel } from '../../models/user-model';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.sass']
})
export class ProfileAdminComponent implements OnInit {

  breadscrums = [
    {
      title: 'My Profile',
      items: ['profile'],
      active: 'My Profile',
    },
  ];

  adminId:number;

  admin:UserModel=new UserModel();
  
  constructor(
    private router: Router,
    private adminService: UserServiceService,
    ){}
  ngOnInit(): void {
       const storedItems= JSON.parse(localStorage.getItem('currentUser'))
       this.adminId=storedItems.id;
       this.adminService.getUserById(this.adminId).subscribe(data=>{
       this.admin=data;
         
       })
      
  }

  updateProfileAdmin(){
    this.router.navigate([admin+'/updateAdmin'])
  }


}
