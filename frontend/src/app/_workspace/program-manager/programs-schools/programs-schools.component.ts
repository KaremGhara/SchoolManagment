import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router} from '@angular/router';
import Swal from 'sweetalert2';
import { ProgramManagerURL } from '../../models/global-constant';
import { ProgramToSchool } from '../../models/ProgramToSchool';
import { SchoolModel } from '../../models/school-model';
import { ProgramServiceService } from '../../services/program-service.service';
import { SchoolServiceService } from '../../services/school-service.service';

@Component({
  selector: 'app-programs-schools',
  templateUrl: './programs-schools.component.html',
  styleUrls: ['./programs-schools.component.sass']
})
export class ProgramsSchoolsComponent implements OnInit {

 
  breadscrums = [
    {
        title: 'All Programs',
        items: ['schools'],
        active: 'All Programs',
    },
];
selectedschool:SchoolModel=new SchoolModel();
schools: SchoolModel[]=[];
isTblLoading = false;
displayedColumns = [ 'name', 'startDate', 'endDate', 'timeDescription', 'action']
dataSource: MatTableDataSource<ProgramToSchool>;
selection = new SelectionModel<ProgramToSchool>(true, []);

constructor(
    public schoolService: SchoolServiceService,
    public programService: ProgramServiceService,
    private router: Router,
) { }
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;



ngOnInit(): void {
    this.schoolService.getSchools().subscribe(res => {
        this.schools=res;
      })     
}

applyFilter($event: any) {
    this.dataSource.filter = $event.target.value;
}

getProgramsToSchool(){
    this.isTblLoading = true;
    this.programService.getLinkBySchoolId(this.selectedschool.id).subscribe(data => {   
        this.isTblLoading = false;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    })
}


editlink(row) {     
    this.router.navigate([ProgramManagerURL+'/updateProgramLink',row.id.programId, this.selectedschool.id])
}


deleteItem(row) {
    Swal.fire({
        title: 'Are you sure you want to delete ' + row.name + "?",
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
        if (result.value) {
            this.programService.deleteProgram(row.id.programId).subscribe(res => {
                if (res) {
                    this.getProgramsToSchool();
                    Swal.fire('Deleted!', row.name + ' has been deleted.', 'success');
                }
            })
        }
        this.getProgramsToSchool();
    });
}
}
