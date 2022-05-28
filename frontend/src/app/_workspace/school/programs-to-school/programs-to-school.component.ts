import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SchoolModel } from '../../models/school-model';
import { SchoolServiceService } from '../../services/school-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProgramModel } from '../../models/program-model'
import { ProgramToSchool } from '../../models/ProgramToSchool';
import { ProgramServiceService } from '../../services/program-service.service';
// import { DragulaService } from 'ng2-dragula';
// import { Subscription } from 'rxjs';
import { id } from '@swimlane/ngx-datatable';




@Component({
  selector: 'app-programs-to-school',
  templateUrl: './programs-to-school.component.html',
  styleUrls: ['./programs-to-school.component.sass']
})

export class ProgramsToSchoolComponent  implements OnInit {
  // BAG = 'DRAGULA_EVENTS';
  // subs = new Subscription();

 selectedId:any;
    breadscrums = [
        {
          title: 'Link program to school',
          items: ['school'],
          active: 'Link program to school',
        },
      ];
    public schools:SchoolModel[];
    isTblLoading = true;
    public programFiles: any=File;
    import=false;
    userId:number;

  dataSource:MatTableDataSource<SchoolModel>;
  selection = new SelectionModel<SchoolModel>(true, []);
  // subs:any;
  linkForm: FormGroup;
  progid:number
  
  constructor( public schoolService: SchoolServiceService,
    private router:Router,
    public dialog: MatDialog, private programService:ProgramServiceService){}
  

  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  program2school:ProgramToSchool = new ProgramToSchool;
  programs:ProgramModel[] ;
  public schoolData:SchoolModel =new SchoolModel;
  schoolU:SchoolModel =new SchoolModel;
  programs_ids:number[] = [];
  programsNotLinked: ProgramModel[];
selectedProgId:ProgramModel= new ProgramModel;
  ngOnInit(): void {
    const storedItems= JSON.parse(localStorage.getItem('currentUser'))
    this.userId=storedItems.id;

    this.schoolService.getSchools().subscribe(data=>{
      this.schools=data;
    })
    this.schoolService.getSchoolByUserId(this.userId).subscribe(res => {
      this.schoolU=res;
      this.findBySchool();
      this.findNotLinked();
    })
    }

    public findBySchool(){
      this.programService.getProgramBySchoolId(this.schoolData.id).subscribe(data => {    
        this.programs=data
      })
    }
    public findNotLinked(){
      this.programService.findNotLinkedPrograms(this.schoolU.id).subscribe(data => {    
        this.programsNotLinked=data
      })
    }

      
    selectProg(id:number){
   
      this.selectedProgId.id=id;
      this.programService.getProgramById(id).subscribe(data => {
        this.selectedProgId=data;
    })
      
   
    }
      applyFilter($event:any){
        this.dataSource.filter=$event.target.value;
      }

      onSelectFile(event){
        const file:File =event.target.files[0];
        
          this.programFiles=file;
          this.import=true;
       
      }


    public schoolWasSelected(school : SchoolModel)
    {
     this.programService.findNotLinkedPrograms(school.id).subscribe(data=>{
      this.programsNotLinked=data
      this.schoolData=school
     })
     this.programService.getProgramBySchoolId(school.id).subscribe(data=>{
       this.programs=data
     })
     this.schoolData=school
    }
  
    
    attachProgToSchool(){
      alert(this.selectedProgId.id)
      alert(this.schoolU)
      console.log(this.schoolData);
      
      
      this.router.navigate(['/workspace/school/link/', this.selectedProgId.id,this.schoolData.id])
    }
   







}
