import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProgramModel } from '../../models/program-model';
import { StudentModel } from '../../models/student-model';
import { ProgramServiceService } from '../../services/program-service.service';

@Component({
  selector: 'app-studentcard',
  templateUrl: './studentcard.component.html',
  styleUrls: ['./studentcard.component.sass']
})
export class StudentcardComponent implements OnInit {

  constructor() { }
   @Input()
   student:StudentModel;

   @Output()
   onStudentSelected : EventEmitter<StudentModel>= new  EventEmitter<StudentModel>();

  ngOnInit(): void {
    }

  OnClick(){
     this.onStudentSelected.emit(this.student);
    }
}
