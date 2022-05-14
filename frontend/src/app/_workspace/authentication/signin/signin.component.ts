import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/service/auth.service';
import { UnsubscribeOnDestroyAdapter } from '../../shared/UnsubscribeOnDestroyAdapter';
import { UserServiceService } from '../../services/user-service.service';
import { UserModel } from '../../models/user-model';
import { UserRole } from '../../common-utils/classes/user-role';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
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
    private authService: AuthService, private usersService: UserServiceService
  ) {
    super();
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ['admin@gmail.com', Validators.required],
      password: ['123456', Validators.required],
    });
  }
  get f() {
    return this.authForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = '';
    if (this.authForm.invalid) {
      this.error = 'Username and Password not valid !';
      return;
    } else {

      let   loginUser:UserModel=new UserModel();
      loginUser.email=this.f.username.value;
      loginUser.password=this.f.password.value;
      this.authService.login(loginUser).subscribe(res=>{
  
        if (res) {
          this.usersService.loggedInUser=res;
          setTimeout(() => {
            const role = this.usersService.loggedInUser.role;
            if (role === this.userRole.Admin) {
              this.router.navigate(['workspace/system-admin/all']);
            } else if (role === this.userRole.ProgramManager) {
              this.router.navigate(["workspace/program-manager/all"])
            } else if (role === this.userRole.SchoolStaff) {
              this.router.navigate(["workspace/school-staff/attach"]);
            }
            else if (role === this.userRole.MuncipalityManager) {
              this.router.navigate(["workspace/municipality-manager/allSchools"]);
            } else {
              this.router.navigate(['/authentication/signin']);
            }
            this.loading = false;
          }, 1000);
        }
        else {
          this.error = 'Invalid Login';
        }  },
        (error) => {
          this.error = error;
          this.submitted = false;
          this.loading = false;
        }
        );
      }
    }
}
