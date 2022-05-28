import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SchoolClassModel } from '../../models/school-class-model';
import { SchoolModel } from '../../models/school-model';
import { StudentModel } from '../../models/student-model';
import { SchoolClassServiceService } from '../../services/school-class-service.service';
import { SchoolServiceService } from '../../services/school-service.service';
import { StudentServiceService } from '../../services/student-service.service';
import { ImportFileComponent } from '../all-students/dialogs/import-file/import-file.component';

@Component({
  selector: 'app-all-classes-rooms-in-school-staff',
  templateUrl: './all-classes-rooms-in-school-staff.component.html',
  styleUrls: ['./all-classes-rooms-in-school-staff.component.sass']
})
export class AllClassesRoomsInSchoolStaffComponent implements OnInit {

 
  breadscrums = [
    {
        title: 'all Classes Rooms',
        items: ['class room'],
        active: 'all Classes Rooms',
    },
];

schoolId: number;
userId: number;
schoolName: String;
school:SchoolModel=new SchoolModel();
isTblLoading = true;
displayedColumns=['firstName','lastName','socialId','classroom','action']
dataSource:MatTableDataSource<StudentModel>;
selectedClassroom:SchoolClassModel=new SchoolClassModel();


constructor(
  public dialog: MatDialog,
  public studentsService: StudentServiceService,
  private router:Router,
  private schoolService:SchoolServiceService,
  private schoolClassServiceService:SchoolClassServiceService
) { }
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;


ngOnInit(): void {
  const storedItems= JSON.parse(localStorage.getItem('currentUser'))
  this.userId=storedItems.id;

  this.schoolService.getSchoolByUserId(this.userId).subscribe(res => {
    this.school=res;
    this.schoolId=this.school.id;
  this.schoolName=this.school.name;
  })
  this.dataSource= new MatTableDataSource();
  
}

refresh() {
  this.getAllStudents();
}


addNew(){
  this.router.navigate(["/workspace/school-staff/addStudent"])
}

updateStudent(idrow:number){
  this.router.navigate(["/workspace/school-staff/updateStudent",idrow])
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
  console.log(this.selectedClassroom.id)
  this.schoolClassServiceService.getStudentsBySchoolIdAndClassRoomId(this.school.id,this.selectedClassroom.id).subscribe((students : StudentModel[]) => {
    this.isTblLoading = false;
    this.dataSource.data = students;
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

classRoomWasSelected(event){ 
  this.selectedClassroom = event;
  this.getAllStudents();
}

}
