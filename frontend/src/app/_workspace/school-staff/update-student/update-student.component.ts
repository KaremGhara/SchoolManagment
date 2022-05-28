import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StudentModel } from '../../models/student-model';
import { StudentServiceService } from '../../services/student-service.service';
import { SchoolClassModel } from '../../models/school-class-model';
import { SchoolClassServiceService } from '../../services/school-class-service.service';
import { SchoolServiceService } from '../../services/school-service.service';
import { SchoolModel } from '../../models/school-model';
import Swal from 'sweetalert2';
import {Location} from '@angular/common';


@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.sass']
})

export class UpdateStudentComponent implements OnInit {
  stdid:number;
  userId:number;
  studentModel:StudentModel=new StudentModel();
  stdForm: FormGroup;
  classRooms:SchoolClassModel[];
  school:SchoolModel=new SchoolModel();

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
    private schoolService:SchoolServiceService
    ) {
    this.stdForm = this.fb.group({});
    this.stdForm.addControl("Fname",new FormControl(''))
    this.stdForm.addControl("Lname",new FormControl(''))
    this.stdForm.addControl("socialId",new FormControl('', [Validators.required, Validators.minLength(9),Validators.maxLength(9)]))
    this.stdForm.addControl("classroom",new FormControl(''))
  }


  ngOnInit(): void {
    this.stdid=this.route.snapshot.params['idrow'];
    const storedItems= JSON.parse(localStorage.getItem('currentUser'))
    this.userId=storedItems.id;
    this.schoolService.getSchoolByUserId(this.userId).subscribe(res=>{
    this.school=res;
    this.shoolClassService.getClassesBySchoolId(this.school.id).subscribe(data => {
      this.classRooms=data;
      this.studetnService.getStudentById(this.stdid).subscribe((data)=>{
        this.studentModel=data;
        this.studentModel.classroom=this.classRooms[this.studentModel.classroom.id];
      },(e)=>{
        alert(e);  
      })      
    })
    })  
  }

  updateUser(){
    this.studetnService.updateStudent(this.studentModel).subscribe(
      res=>{
        if(res){
          Swal.fire({
            icon: 'success',
            title: 'Updated',
            text: 'Student was updated Successfully...!!! ',
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
