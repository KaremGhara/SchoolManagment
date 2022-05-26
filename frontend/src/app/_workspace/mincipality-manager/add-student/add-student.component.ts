import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { muncipalityManager } from '../../models/global-constant';
import { SchoolClassModel } from '../../models/school-class-model';
import { StudentModel } from '../../models/student-model';
import { SchoolClassServiceService } from '../../services/school-class-service.service';
import { StudentServiceService } from '../../services/student-service.service';

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
  schoolId: number;
  breadscrums = [
    {
      title: 'Add student',
      items: ['Student'],
      active: 'Add student',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private route:ActivatedRoute,
    private router:Router,
    private studetnService:StudentServiceService,
    private shoolClassService:SchoolClassServiceService,
    ) {
    this.stdForm = this.fb.group({});
    this.stdForm.addControl("Fname",new FormControl(''))
    this.stdForm.addControl("Lname",new FormControl(''))
    this.stdForm.addControl("socialId",new FormControl('', [Validators.required, Validators.minLength(9),Validators.maxLength(9)]))
    this.stdForm.addControl("classId",new FormControl('',[Validators.required]))
  }


  ngOnInit(): void {
    this.schoolId=this.route.snapshot.params['schoolId'];
    this.getAllclassBySchoolId();
  }
  

  private getAllclassBySchoolId(){
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
        this.router.navigate([muncipalityManager+'/allStudentsToMuncipality',this.schoolId])
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
    this.router.navigate([muncipalityManager+"/allStudentsToMuncipality",this.schoolId])
  }

}
