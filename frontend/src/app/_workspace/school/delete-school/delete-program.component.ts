import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

import { ProgramServiceService } from '../../services/program-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-program',
  templateUrl: './delete-program.component.html',
  styleUrls: ['./delete-program.component.sass']
})
export class DeleteProgramComponent{

  constructor(
    public dialogRef: MatDialogRef<DeleteProgramComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public programService: ProgramServiceService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.programService.deleteProgram(this.data.id);
    this.customWithFunction()
  }
  customWithFunction() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }
}
