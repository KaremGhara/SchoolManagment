import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { SchoolClassModel } from '../../models/school-class-model';
import { SchoolModel } from '../../models/school-model';
import { SchoolClassServiceService } from '../../services/school-class-service.service';

@Component({
  selector: 'app-classroomlist',
  templateUrl: './classroomlist.component.html',
  styleUrls: ['./classroomlist.component.sass']
})
export class ClassroomlistComponent implements OnInit {

  constructor() { }
  
  @Input()
  classrooms: SchoolClassModel[];

  @Output()
  onClassRoomSelected : EventEmitter<SchoolClassModel> = new  EventEmitter<SchoolClassModel>();

  ngOnInit(): void {
    
  }
 
  public classRoomSelected(classroom:SchoolClassModel)
  {
    this.onClassRoomSelected.emit(classroom);
  }

}
