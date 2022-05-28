import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentModel } from '../../models/student-model';
import { StudentServiceService } from '../../services/student-service.service';
import { SchoolClassModel } from '../../models/school-class-model';
import { SchoolClassServiceService } from '../../services/school-class-service.service'
import Swal from 'sweetalert2';
import { SchoolServiceService } from '../../services/school-service.service';
import { SchoolModel } from '../../models/school-model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.sass']
})
export class AddStudentComponent implements OnInit {
  studentModel:StudentModel=new StudentModel();
  stdForm: FormGroup;
  classRooms:SchoolClassModel[];
  selectedClassRoomId:number;
  idActor:number;
  school:SchoolModel=new SchoolModel();
  schoolId: number;
  breadscrums = [
    {
      title: 'Add student',
      items: ['Student'],
      active: 'Add student',
    },
  ];

  constructor(
    private _location: Location,
    private fb: FormBuilder,
    private studetnService:StudentServiceService,
    private shoolClassService:SchoolClassServiceService,
    private schoolService:SchoolServiceService
    ) {
    this.stdForm = this.fb.group({});
    this.stdForm.addControl("Fname",new FormControl(''))
    this.stdForm.addControl("Lname",new FormControl(''))
    this.stdForm.addControl("socialId",new FormControl('', [Validators.required, Validators.minLength(9),Validators.maxLength(9)]))
    this.stdForm.addControl("classId",new FormControl('',[Validators.required]))
  }


  ngOnInit(): void {
    const storedItems= JSON.parse(localStorage.getItem('currentUser'))
    this.idActor=storedItems.id;
    this.schoolService.getSchoolByUserId(this.idActor).subscribe(data=>{
      this.school=data;
      this.schoolId=this.school.id;
      this.getAllclass();
    })
    
  }
  

  private getAllclass(){
    this.shoolClassService.getClassesBySchoolId(this.schoolId).subscribe(data => {
      this.classRooms=data;     
    })
  }
 
  addStudent(){
    this.studetnService.addStudent(this.studentModel,this.selectedClassRoomId,this.schoolId).subscribe(
      res=>{
        if(res){                 
          Swal.fire({
            icon: 'success',
            title: 'Added',
            text: 'Student was added Successfully...!!! ',
        }        
        );
        this._location.back();
        }       
        else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Student already exists',
        });
        }
      }
    )
  }
  
  backToList(){
    this._location.back();
  }
}
