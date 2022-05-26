import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProgramServiceService } from 'src/app/_workspace/services/program-service.service';
import { ProgramModel } from '../../models/program-model';
import {ProgramManagerURL} from '../../models/global-constant'

@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.component.html',
  styleUrls: ['./program-details.component.sass']
})
export class ProgramDetailsComponent implements OnInit {
  breadscrums = [
    {
      title: 'About program',
      items: ['Program'],
      active: 'About program',
    },
  ];

  programId:number;
  programModel:ProgramModel=new ProgramModel();

  constructor(
    private programService:ProgramServiceService,
    private route:ActivatedRoute,
    private router:Router
    ) {    
  }

  ngOnInit(): void {
    this.programId=this.route.snapshot.params['id'];  
    this.programService.getProgramById(this.programId).subscribe(data=>{
        this.programModel=data;
        })
  }

  backtoList() {
      this.router.navigate([ProgramManagerURL+'/allPrograms'])
}

  updateProgram(id:number){
    this.router.navigate([ProgramManagerURL+'/edit-program',id])
  }

}
