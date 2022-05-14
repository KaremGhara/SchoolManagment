import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { Role } from 'src/app/core/models/role';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { UserServiceService } from 'src/app/_workspace/services/user-service.service';
import { UserModel } from 'src/app/_workspace/models/user-model';
import { CommonService } from 'src/app/_workspace/common-utils/classes/common.service';
import { UserRole } from 'src/app/_workspace/common-utils/classes/user-role';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  [x: string]: any;
  authForm: FormGroup;
  submitted = false;
  loading = false;
  error = '';
  hide = true;
  userRole=UserRole;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private usersService : UserServiceService,
  //private commonUtilsService : CommonService
  ) {
    super();
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get f() {
    return this.authForm.controls;
  }
  adminSet() {
    this.authForm.get('username').setValue('admin@school.org');
    this.authForm.get('password').setValue('admin@123');
  }
  teacherSet() {
    this.authForm.get('username').setValue('teacher@school.org');
    this.authForm.get('password').setValue('teacher@123');
  }
  studentSet() {
    this.authForm.get('username').setValue('student@school.org');
    this.authForm.get('password').setValue('student@123');
  }
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = '';
    if (this.authForm.invalid) {
      this.error = 'Username and Password not valid !';
      return;
    // } else {

	  // //  let userDetails : UserModel = new UserModel();
    // //  userDetails.email = this.f.username.value;
    // //  userDetails.password = this.f.password.value;
    //  this.usersService.loginUser(userDetails).subscribe((loggedInUser:UserModel)=>{
    //    if(loggedInUser==null)
    //    {
    //       this.error = 'Invalid Login';        
    //         this.submitted = false;
    //         this.loading = false;
    //    }
    //    else
    //    {

    //       this.usersService.loggedInUser = loggedInUser;
    //       //this.router.navigate(["workspace/mincipality-manager/allSchools"]);
    //      // this.router.navigate([this.commonUtilsService.getDefaultRoutByRole(loggedInUser.role)]);
    //      if(loggedInUser.role==this.userRole.Admin){
    //       this.router.navigate(["workspace/system-admin/all"]);
    //     }
    //    else{
    //     this.router.navigate(["workspace/program-manager/all"]);

    //    }
        
    //       this.loading = false;
    //    }
       
    //  },
    //  (error) => {
    //    this.error = error;
    //    this.submitted = false;
    //    this.loading = false;
    //  }
    //  );
    //  /* this.subs.sink = this.authService
    //     .login(this.f.username.value, this.f.password.value)
    //     .subscribe(
    //       (res) => {
    //         if (res) {
    //           setTimeout(() => {
    //             const role = this.authService.currentUserValue.role;
    //             if (role === Role.All || role === Role.Admin) {
    //               this.router.navigate(['/admin/dashboard/main']);
    //             } else if (role === Role.Teacher) {
    //               this.router.navigate(['/teacher/dashboard']);
    //             } else if (role === Role.Student) {
    //               this.router.navigate(['/student/dashboard']);
    //             } else {
    //               this.router.navigate(['/authentication/signin']);
    //             }
    //             this.loading = false;
    //           }, 1000);
    //         } else {
    //           this.error = 'Invalid Login';
    //         }
    //       },
    //       (error) => {
    //         this.error = error;
    //         this.submitted = false;
    //         this.loading = false;
    //       }
    //     );*/
    // }
  }
}
}
