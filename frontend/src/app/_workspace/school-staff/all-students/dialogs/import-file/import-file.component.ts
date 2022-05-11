import { Component, Inject,OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentServiceService } from '../../../../services/student-service.service';


@Component({
  selector: 'app-import-file',
  templateUrl: './import-file.component.html',
  styleUrls: ['./import-file.component.sass']
})
export class ImportFileComponent implements OnInit {
  public stdFile:any=File;
  isTblLoading = false;

  constructor(
    public dialogRef: MatDialogRef<ImportFileComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public studentsService: StudentServiceService) { }

  ngOnInit(): void {
  }
  uploadFile(e){
    const file:File=e.target.files[0]
    this.stdFile=file;
  }
  uploadStds(id:number){
    this.isTblLoading=true;
    const formData= new FormData();
    formData.append("file",this.stdFile);
    this.studentsService.saveStudentsFile(formData,id).subscribe(res =>{
        this.dialogRef.close(res)
        this.isTblLoading=false;
    })
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
