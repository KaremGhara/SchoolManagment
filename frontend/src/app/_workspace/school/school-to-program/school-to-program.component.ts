import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProgramModel } from '../../models/program-model'
import { ProgramToSchool } from '../../models/ProgramToSchool';
import { SchoolModel } from '../../models/school-model';
import { ProgramServiceService } from '../../services/program-service.service';
import {Location} from '@angular/common';
import { SchoolServiceService } from '../../services/school-service.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-school-to-program',
  templateUrl: './school-to-program.component.html',
  styleUrls: ['./school-to-program.component.sass']
})
export class SchoolToProgramComponent implements OnInit {
    linkForm: FormGroup;
    progid:number
    schoolid:number
    breadscrums = [
        {
          title: 'Link details',
          items: ['Link program to school'],
          active: 'Link details',
        },
      ];
   
  constructor(public dialog: MatDialog,private fb: FormBuilder,private _location: Location, private route: ActivatedRoute, private router: Router,private schoolService:SchoolServiceService, private programService:ProgramServiceService) {
    this.linkForm = this.fb.group({
    });


    this.linkForm.addControl("StartDate", new FormControl('', [Validators.required]))
    this.linkForm.addControl("EndDate", new FormControl('', [Validators.required]))
    this.linkForm.addControl("Duration", new FormControl('', [Validators.required]))
   }

  
  program2school:ProgramToSchool = new ProgramToSchool;
  program:ProgramModel = new ProgramModel;
  school:SchoolModel =new SchoolModel;

  ngOnInit(): void {
    this.progid=this.route.snapshot.params['id'];    
    this.schoolid=this.route.snapshot.params['id2'];
    this.programService.getProgramById(this.progid).subscribe(data => {
        this.program2school.program=data;
    })
    this.schoolService.getSchoolById(this.schoolid).subscribe(data => {
        this.program2school.school=data;
    })
   
  }
  backToList(){
    
    this._location.back();
   
  }

  addlink(program2school:ProgramToSchool) {
    this.schoolService.linkSchool(program2school).subscribe(result => {
        if (result) {
            console.log(program2school)
            Swal.fire({
                icon: 'success',
                title: 'Attached successfully',
              

            });
            this._location.back();
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'somthing is wrong',

            });
        }

    })
}




}
