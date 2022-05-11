import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { SchoolClassModel } from '../../models/school-class-model';
import { StudentModel } from '../../models/student-model';
import { StudentServiceService } from '../../services/student-service.service';

@Component({
  selector: 'app-classroomcard',
  templateUrl: './classroomcard.component.html',
  styleUrls: ['./classroomcard.component.sass']
})
export class ClassroomcardComponent implements OnInit {
  constructor() { }
  @Input()
  classroom: SchoolClassModel;

  @Output()
  onClassRoomSelected : EventEmitter<SchoolClassModel> = new  EventEmitter<SchoolClassModel>();

  ngOnInit(): void {
    
  }
 onClick(){
  
  this.onClassRoomSelected.emit(this.classroom);
  
 }
}


