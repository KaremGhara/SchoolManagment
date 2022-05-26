import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Router, ActivatedRoute } from '@angular/router';
import { ProgramModel } from '../../models/program-model';
import { ProgramServiceService } from '../../services/program-service.service';
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
  role:String = 'Manager';
  users:UserModel[];

  breadscrums = [
    {
      title: 'Edit program',
      items: ['Program'],
      active: 'Edit program',
    },
  ];
  constructor(
    private _location: Location,
    private fb: FormBuilder,
    private route:ActivatedRoute,
    private programService:ProgramServiceService,
     private usersService: UserServiceService
     ) {
    this.progForm = this.fb.group({
    });
  }
  name = new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]+")]);
  managerId=new FormControl('', [Validators.required, Validators.minLength(9),Validators.maxLength(9)]);
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

  getCostErrorMessage(){
    if (this.cost.hasError('required')) {
      return 'You must enter a value';
    }
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
          Swal.fire({
            icon: 'success',
            title: 'Updated',
            text: 'Program was updated Successfully...!!! ',
        }       
        );
          this._location.back();
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
