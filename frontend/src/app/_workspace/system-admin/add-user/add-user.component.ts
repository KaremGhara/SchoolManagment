import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormModule } from 'src/app/forms/forms.module';
import { ListFormat } from 'typescript';
import {UserModel} from '../../models/user-model'
import { UserServiceService } from '../../services/user-service.service';
import { UserRole } from '../../common-utils/classes/user-role';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.sass']
})
export class AddUserComponent implements OnInit {
  [x: string]: any;
  userModel:UserModel=new UserModel();
  id:number;
  userForm: FormGroup;
  breadscrums = [
    {
      title: 'Add user',
      items: ['User'],
      active: 'Add user',
    },
  ];

  constructor(private fb: FormBuilder,private route:ActivatedRoute,private router:Router,private userservice:UserServiceService) {
    this.userForm = this.fb.group( {})
    this.userForm.addControl("fname",new FormControl(''))
    this.userForm.addControl("lname",new FormControl(''))
    this.userForm.addControl("socialId",new FormControl('', [Validators.required, Validators.minLength(9),Validators.maxLength(9)]))
    this.userForm.addControl("email",new FormControl('',[Validators.required, Validators.email]))
    this.userForm.addControl("phone",new FormControl('',[Validators.required, Validators.minLength(10),Validators.maxLength(10)]))
    this.userForm.addControl("password",new FormControl('',[Validators.required]))
    this.userForm.addControl("role",new FormControl('',[Validators.required]))
    this.userForm.addControl("userImage",new FormControl('',[Validators.required]))


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
        

      
      }
      reader.readAsDataURL(file)
    }
  }

  // fname = new FormControl('', [Validators.required, Validators.pattern("[A-Z][a-zA-Z ]+")]);
  // lname = new FormControl('', [Validators.required, Validators.pattern("[A-Z][a-zA-Z ]+")]);
  // socialId= new FormControl('', [Validators.required, Validators.minLength(9),Validators.maxLength(9)]);
  // email=new FormControl('', [Validators.required, Validators.email]);
  // phone=new FormControl('', [Validators.required, Validators.minLength(10),Validators.maxLength(10)]);
  // password=new FormControl('', [Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(6),Validators.maxLength(9)]);
  // role=new FormControl('', [Validators.required,Validators.required]);//drop list
  //status=new FormControl('', [Validators.required,Validators.pattern("^[0-9]*$")]);

  ngOnInit(): void {

  
  }
  addUser(){
    this.userservice.createUser(this.userModel).subscribe(
      res=>{
        if(res){
         
        
          
            Swal.fire({
              icon: 'success',
              title: 'Added',
              text: 'User was added Successfully...!!! ',
  
            })
  
          this.backToList()
        }
        else{
          console.log(alert("Incorrect data inter please "));
          
          
        }
      }
    )
  }
  private options: string[] = ["Teacher", "Manager", "parent"];
    //selectedQuantity = "10";


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

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }
    if(this.password.hasError('pattern')){
      return 'First Name is invalid'
    }
    if(this.phone.hasError('maxLength')){
      return 'Social id must be 10 digits long';
    }
    if(this.phone.hasError('minLength')){
      return 'Social id must be 6 digits long';
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

  backToList(){
    this.router.navigate(["/workspace/system-admin/all"])
  }

  
}
