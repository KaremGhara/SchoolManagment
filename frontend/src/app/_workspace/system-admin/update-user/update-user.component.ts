
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { iif } from 'rxjs';
import { AlertsComponent } from 'src/app/ui/alerts/alerts.component';
import Swal from 'sweetalert2';
import {UserModel} from '../../models/user-model'
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.sass']
})
export class UpdateUserComponent implements OnInit {
  id:number;
  userModel:UserModel=new UserModel();
  stdForm: FormGroup;
  breadscrums = [
    {
      title: 'update user',
      items: ['User'],
      active: 'update user',
    },
  ];
  userervice: any;

  constructor(private fb: FormBuilder,private route:ActivatedRoute,private router:Router,private userservice:UserServiceService) {
    this.stdForm = this.fb.group({
    });
  }
 

  
  fname = new FormControl('', [Validators.required, Validators.pattern("[A-Z][a-zA-Z ]+")]);
  lname = new FormControl('', [Validators.required, Validators.pattern("[A-Z][a-zA-Z ]+")]);
  socialId= new FormControl('', [Validators.required, Validators.minLength(9),Validators.maxLength(9)]);
  email=new FormControl('', [Validators.required, Validators.email]);
  phone=new FormControl('', [Validators.required, Validators.minLength(10),Validators.maxLength(10)]);
  password=new FormControl('', [Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(6),Validators.maxLength(9)]);
  role=new FormControl('', [Validators.required,Validators.required]);//drop list
  status=new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];

  
    this.userservice.getUserById(this.id).subscribe((data)=>{
     
      this.userModel=data;
   
    })
  }

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
   
        this.userModel.userImg= e.target.result as string;
        console.log(this.userModel.userImg);
        

      
      }
      reader.readAsDataURL(file)
    }
  }
  getFnameErrorMessage(){
    if (this.fname.hasError('required')) {
      return 'You must enter a value';
    }

  }
  getLnameErrorMessage(){
    if (this.lname.hasError('required')) {
      return 'You must enter a value';
    }
 

  }


  getSocialIdErrorMessage(){
    if (this.socialId.hasError('required')) {
      return 'You must enter a value';
    }
    if(this.socialId.hasError('maxLength')){
      return 'Social id must be 9 digits long';
    }
    if(this.socialId.hasError('minLength')){
      return 'Social id must be 9 digits long';
    }

  }
  getEmailErrorMessage(){
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    if(this.email.hasError('email')){
      return 'You should have valid email';

    }
  }
  getPhoneErrorMessage(){
    if (this.phone.hasError('required')) {
      return 'You must enter a value';
    }
    if(this.phone.hasError('maxLength')){
      return 'Social id must be 10 digits long';
    }
    if(this.phone.hasError('minLength')){
      return 'Social id must be 10 digits long';
    }
  }

  getRoleErrorMessage() {
    if (this.role.hasError('required')) {
      return 'You must enter a value';
    }
    if(this.role.hasError('pattern')){
      return 'First Name is invalid'
    }
    if(this.role.hasError('maxLength')){
      return 'Social id must be 10 digits long';
    }
    if(this.role.hasError('minLength')){
      return 'Social id must be 6 digits long';
    }
  }


  updateUser(){
    this.userservice.updateSystemUser(this.userModel).subscribe(
      res=>{
        if(res){
          if(this.userModel.role=='Admin')
          {
            this.router.navigate(["/workspace/system-admin/adminDerails"])
          }
          else{
            this.router.navigate(["/workspace/system-admin/all"])
          }
          
        }
        else{
          alert(" User Can not be updated ")
        }
      }
    )
  }
  backToList(){
    if(this.userModel.role=='Admin'){
      this.router.navigate(["/workspace/system-admin/adminDerails"])
    }
    else{
      this.router.navigate(["/workspace/system-admin/all"])

    }
  }

}

