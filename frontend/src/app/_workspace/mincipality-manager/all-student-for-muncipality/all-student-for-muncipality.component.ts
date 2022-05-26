import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { muncipalityManager } from '../../models/global-constant';
import { SchoolModel } from '../../models/school-model';
import { StudentModel } from '../../models/student-model';
import { ImportFileComponent } from '../../school-staff/all-students/dialogs/import-file/import-file.component';
import { SchoolServiceService } from '../../services/school-service.service';
import { StudentServiceService } from '../../services/student-service.service';

@Component({
  selector: 'app-all-student-for-muncipality',
  templateUrl: './all-student-for-muncipality.component.html',
  styleUrls: ['./all-student-for-muncipality.component.sass']
})
export class AllStudentForMuncipalityComponent implements OnInit {
  schoolId: number;
  schoolName: String;
  school:SchoolModel=new SchoolModel();
  isTblLoading = true;
  displayedColumns=['firstName','lastName','socialId','classroom','action']
  dataSource:MatTableDataSource<StudentModel>;

  breadscrums = [
    {
      title: 'All student',
      items: ['Student'],
      active: 'All student',
    },
  ];
  constructor(
    public dialog: MatDialog,
    public studentsService: StudentServiceService,
    private router:Router,
    private route:ActivatedRoute,
    private schoolService:SchoolServiceService
  ) { }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  

  ngOnInit(): void {
    this.schoolId=this.route.snapshot.params['schoolId'];
    this.schoolService.getSchoolById(this.schoolId).subscribe(res=>{
      this.school=res;
      this.schoolName=this.school.name;
      this.studentsService.getStudentsBySchoolId(this.schoolId).subscribe(data=>{
        this.dataSource.data = data;
      })
    }
      )
    this.dataSource= new MatTableDataSource();  
  }

  refresh() {
    this.getAllStudents();
  }

  
  addNew(){
    this.router.navigate([muncipalityManager+'/addStudent',this.schoolId])
  }
 
  updateStudent(idrow:number){
    this.router.navigate([muncipalityManager+'/updateStudent',idrow,this.schoolId])
  }

  
  deleteStudent(row) {
        
    Swal.fire({
      title: 'Are you sure you want to delete '+row.firstName+"?",
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {            
        this.studentsService.deleteStudent(row.id).subscribe(res =>{
          if(res){
            this.getAllStudents();
            Swal.fire('Deleted!', row.firstName+' has been deleted.', 'success');                
          }
        }) 
      }
      this.getAllStudents();
    });    
}
 

  private getAllStudents(){
  
    this.studentsService.getStudentsBySchoolId(this.school.id).subscribe(data => {
      this.isTblLoading = false;
      this.dataSource.data = data;
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    })
  }

  applyFilter($event:any){
    this.dataSource.filter=$event.target.value;
  }


  openFile(){
  this.dialog.open(ImportFileComponent,{
    width: '500px',
    data:{
      message: 'Import File',
      func:this.getAllStudents(),
      id:this.schoolId,
      loading:this.isTblLoading=false
    }
  }).afterClosed().subscribe(res =>{
    this.isTblLoading = true;
    
      if(res){
        
        
        Swal.fire("Students have been imported successfully",'','success');
        this.refresh()
        this.isTblLoading = false;
      }
  })
  this.getAllStudents();
}

}
