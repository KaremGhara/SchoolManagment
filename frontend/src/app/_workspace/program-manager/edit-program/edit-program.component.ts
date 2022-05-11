import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule }   from '@angular/forms';
import {Router,Route, ActivatedRoute } from '@angular/router';
import { ProgramModel } from '../../models/program-model';
import { ProgramServiceService } from '../../services/program-service.service';
import {ProgramManagerURL} from '../../models/global-constant'
import {Location} from '@angular/common';
import Swal from 'sweetalert2';
import { UserServiceService } from '../../services/user-service.service';
import { UserModel } from '../../models/user-model';

@Component({
  selector: 'app-edit-program',
  templateUrl: './edit-program.component.html',
  styleUrls: ['./edit-program.component.sass']
})
export class EditProgramComponent implements OnInit {
  id:number;
  programModel:ProgramModel=new ProgramModel();
  progForm: FormGroup;
  ngForm: FormGroup;
  role:String = 'Manager';
  users:UserModel[];


  // Fname:FormControl;
  breadscrums = [
    {
      title: 'Edit program',
      items: ['Program'],
      active: 'Edit program',
    },
  ];
  constructor(private _location: Location,private fb: FormBuilder,private route:ActivatedRoute,private router:Router,private programService:ProgramServiceService, private usersService: UserServiceService) {
    this.progForm = this.fb.group({
    });
  }
  name = new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]+")]);
  managerId=new FormControl('', [Validators.required, Validators.minLength(9),Validators.maxLength(9)]);
  // managerName=new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]+")]);

  cost=new FormControl('', [Validators.required]);
  shortDescription = new FormControl('', [Validators.required]);
  longDescription = new FormControl('', [Validators.required]);


  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.programService.getProgramById(this.id).subscribe(data=>{
        this.programModel = data;
    },(e)=>{
      alert(e);

    })
    this.usersService.getUserByRole(this.role).subscribe(data => {
      this.users=data;
  })
  }
  getNameErrorMessage(){
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }
    if(this.name.hasError('pattern')){
      return 'Name is invalid'
    }

  }
//   getManagerNameErrorMessage(){
//   if (this.managerName.hasError('required')) {
//     return 'You must enter a value';
//   }
//   if(this.managerName.hasError('pattern')){
//     return 'Manager name is invalid'
//   }
// }
  // getManagerIdErrorMessage(){
  //   if (this.managerId.hasError('required')) {
  //     return 'You must enter a value';
  //   }
  //   if(this.managerId.hasError('maxLength')){
  //     return 'Manager id must be 9 digits long';
  //   }
  //   if(this.managerId.hasError('minLength')){
  //     return 'Manager id must be 9 digits long';
  //   }

  // }
  getCostErrorMessage(){
    if (this.cost.hasError('required')) {
      return 'You must enter a value';
    }
    // if(this.cost.hasError('negative')){
    //   return 'Cost must be a positive number';
    // } 
  }
  getDescriptionErrorMessage(){
    if (this.shortDescription.hasError('required')) {
      return 'You must enter a value';
    }
  }
  EditProgram(){
    this.programService.editProgram(this.programModel).subscribe(
      res=>{
        if(res){
          console.log('success');
          this._location.back();
          // this.router.navigate(['/workspace/program-manager/all'])
        }
        else{
                   
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Program name already exists',
              
            });
          
        }
      }
    )
  }
  
  backToList(){
    
    this._location.back();
   
  }
}
