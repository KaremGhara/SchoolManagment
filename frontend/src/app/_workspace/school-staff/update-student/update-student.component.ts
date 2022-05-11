import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,Route, ActivatedRoute } from '@angular/router';
import { StudentModel } from '../../models/student-model';
import { StudentServiceService } from '../../services/student-service.service';
import { schoolStaffURL } from '../../models/global-constant';
import { SchoolClassModel } from '../../models/school-class-model';
import { SchoolClassServiceService } from '../../services/school-class-service.service';
@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.sass']
})
export class UpdateStudentComponent implements OnInit {
  stdid:number;
  roomId: number;
  studentModel:StudentModel=new StudentModel();
  stdForm: FormGroup;
  classRooms:SchoolClassModel[];
  // Fname:FormControl;
  breadscrums = [
    {
      title: 'Update student',
      items: ['Student'],
      active: 'Update student',
    },
  ];

  constructor(private fb: FormBuilder,private route:ActivatedRoute,private router:Router,private studetnService:StudentServiceService,private shoolClassService:SchoolClassServiceService) {
    this.stdForm = this.fb.group({});
    this.stdForm.addControl("Fname",new FormControl(''))
    this.stdForm.addControl("Lname",new FormControl(''))
    this.stdForm.addControl("socialId",new FormControl('', [Validators.required, Validators.minLength(9),Validators.maxLength(9)]))
    this.stdForm.addControl("classroom",new FormControl(''))
  }
   idNum = 1;
  ngOnInit(): void {

    this.stdid=this.route.snapshot.params['id'];
    
      this.shoolClassService.getClasses().subscribe(data => {
        this.classRooms=data;   
      })
    
    this.studetnService.getStudentById(this.stdid).subscribe((data)=>{
      this.studentModel=data;
      this.studentModel.classroom=this.classRooms[this.studentModel.classroom.id];
      // this.studentModel.classroom=this.classRooms[this.studentModel.classroom.id];
    },(e)=>{
      alert(e);

    })
  }
  
removeDuplicateClasses(data:SchoolClassModel[]): SchoolClassModel[]{
  return [...new Set(data)]
}


  updateUser(){
    this.studetnService.updateStudent(this.studentModel).subscribe(
      res=>{
        if(res){
          this.router.navigate([schoolStaffURL+"/all"])
        }
        else{
          alert(" incorrect!")
        }
      }
    )
  }
  // private getAllclass(){
  //   this.shoolClassService.getClasses().subscribe(data => {
  //     this.classRooms=data;
      
  //   })
  // }
  backToList(){
    this.router.navigate([schoolStaffURL+"/all"])
  }
 

}
