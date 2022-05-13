import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SchoolModel } from '../../models/school-model';
import { UserModel } from '../../models/user-model';
import { SchoolServiceService } from '../../services/school-service.service';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-school-staff-selector',
  templateUrl: './school-staff-selector.component.html',
  styleUrls: ['./school-staff-selector.component.sass']
})
export class SchoolStaffSelectorComponent implements OnInit {
  
  stdForm: FormGroup;

  
  Schools: SchoolModel[]=[];
  selectedSchool: UserModel = new UserModel();


  @Output()
  onSchoolSelected : EventEmitter<SchoolModel> = new EventEmitter<SchoolModel>();

  constructor(
    private fb : FormBuilder,
    private schoolServiceService: SchoolServiceService
     ) {
    this.stdForm = this.fb.group({});
   }

  name =new FormControl('', [Validators.required,Validators.required]);
  ngOnInit(): void {
    this.dropListSchools();
  }
 dropListSchools(){
   this.schoolServiceService.getSchools().subscribe(data =>{
    this.Schools = data;
   })
 }

 selectSchool(){
   
   this.onSchoolSelected.emit(this.selectedSchool);

 }


}
