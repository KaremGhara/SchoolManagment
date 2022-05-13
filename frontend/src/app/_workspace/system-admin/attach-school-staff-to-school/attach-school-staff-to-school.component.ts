import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SchoolModel } from '../../models/school-model';
import { UserModel } from '../../models/user-model';
import { SchoolServiceService } from '../../services/school-service.service';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-attach-school-staff-to-school',
  templateUrl: './attach-school-staff-to-school.component.html',
  styleUrls: ['./attach-school-staff-to-school.component.sass']
})
export class AttachSchoolStaffToSchoolComponent implements OnInit {
  breadscrums = [
    {
      title: 'Add user',
      items: ['User'],
      active: 'Add user',
    },
  ];
  ngOnInit(): void {
    }
    isTblLoading = true;
  
  constructor( 
    public userServiceService: UserServiceService,
    public dialog: MatDialog,
    private schoolServiceService:SchoolServiceService
    ){}
  

  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  schoolStaff:UserModel[] ;
  selectedSchoolStaffId:UserModel= new UserModel;
  schoolStaffLinked: UserModel[];
  
  school:SchoolModel =new SchoolModel;
  


    public findAllSchoolStaffNotLink(){
      this.userServiceService.getuserSchoolStaffNotLink().subscribe(data => {    
        this.schoolStaff=data
      })
    }


    public findUserSchoolStaffBySchool(){
      this.userServiceService.getTecharsBySchool(this.school.id).subscribe(data => {    
        this.schoolStaffLinked=data
      })
    }

      
    selectSchoolStaff(id:number){
   
      this.userServiceService.getUserById(id).subscribe(data => {
        this.selectedSchoolStaffId=data;  
    })
    }

    attachSchoolStaffToSchool(){
      this.userServiceService.attachSchoolStaffToSchool(this.selectedSchoolStaffId,this.school.id).subscribe(data => {
        this.selectedSchoolStaffId=data;
        this.findAllSchoolStaffNotLink();
        this.findUserSchoolStaffBySchool();
    })
    }


    public schoolWasSelected(School : SchoolModel)
    {
      this.school=School;
     this.findAllSchoolStaffNotLink();
     this.findUserSchoolStaffBySchool();
    
    }
  
}
