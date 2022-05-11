import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SchoolClassModel } from '../../models/school-class-model';
import { StudentModel } from '../../models/student-model';
import { StudentServiceService } from '../../services/student-service.service';

@Component({
  selector: 'app-studentslist',
  templateUrl: './studentslist.component.html',
  styleUrls: ['./studentslist.component.sass']
})
export class StudentslistComponent implements OnInit{
  constructor() { }

  @Input()
  students:StudentModel[];

  @Output()
  onStudentSelected : EventEmitter<StudentModel> = new  EventEmitter<StudentModel>();

  ngOnInit(): void {
      
  }

  public studentSelected(student:StudentModel)
  {
    this.onStudentSelected.emit(student);
  }

}
