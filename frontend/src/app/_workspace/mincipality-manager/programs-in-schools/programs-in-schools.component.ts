import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { muncipalityManager } from '../../models/global-constant';
import { ProgramToSchool } from '../../models/ProgramToSchool';
import { SchoolModel } from '../../models/school-model';
import { ProgramServiceService } from '../../services/program-service.service';
import { SchoolServiceService } from '../../services/school-service.service';

@Component({
  selector: 'app-programs-in-schools',
  templateUrl: './programs-in-schools.component.html',
  styleUrls: ['./programs-in-schools.component.sass']
})
export class ProgramsInSchoolsComponent implements OnInit {

 
  breadscrums = [
    {
        title: 'All schools',
        items: ['school'],
        active: 'All Programs',
    },
];
schoolId:number;
schoolU:SchoolModel =new SchoolModel;
isTblLoading = false;
displayedColumns = [ 'name', 'startDate', 'endDate', 'timeDescription', 'action']
dataSource: MatTableDataSource<ProgramToSchool>;
selection = new SelectionModel<ProgramToSchool>(true, []);

constructor(
    public schoolService: SchoolServiceService,
    public programService: ProgramServiceService,
    private router: Router,
    private route:ActivatedRoute,

) { }
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;



ngOnInit(): void {
    this.schoolId=this.route.snapshot.params['schoolId'];
    this.schoolService.getSchoolById(this.schoolId).subscribe(res => {
        this.schoolU=res;
        this.getProgramsToSchool();
      })     
}

applyFilter($event: any) {
    this.dataSource.filter = $event.target.value;
}

getProgramsToSchool(){
    this.isTblLoading = true;
    this.programService.getLinkBySchoolId(this.schoolU.id).subscribe(data => {   
        this.isTblLoading = false;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    })
}


editlink(row) {     
    this.router.navigate([muncipalityManager+'/updateProgramLink',row.id.programId, this.schoolU.id])
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
