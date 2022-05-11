import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SchoolModel } from '../../models/school-model';
import { SchoolServiceService } from '../../services/school-service.service';

@Component({
  selector: 'app-school-selector',
  templateUrl: './school-selector.component.html',
  styleUrls: ['./school-selector.component.sass']
})
export class SchoolSelectorComponent implements OnInit {

  stdForm: FormGroup;

  
  schools: SchoolModel[]=[];
  selectedSchool: SchoolModel = new SchoolModel();


  @Output()
  onSchoolSelected : EventEmitter<SchoolModel> = new EventEmitter<SchoolModel>();

  constructor(private fb : FormBuilder,private route: ActivatedRoute, private router:Router,private schoolService: SchoolServiceService) {
    this.stdForm = this.fb.group({});
   }

  name =new FormControl('', [Validators.required,Validators.required]);
  ngOnInit(): void {
    this.dropListSchools();
  }
 dropListSchools(){
   this.schoolService.getSchools().subscribe(data =>{
    this.schools = data;
   })
 }

 selectSchool(){
   
   this.onSchoolSelected.emit(this.selectedSchool);

 }
 




}
