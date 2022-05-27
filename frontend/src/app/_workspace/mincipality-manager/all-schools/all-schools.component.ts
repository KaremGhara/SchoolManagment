import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SchoolModel } from '../../models/school-model';
import { SchoolServiceService } from '../../services/school-service.service';
import { Router } from '@angular/router';
import { ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {muncipalityManager} from '../../models/global-constant'





@Component({
  selector: 'app-all-schools',
  templateUrl: './all-schools.component.html',
  styleUrls: ['./all-schools.component.sass']
})
export class AllSchoolsComponent implements OnInit {
  id: number;
  schools: SchoolModel;
  isTblLoading = true;
  Schools:SchoolModel[]=[];
  displayedColumns=['name','address','managementStudents','managementPrograms']
  dataSource:MatTableDataSource<SchoolModel>;
  breadscrums = [
    {
      title: 'All schools',
      items: ['schools'],
      active: 'All schools',
    },
  ];

  constructor(
    public dialog: MatDialog,
    public schoolService: SchoolServiceService,
    private router:Router,
  ) { }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  
  ngOnInit(): void { 
    this.dataSource= new MatTableDataSource();
    this.getAllSchools();
  }

  refresh() {
    this.getAllSchools();
  }

  manageStudents(id:number){
    this.router.navigate([muncipalityManager+'/allStudentsToMuncipality',id])
  }

  managePrograms(id:number){
    this.router.navigate([muncipalityManager+'/showProgramsInSchool',id])
  }
 
 
  private getAllSchools(){
    this.schoolService.getSchools().subscribe(data => {
      this.isTblLoading = false;
      this.dataSource.data = data;
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    })
  }
  
  applyFilter($event:any){
    this.dataSource.filter=$event.target.value;
  }


}
