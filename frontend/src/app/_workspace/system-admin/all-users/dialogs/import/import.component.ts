import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserServiceService } from '../../../../services/user-service.service'

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.sass']
})
export class ImportComponent implements OnInit {
  public usrFile:any=File;
  constructor(
    public dialogRef: MatDialogRef<ImportComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public usersService: UserServiceService
  ) {}

  ngOnInit(): void {}

  uploadFile(e){
    const file:File=e.target.files[0]
    this.usrFile=file;
    alert(e);

  }
  uploadStds(){
    const formData= new FormData();
    formData.append("file",this.usrFile);
    alert(this.usrFile)
    this.usersService.saveUsersFile(formData).subscribe(data =>{
      this.usersService.getAllUsers();
      alert(data);
    })
  }
}
