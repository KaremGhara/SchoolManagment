import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SchoolClassModel } from '../../models/school-class-model';
import { SchoolModel } from '../../models/school-model';
import { SchoolClassServiceService } from '../../services/school-class-service.service';

@Component({
  selector: 'app-schoolcard',
  templateUrl: './schoolcard.component.html',
  styleUrls: ['./schoolcard.component.sass']
})
export class SchoolcardComponent implements OnInit {



    constructor() { }
    @Input()
     school:SchoolModel;

    @Output()
    onSchoolSelected : EventEmitter<SchoolModel>= new  EventEmitter<SchoolModel>();

    ngOnInit(): void {

  }
  onClick(): void{
    this.onSchoolSelected.emit(this.school);
  }


  }



