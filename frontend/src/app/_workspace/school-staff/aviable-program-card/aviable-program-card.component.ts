import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProgramModel } from '../../models/program-model';
import { StudentServiceService } from '../../services/student-service.service';

@Component({
  selector: 'app-aviable-program-card',
  templateUrl: './aviable-program-card.component.html',
  styleUrls: ['./aviable-program-card.component.sass']
})
export class AviableProgramCardComponent implements OnInit {

  constructor(private studentService: StudentServiceService) { }
    
  @Input()
  aviableProgram:ProgramModel;

  @Input()
  studentId: number;

  @Output()
  onClick : EventEmitter<boolean> = new  EventEmitter<boolean>();

  ngOnInit(): void {
  }

  addProgram(){
    this.studentService.addProgram(this.aviableProgram.id,this.studentId).subscribe({
      next: ()=> { 
        console.log("add program");
        this.onClick.emit(true);
      },
      error: (error)=>{console.log(error);
        this.onClick.emit(false);
      }
    });
  }

}
