import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SchoolClassModel } from '../../models/school-class-model';
import { StudentModel } from '../../models/student-model';
import { SchoolClassServiceService } from '../../services/school-class-service.service';
import { StudentServiceService } from '../../services/student-service.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-update-student-in-muncipality',
  templateUrl: './update-student-in-muncipality.component.html',
  styleUrls: ['./update-student-in-muncipality.component.sass']
})
export class UpdateStudentInMuncipalityComponent implements OnInit {
  stdid:number;
  schoolId:number;
  studentModel:StudentModel=new StudentModel();
  stdForm: FormGroup;
  classRooms:SchoolClassModel[];

  breadscrums = [
    {
      title: 'Update student',
      items: ['Student'],
      active: 'Update student',
    },
  ];

  constructor(
    private _location: Location,
    private fb: FormBuilder,
    private route:ActivatedRoute,
    private studetnService:StudentServiceService,
    private shoolClassService:SchoolClassServiceService,
    ) {
    this.stdForm = this.fb.group({});
    this.stdForm.addControl("Fname",new FormControl(''))
    this.stdForm.addControl("Lname",new FormControl(''))
    this.stdForm.addControl("socialId",new FormControl('', [Validators.required, Validators.minLength(9),Validators.maxLength(9)]))
    this.stdForm.addControl("classroom",new FormControl(''))
  }

  ngOnInit(): void {
    this.stdid=this.route.snapshot.params['idrow'];
    this.schoolId=this.route.snapshot.params['schoolId'];
    this.shoolClassService.getClassesBySchoolId(this.schoolId).subscribe(data => {
      this.classRooms=data;
      this.studetnService.getStudentById(this.stdid).subscribe(data=>{
        this.studentModel=data;
        this.studentModel.classroom=this.classRooms[this.studentModel.classroom.id];
      })      
    })      
  }


  updateStudent(){
    this.studetnService.updateStudent(this.studentModel).subscribe(
      res=>{
        if(res){
          Swal.fire({
            icon: 'success',
            title: 'Updated',
            text: 'Student was updated Successfully...!!! ',
        }        
        );
        this._location.back();        }
        else{
          alert(" incorrect!")
        }
      }
    )
  }


  backToList(){
    this._location.back();  }
}
