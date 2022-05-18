import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
//import { Subscription } from 'rxjs/internal/Subscription';
import { ProgramServiceService } from 'src/app/_workspace/services/program-service.service';
import { ProgramModel } from '../../models/program-model';
import {ProgramManagerURL} from '../../models/global-constant'
import Swal from 'sweetalert2';
import { UserModel } from '../../models/user-model';

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

  id:number;
  //programModel:ProgramModel=new ProgramModel()
  programModel:ProgramModel=new ProgramModel();
  // user:UserModel

  //programs:ProgramModel[];
  constructor(private programService:ProgramServiceService,private route:ActivatedRoute,private router:Router) {    
  }

  ngOnInit(): void {

    this.id=this.route.snapshot.params['id'];
    
    this.programService.getProgramById(this.id).subscribe(data=>{
        this.programModel=data;

        })
  }

  // deleteProgram(id:number){
  //   this.programService.deleteProgram(id).subscribe(res =>{
  //     if(res){
  //       this.router.navigate([ProgramManagerURL+'/all'])
  //     }
  //   })
  // }



  backtoList() {
      this.router.navigate([ProgramManagerURL+'/all'])
}

  updateProgram(id:number){
    this.router.navigate([ProgramManagerURL+'/edit-program',id])
  }

}
