import { FormsModule }   from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router,Route } from '@angular/router';
import { SchoolModel } from '../../models/school-model';
import { SchoolServiceService } from '../../services/school-service.service';
import { ProgramServiceService } from '../../services/program-service.service';
import { UserServiceService } from '../../services/user-service.service';
import{ProgramToSchool}from '../../models/ProgramToSchool';
import {Location} from '@angular/common';
import Swal from 'sweetalert2';
import { ProgramModel } from '../../models/program-model';

@Component({
  selector: 'app-edit-linked-program',
  templateUrl: './edit-linked-program.component.html',
  styleUrls: ['./edit-linked-program.component.sass']
})
export class EditLinkedProgramComponent implements OnInit {
    schoolModel:SchoolModel=new SchoolModel();
  // programToSchoolModel:ProgramtoSchoolModel= new ProgramtoSchoolModel();
  programToSchool: ProgramToSchool=new ProgramToSchool;
  programModel:ProgramModel=new ProgramModel();
  progForm: FormGroup;
  ngForm: FormGroup;
  isValidDate:boolean;
  schoolId:number;
  progId:number;

  breadscrums = [
    {
      title: 'Edit linked program',
      items: ['school'],
      active: 'Edit Linked Program',
    },
  ];
  
  constructor(private _location: Location,
    private fb: FormBuilder,
    private route:ActivatedRoute,
    private router:Router,
     private schoolService: SchoolServiceService,
     private programService: ProgramServiceService) {
    this.progForm = this.fb.group({});
    this.progForm.addControl("startDate",new FormControl('', [Validators.required]))
    this.progForm.addControl("endDate",new FormControl('', [Validators.required]))
    this.progForm.addControl("Time",new FormControl('', [Validators.required]))
  }
  
  ngOnInit(): void {
    this.schoolId=this.route.snapshot.params['id'];
    this.progId=this.route.snapshot.params['id2'];

   this.programService.getLinkById(this.progId,this.schoolId).subscribe(data => {
     console.log(data.timeDescription);
     
     console.log(data);
     this.programToSchool=data
     console.log(this.programToSchool);
     
})
    
    
    
  }

submit(){
  this.schoolService.editlink(this.programToSchool).subscribe(
    res=>{
      if(res){
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
