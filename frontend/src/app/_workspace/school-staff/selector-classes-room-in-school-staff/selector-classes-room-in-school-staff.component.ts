import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SchoolClassModel } from '../../models/school-class-model';
import { SchoolModel } from '../../models/school-model';
import { SchoolClassServiceService } from '../../services/school-class-service.service';
import { SchoolServiceService } from '../../services/school-service.service';

@Component({
  selector: 'app-selector-classes-room-in-school-staff',
  templateUrl: './selector-classes-room-in-school-staff.component.html',
  styleUrls: ['./selector-classes-room-in-school-staff.component.sass']
})
export class SelectorClassesRoomInSchoolStaffComponent implements OnInit {

  stdForm: FormGroup;
  school:SchoolModel=new SchoolModel();
  userId:number;
  classesRooms: SchoolClassModel[]=[];
  selectedClassRoom: SchoolClassModel = new SchoolClassModel();


  @Output()
  onSclassRoomSelected : EventEmitter<SchoolClassModel> = new EventEmitter<SchoolClassModel>();

  constructor(
    private fb : FormBuilder,
     private schoolClassServiceService: SchoolClassServiceService,
     private schoolService:SchoolServiceService,

     ) {
    this.stdForm = this.fb.group({});
   }

  name =new FormControl('', [Validators.required,Validators.required]);
  ngOnInit(): void {
    const storedItems= JSON.parse(localStorage.getItem('currentUser'))
  this.userId=storedItems.id;
  this.schoolService.getSchoolByUserId(this.userId).subscribe(res=>{
this.school=res;
this.schoolClassServiceService.getClassesBySchoolId(this.school.id).subscribe(data =>{
  this.classesRooms = data;
 })
  })
  }

 selectClassRoom(){  
   this.onSclassRoomSelected.emit(this.selectedClassRoom);
 }
 

}
