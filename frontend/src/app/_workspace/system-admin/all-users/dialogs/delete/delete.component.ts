import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserModel } from '../../../../models/user-model';
import { UserServiceService } from '../../../../services/user-service.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass']
})
export class DeleteComponent implements OnInit {
  [x: string]: any;
  userService: any;

  ngOnInit(): void {
    
    
  }
  confirmDelete(id:number){};

  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  public usersService: UserServiceService
) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  

  deleteUsr(id: number) {
    
    this.usersService.deleteUser(id).subscribe(res => {
      if(res){
        console.log("done!");

      }
      
    });
  }


// export function confirmDelete(id:number): void {
//   this.userService.deleteUser(id);


// }
// function openDialog(action: any, obj: any) {
//   throw new Error('Function not implemented.');
// }

// function action(action: any, obj: any) {
//   throw new Error('Function not implemented.');
// }

// function obj(action: any, obj: any) {
//   throw new Error('Function not implemented.');
// }

// function DialogBoxComponent(DialogBoxComponent: any, arg1: { width: string; data: any; }) {
//   throw new Error('Function not implemented.');
// }

// function deleteRowData(row_obj: any) {
//   throw new Error('Function not implemented.');
// }

// function row_obj(row_obj: any)  {
//   throw new Error('Function not implemented.');
// }

}