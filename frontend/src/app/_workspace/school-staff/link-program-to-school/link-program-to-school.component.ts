import { S } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProgramModel } from '../../models/program-model';
import { ProgramToSchool } from '../../models/ProgramToSchool';
import { SchoolModel } from '../../models/school-model';
import { ProgramServiceService } from '../../services/program-service.service';
import { SchoolServiceService } from '../../services/school-service.service';

@Component({
  selector: 'app-link-program-to-school',
  templateUrl: './link-program-to-school.component.html',
  styleUrls: ['./link-program-to-school.component.sass']
})
export class LinkProgramToSchoolComponent implements OnInit {
  breadscrums = [
    {
      title: 'Attach student',
      items: ['Student'],
      active: 'Attach student',
    },
  ];
  public school:SchoolModel
  public programs:ProgramModel[]
  public LinkedPrograms:ProgramModel[]
  public selectedProgId:ProgramModel=new ProgramModel();
  constructor(private schoolService: SchoolServiceService,private programService:ProgramServiceService,private router:Router) { }

  ngOnInit(): void {
    const storedItems= JSON.parse(localStorage.getItem('currentUser'))
    console.log(storedItems);
    this.schoolService.getSchoolByUserId(storedItems.id).subscribe(data => {
      this.school=data;
      this.programService.findNotLinkedPrograms(this.school.id).subscribe(programsData=>{
        console.log(programsData);
        
        this.programs=programsData;
        
      })
      this.programService.getProgramBySchoolId(this.school.id).subscribe(data=>{
        this.LinkedPrograms=data;
        console.log(this.LinkedPrograms);
        
      }) 
      
    })

    
    
  }
  attachProgToSchool(){
    this.router.navigate(['/workspace/school/link/', this.selectedProgId.id,this.school.id])
  }
  selectProg(progId:number){
    this.selectedProgId.id=progId
    this.programService.getProgramById(progId).subscribe(data=>{
      this.selectedProgId=data;
    })

  }

}
