import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProgramModel } from '../../models/program-model';
import { ProgramServiceService } from '../../services/program-service.service';
import {ProgramManagerURL} from '../../models/global-constant'
import Swal from 'sweetalert2';
import { DeleteProgramComponent } from '../delete-program/delete-program.component';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { UserModel } from '../../models/user-model';

@Component({
  selector: 'app-all-program',
  templateUrl: './all-program.component.html',
  styleUrls: ['./all-program.component.sass']
})
export class AllProgramComponent  
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
    breadscrums = [
        {
          title: 'Show programs',
          items: ['program'],
          active: 'Show programs',
        },
      ];
    programs:ProgramModel[];
    isTblLoading = true;
    public studentFiles: any=File;
    import=false;
    displayedColumns=['name','cost','shortDescription','managerId','action']
    ProgramDatabase: ProgramServiceService | null;
  dataSource:MatTableDataSource<ProgramModel>;
  selection = new SelectionModel<ProgramModel>(true, []);
  //subs:any;
  id: number;
  filteredData: ProgramModel[] = [];
 
  constructor( public programService: ProgramServiceService,
    private router:Router,
    public dialog: MatDialog,
    ) {
      super();
    }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;



  ngOnInit(): void {
    this.getAllPrograms();


    }

    getAllPrograms(){
        this.programService.getAllProgram().subscribe(data => {
          this.isTblLoading = false;
          this.dataSource= new MatTableDataSource(data);
          this.dataSource.paginator=this.paginator;
          this.dataSource.sort=this.sort;
        })
      }
      
      applyFilter($event:any){
        this.dataSource.filter=$event.target.value;
      }

      onSelectFile(event){
        const file:File =event.target.files[0];
        
          this.studentFiles=file;
          this.import=true;
       
      }
   
      deleteItem(row) {
        
        Swal.fire({
          title: 'Are you sure you want to delete '+row.name+"?",
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor:'#d33' ,
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
          if (result.value) {            
            this.programService.deleteProgram(row.id).subscribe(res =>{
              if(res){
                this.getAllPrograms();
                Swal.fire('Deleted!', row.name+' has been deleted.', 'success');                
              }
            }) 
          }
          this.getAllPrograms();
        });    
    
    }
           
    AboutProgram(id:number){
      this.router.navigate([ProgramManagerURL+'/details',id])
    }

    addProgram(){
      this.router.navigate([ProgramManagerURL+'/add-program'])
    }
    updateProgram(id:number){
      this.router.navigate([ProgramManagerURL+'/edit-program',id])
    }
}

