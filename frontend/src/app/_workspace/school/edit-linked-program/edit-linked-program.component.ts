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
    private programService:ProgramServiceService,
     private schoolService: SchoolServiceService) {
    this.progForm = this.fb.group({
    });
  }
  
  startDate= new FormControl('', [Validators.required]);
  endDate= new FormControl('', [Validators.required]);
  Time= new FormControl('', [Validators.required]);
  ngOnInit(): void {
    this.schoolId=this.route.snapshot.params['id'];
   this.progId=this.route.snapshot.params['id2'];

   this.schoolService.getLinkById(this.schoolId,this.progId).subscribe(data => {
    this.programToSchool=data;
    console.log(this.programToSchool)
})
    
    
    
  }
//   validateDates(){
//     this.isValidDate = true;
//     if((this.startDate == null || this.endDate==null)){
//       this.error={isError:true,errorMessage:'Start date and end date are required.'};
//       this.isValidDate = false;
//     }

//     if((sDate != null && eDate !=null) && (eDate) < (sDate)){
//       this.error={isError:true,errorMessage:'End date should be grater then start date.'};
//       this.isValidDate = false;
//     }
//     return this.isValidDate;
//   }
//  }
  
//   if($scope.empModel.from > $scope.empModel.to){
//     $scope.errMessage="Date is out of range!"
//     return;
//   }

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


checkDates(){
  //need to check
  if ((this.startDate!=null)&&(this.endDate!=null)&& (this.startDate>this.endDate)){
  
   alert ("Not possible to be the start date bigger than the end date");
  }
 }
  getstartdateErrorMessage(){
 
    if (this.startDate.hasError('required')) {
      return 'You must enter a value';
    }
    if(this.startDate.hasError('pattern')){
      return 'Name is invalid'
    }
  }
  getenddateErrorMessage(){
    if (this.startDate.hasError('required')) {
      return 'You must enter a value';
    }
  
    if(this.startDate.hasError('pattern')){
      return 'Name is invalid'
    }
  }

  backToList(){
    
    
    this._location.back();
  }

}
