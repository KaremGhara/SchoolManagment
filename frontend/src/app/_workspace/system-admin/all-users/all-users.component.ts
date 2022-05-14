import { UserModel } from '../../models/user-model';
import { UserServiceService } from '../../services/user-service.service';
import { Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';






@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.sass']
})
export class AllUsersComponent implements OnInit {


  id: number;
  users: UserModel;
  isTblLoading = true;
  public userFiles: any=File;
  import=false;
  
  breadscrums = [
    {
      title: 'Report',
      items: ['Users'],
      active: 'All users',
    },
  ];
  dataSource: MatTableDataSource<UserModel>;

  constructor(
    public dialog: MatDialog,
    public userService: UserServiceService,
    private router:Router,
    private snackBar: MatSnackBar

  ) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  
  Users:UserModel[]=[];
  displayedColumns=['fname','lname','socialId','email','phone','password','role','status','action']

  selection = new SelectionModel<UserModel>(true, []);
  subs:any;
  

  ngOnInit(): void {

     this.getAllUsers();
  }

  refresh() {

     this.getAllUsers();
 
  }

  addNew(){
    this.router.navigate(['/workspace/system-admin/add'])
  }
  updateUser(id:number){
    this.router.navigate(['/workspace/system-admin/update',id])
  }
  
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  private getAllUsers(){
    this.userService.getAllUsers().subscribe(data => {
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
    
      this.userFiles=file;
      this.import=true;
   
  }

  Upload(){
    const formData = new FormData();
    formData.append('file',this.userFiles);
    this.userService.saveUsersFile(formData).subscribe(data =>
      
      this.getAllUsers()
      
      )
      this.import=false;
      
  }
  
 deleteUser(row) {
        
  Swal.fire({
    title: 'Are you sure you want to delete '+row.fname+"?",
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.value) {            
      this.userService.deleteUser(row.id).subscribe(res =>{
        if(res){
          this.getAllUsers();
          Swal.fire('Deleted!', row.fname+' has been deleted.', 'success');                
        }
      }) 
    }
    this.getAllUsers();
  });    

}

}
