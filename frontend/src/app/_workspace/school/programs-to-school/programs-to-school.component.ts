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
    schools:SchoolModel[];
    isTblLoading = true;
    public programFiles: any=File;
    import=false;

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
  school:SchoolModel =new SchoolModel;
  programs_ids:number[] = [];
  programsNotLinked: ProgramModel[];
selectedProgId:ProgramModel= new ProgramModel;
  ngOnInit(): void {
    
    }
    public findBySchool(id:number){
      this.programService.getProgramBySchoolId(id).subscribe(data => {    
        this.programs=data
      })
    }
    public findNotLinked(id:number){
      this.programService.findNotLinkedPrograms(id).subscribe(data => {    
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
      // alert(school.name);
     this.findBySchool(school.id);
     this.findNotLinked(school.id);
     this.school=school
    }
  
    
    attachProgToSchool(){
      this.router.navigate(['/workspace/school/link/', this.selectedProgId.id,this.school.id])
    }
   







}
