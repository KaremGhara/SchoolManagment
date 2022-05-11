import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProgramModel } from '../../models/program-model';
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
            title: 'all school',
            items: ['school'],
            active: 'all school',
        },
    ];


    schoolsProgram: ProgramModel[];
    isTblLoading = false;
    public studentFiles: any = File;
    import = false;
    displayedColumns = [ 'name', 'startDate', 'endDate', 'timeDescription', 'action']
    programToSchool: ProgramToSchool = new ProgramToSchool();
    dataSource: MatTableDataSource<ProgramModel>;
    selection = new SelectionModel<ProgramModel>(true, []);
    subs: any;

    constructor(public schoolService: SchoolServiceService,
        public programService: ProgramServiceService,
        private router: Router,
        public dialog: MatDialog
    ) { }
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;



    ngOnInit(): void {

    }



    applyFilter($event: any) {
        this.dataSource.filter = $event.target.value;
    }

    onSelectFile(event) {
        const file: File = event.target.files[0];

        this.studentFiles = file;
        this.import = true;

    }

    public schoolWasSelected(school: SchoolModel) {

        this.isTblLoading = true;
        this.programService.getProgramBySchoolId(school.id).subscribe(programs => {
            
            this.isTblLoading = false;
            this.dataSource = new MatTableDataSource(programs);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        })


    }


    editlink(row: ProgramToSchool) {
        this.router.navigate(['/workspace/school/edit/', row.school.id, row.program.id])
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
                this.programService.deleteProgram(row.id).subscribe(res => {
                    if (res) {
                        this.schoolWasSelected;
                        Swal.fire('Deleted!', row.name + ' has been deleted.', 'success');
                    }
                })
            }
            this.schoolWasSelected;
        });

    }

    public getProgramStartDate(properties: ProgramToSchool[]) {
        if(properties==null || properties[0]==null || properties.length==0)
        {
            return ""
        }
        return properties[0].startDate
    }
    public getProgramEndtDate(properties: ProgramToSchool[]) {
        if(properties==null ||properties[0]==null || properties.length==0)
        {
            return ""
        }
        return properties[0].endDate
    }

    public getProgramTimeDescription(properties: ProgramToSchool[]) {
        if(properties==null ||properties[0]==null || properties.length==0)
        {
            return ""
        }
        return properties[0].timeDescription
    }

  
}