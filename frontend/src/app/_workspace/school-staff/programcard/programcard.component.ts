import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProgramModel } from '../../models/program-model';
import { StudentServiceService } from '../../services/student-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-programcard',
  templateUrl: './programcard.component.html',
  styleUrls: ['./programcard.component.sass']
})
export class ProgramcardComponent implements OnInit {


  constructor(private studentService: StudentServiceService) { }
  @Input()
  program: ProgramModel;

  @Input()
  studentId: number;

  @Output()
  onClick : EventEmitter<boolean> = new  EventEmitter<boolean>();

  ngOnInit(): void {

  }


  removeProgram(){
    Swal.fire({
      title: 'Are you sure you want to delete '+this.program.name+" program?",
      text: "Student will no longer be a participant in this program!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {            
        this.studentService.removeProgram(this.program.id, this.studentId).subscribe({
          next: ()=> { 
            console.log("sending put request");
            this.onClick.emit(true);
            Swal.fire('Deleted!', this.program.name+' has been deleted.', 'success');                
          },
          error: (error)=>{console.log(error);
          this.onClick.emit(false);
          }
        });
      }
    }) 
  }
}
