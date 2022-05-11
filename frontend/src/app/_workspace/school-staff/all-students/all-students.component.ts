import { Component,OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { StudentModel } from 'src/app/_workspace/models/student-model';
import { StudentServiceService } from 'src/app/_workspace/services/student-service.service';
import { ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { DeleteComponent } from './dialogs/delete/delete.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SchoolServiceService } from '../../services/school-service.service';
import Swal from 'sweetalert2';
import { ImportFileComponent } from './dialogs/import-file/import-file.component'

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.sass']
})
export class AllStudentsComponent implements OnInit {
  id: number;
  schoolName: String;
  isTblLoading = true;
  displayedColumns=['firstName','lastName','socialId','classroom','action']
  dataSource:MatTableDataSource<StudentModel>;
  public stdFile:any=File;

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
    private snackBar: MatSnackBar,
    private route:ActivatedRoute,
    private schoolService:SchoolServiceService

  ) { }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.schoolName=this.route.snapshot.params['schoolName'];
    this.dataSource= new MatTableDataSource();
    this.getAllStudents();
  }

  refresh() {
    this.getAllStudents();
  }

  
  addNew(){
    this.router.navigate(["/workspace/school-staff/add",this.id,this.schoolName])
  }
 
  updateStudent(idrow:number){
    this.router.navigate(["/workspace/school-staff/update",this.id,idrow,this.schoolName])
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
 



  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
 

  private getAllStudents(){
  
    this.studentsService.getStudentsBySchoolId(this.id).subscribe(data => {
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
      id:this.id,
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

