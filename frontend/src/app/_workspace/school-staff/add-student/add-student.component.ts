import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { StudentModel } from '../../models/student-model';
import { StudentServiceService } from '../../services/student-service.service';
import {schoolStaffURL} from '../../models/global-constant'
import { SchoolClassModel } from '../../models/school-class-model';
import { SchoolClassServiceService } from '../../services/school-class-service.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.sass']
})
export class AddStudentComponent implements OnInit {
  id:number;
  studentModel:StudentModel=new StudentModel();
  stdForm: FormGroup;
  classRooms:SchoolClassModel[];
  schoolName: String;
  selectedClassRoomId:number;

  breadscrums = [
    {
      title: 'Add student',
      items: ['Student'],
      active: 'Add student',
    },
  ];

  constructor(private fb: FormBuilder,
    private route:ActivatedRoute,
    private router:Router,
    private studetnService:StudentServiceService,
    private shoolClassService:SchoolClassServiceService
    ) {
    this.stdForm = this.fb.group({});
    this.stdForm.addControl("Fname",new FormControl(''))
    this.stdForm.addControl("Lname",new FormControl(''))
    this.stdForm.addControl("socialId",new FormControl('', [Validators.required, Validators.minLength(9),Validators.maxLength(9)]))
    this.stdForm.addControl("classId",new FormControl('',[Validators.required]))
  }


  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.schoolName=this.route.snapshot.params['schoolName'];
    this.getAllclass();
  }
  

  private getAllclass(){
    this.shoolClassService.getClasses().subscribe(data => {
      this.classRooms=data;
      
    })
  }
 
  addStudent(){
    this.studetnService.addStudent(this.studentModel,this.selectedClassRoomId).subscribe(
      res=>{
        if(res){
        
          
          Swal.fire({
            icon: 'success',
            title: 'Added',
            text: 'Student was added Successfully...!!! ',

        }

        
        );
        this.router.navigate([schoolStaffURL+"/all",this.id,this.schoolName])

        }
        
        if(!res){
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
    this.router.navigate([schoolStaffURL+"/all",this.id,this.schoolName])
  }
}
