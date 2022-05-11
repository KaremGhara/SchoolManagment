import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProgramModel } from '../../models/program-model';
import { StudentModel } from '../../models/student-model';
import { ProgramServiceService } from '../../services/program-service.service';
import { StudentServiceService } from '../../services/student-service.service';

@Component({
  selector: 'app-programlist',
  templateUrl: './programlist.component.html',
  styleUrls: ['./programlist.component.sass']
})
export class ProgramlistComponent implements OnInit {

  constructor(private StudentService: StudentServiceService) { }

  @Input()
  programs:ProgramModel[];

  @Input()
  aviablePrograms:ProgramModel[];

  @Input()
  studentId: number;

  ngOnInit(): void {
  }

  refreshPrograms(refreshFlag:boolean){
    if(refreshFlag){
      this.StudentService.getStudentPrograms(this.studentId).subscribe({
        next: (programs: ProgramModel[])=>{
          this.programs=programs;
        },
        error: (err)=>{console.log(err)}
      });
      this.StudentService.getStudentAvilablePrograms(this.studentId).subscribe({
        next: (aviableProgram: ProgramModel[])=>{
          this.aviablePrograms=aviableProgram;
        },  
        error: (err)=>{console.log(err)}
      });
    }
  }
  
}