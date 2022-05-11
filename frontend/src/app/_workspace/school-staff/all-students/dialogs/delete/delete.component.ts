import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentServiceService } from '../../../../services/student-service.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass']
})
export class DeleteComponent implements OnInit {
  ngOnInit(): void {
    
  }


  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public studentsService: StudentServiceService
  ) {
    
  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }
  deleteStud(id: number) {
    
    this.studentsService.deleteStudent(id).subscribe(res => {
      if(res){
        console.log("done!");
      }
      
    });
  }

}

// export function confirmDelete(id:number): void {
//   this.studentsService.deleteStudent(id);
// }
