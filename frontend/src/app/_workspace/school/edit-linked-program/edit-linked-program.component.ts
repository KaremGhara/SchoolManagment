import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProgramServiceService } from '../../services/program-service.service';
import{ProgramToSchool}from '../../models/ProgramToSchool';
import {Location} from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-linked-program',
  templateUrl: './edit-linked-program.component.html',
  styleUrls: ['./edit-linked-program.component.sass']
})
export class EditLinkedProgramComponent implements OnInit {


  breadscrums = [
    {
      title: 'Edit linked program',
      items: ['school'],
      active: 'Edit Linked Program',
    },
  ];

  programToSchool: ProgramToSchool=new ProgramToSchool;
  progForm: FormGroup;
  schoolId:number;
  progId:number;
  
  constructor(
    private _location: Location,
    private fb: FormBuilder,
    private route:ActivatedRoute,
     private programService: ProgramServiceService
     ) {
    this.progForm = this.fb.group({});
    this.progForm.addControl("startDate",new FormControl('', [Validators.required]))
    this.progForm.addControl("endDate",new FormControl('', [Validators.required]))
    this.progForm.addControl("Time",new FormControl('', [Validators.required]))
  }
  
  ngOnInit(): void {
    this.schoolId=this.route.snapshot.params['schoolId'];
    this.progId=this.route.snapshot.params['programId'];
   this.programService.getLinkById(this.progId,this.schoolId).subscribe(data => {
     this.programToSchool=data
     
})
  }

submit(){
  this.programService.updateProgramLink(this.programToSchool).subscribe(
    res=>{
      if(res){
        Swal.fire({
          icon: 'success',
          title: 'Updated',
          text: 'Link Program was updated Successfully...!!! ',
      }        
      );
        this._location.back();
      }
      else{                 
        alert(" incorrect!")      
      }
    }
  )
}

  backToList(){
    this._location.back();
  }

}
