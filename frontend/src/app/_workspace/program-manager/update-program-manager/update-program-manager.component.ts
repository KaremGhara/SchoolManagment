import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserModel } from '../../models/user-model';
import { UserServiceService } from '../../services/user-service.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-update-program-manager',
  templateUrl: './update-program-manager.component.html',
  styleUrls: ['./update-program-manager.component.sass']
})
export class UpdateProgramManagerComponent implements OnInit {
  breadscrums = [
    {
      title: 'Update My Profile',
      items: ['profile'],
      active: 'Update My Profile',
    },
  ];
  hide = true;
  updateProgramManager:UserModel=new UserModel();
  programManagerForm: FormGroup;
  programManagerId:number;

  constructor(
    private _location: Location,
    private fb: FormBuilder,
    private router:Router,
    private programManagerService: UserServiceService,
    ) {
      this.programManagerForm = this.fb.group({
      });
      this.programManagerForm.addControl("password", new FormControl('', [Validators.required]))

  }

  ngOnInit(): void {
    const storedItems= JSON.parse(localStorage.getItem('currentUser'))
     this.programManagerId=storedItems.id;
     this.programManagerService.getUserById(this.programManagerId).subscribe(data=>{
      this.updateProgramManager=data;
        
      })


  }

  UpdateProgramManager(){
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
        this.programManagerService.updateSystemUser(this.updateProgramManager).subscribe(res =>{
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
   
        this.updateProgramManager.userImg= e.target.result as string;
        console.log(this.updateProgramManager.userImg);
        

      
      }
      reader.readAsDataURL(file)
    }
  }

}
