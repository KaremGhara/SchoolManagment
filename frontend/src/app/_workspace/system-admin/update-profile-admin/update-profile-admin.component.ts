import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { UserModel } from '../../models/user-model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-update-profile-admin',
  templateUrl: './update-profile-admin.component.html',
  styleUrls: ['./update-profile-admin.component.sass']
})
export class UpdateProfileAdminComponent implements OnInit {

  breadscrums = [
    {
      title: 'Update My Profile',
      items: ['profile'],
      active: 'Update My Profile',
    },
  ];
  hide = true;
  updateAdmin:UserModel=new UserModel();
  adminForm: FormGroup;
  adminId:number;

  constructor(
    private _location: Location,
    private fb: FormBuilder,
    private adminService: UserServiceService,
    ) {
      this.adminForm = this.fb.group({
      });
      this.adminForm.addControl("password", new FormControl('', [Validators.required]))

  }

  ngOnInit(): void {
    const storedItems= JSON.parse(localStorage.getItem('currentUser'))
     this.adminId=storedItems.id;
     this.adminService.getUserById(this.adminId).subscribe(data=>{
      this.updateAdmin=data;
        
      })


  }

  UpdateAdmin(){
    const storedItems= JSON.parse(localStorage.getItem('currentUser'))
    Swal.fire({
      title: " Update",
      text: " Are you sure?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:'#d33' ,
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.value) {            
        this.adminService.updateSystemUser(this.updateAdmin).subscribe(res =>{
          if(res){

            this._location.back();
            Swal.fire('Updated', storedItems.firstName+' Updated', 'success');

          }
        }) 
      }
    });    
}



  backToList(){
    this._location.back();  }

  async onFileInput()
  {
    const { value: file } = await Swal.fire({
      title: 'Select image',
      input: 'file',
      inputAttributes: {
        'accept': 'image/*',
        'aria-label': 'Upload your profile picture'
      }
    })
    
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
   
        this.updateAdmin.userImg= e.target.result as string;
        console.log(this.updateAdmin.userImg);
        

      
      }
      reader.readAsDataURL(file)
    }
  }
}
