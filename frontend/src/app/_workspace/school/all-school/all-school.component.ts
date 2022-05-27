import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProgramToSchool } from '../../models/ProgramToSchool';
import { SchoolModel } from '../../models/school-model';
import { ProgramServiceService } from '../../services/program-service.service';
import { SchoolServiceService } from '../../services/school-service.service';
@Component({
    selector: 'app-all-school',
    templateUrl: './all-school.component.html',
    styleUrls: ['./all-school.component.sass']
})
export class AllSchoolComponent implements OnInit {


    breadscrums = [
        {
            title: 'All school',
            items: ['school'],
            active: 'All Programs',
        },
    ];

    userId:number;
    schoolU:SchoolModel =new SchoolModel;
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
        const storedItems= JSON.parse(localStorage.getItem('currentUser'))
        this.userId=storedItems.id;
       
        this.schoolService.getSchoolByUserId(this.userId).subscribe(res => {
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
        this.router.navigate(['/workspace/school/edit/',row.id.programId, this.schoolU.id]);
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
