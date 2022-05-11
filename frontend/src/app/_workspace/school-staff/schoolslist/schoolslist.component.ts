import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SchoolModel } from '../../models/school-model';
import { SchoolServiceService } from '../../services/school-service.service';

@Component({
  selector: 'app-schoolslist',
  templateUrl: './schoolslist.component.html',
  styleUrls: ['./schoolslist.component.sass']
})
export class SchoolslistComponent implements OnInit {

  constructor() { }
  @Input()
  schools:SchoolModel[];

  @Output()
  onSchoolSelected : EventEmitter<SchoolModel> = new  EventEmitter<SchoolModel>();

  ngOnInit(): void {
  }

  public schoolSelected(school :SchoolModel)
  {
    this.onSchoolSelected.emit(school);
  }
}
