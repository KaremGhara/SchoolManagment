import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProgramModel } from '../../models/program-model';
import { ProgramServiceService } from '../../services/program-service.service';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { ProgramManagerURL } from '../../models/global-constant'
import Swal from 'sweetalert2';
import { UserServiceService } from '../../services/user-service.service';
import { UserModel } from '../../models/user-model';

@Component({
    selector: 'app-add-program',
    templateUrl: './add-program.component.html',
    styleUrls: ['./add-program.component.sass']
})
export class AddProgramComponent implements OnInit {

    breadscrums = [
        {
            title: 'Add Program',
            items: ['Program'],
            active: 'Add Program',
        },
    ];

    id: number;
    programModel: ProgramModel = new ProgramModel();
    ProgramForm: FormGroup;
    role:String = 'ProgramManager';
    users: UserModel[];
 

    constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private programservice: ProgramServiceService, private usersService: UserServiceService) {
        this.ProgramForm = this.fb.group({
        });

        this.ProgramForm.addControl("name", new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]))
       
        this.ProgramForm.addControl("cost", new FormControl('', [Validators.required, Validators.min(0)]))
        // positiveNumberValidator()
        this.ProgramForm.addControl("managerId", new FormControl('', [Validators.required]))
        this.ProgramForm.addControl("shortDescription", new FormControl('', [Validators.required]))
        this.ProgramForm.addControl("longDescription", new FormControl('', [Validators.required]))
    }

 
 

    ngOnInit(): void {
      
        this.usersService.getUserByRole(this.role).subscribe(data => {
            this.users=data
        })
       
    }

    onSubmit() {
        console.log('Form Value', this.ProgramForm.value);

    }


    addProgram() {
        this.programservice.addProgram(this.programModel, this.programModel.programmanager.id).subscribe(result => {
            if (result) {
                console.log(this.programModel)
                this.router.navigate([ProgramManagerURL + '/all'])

                    Swal.fire({
                      icon: 'success',
                      title: 'Added',
                      text: 'Program was added Successfully...!!! ',
          
                    })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Program already exists',

                });
            }

        })
    }

    backToList() {
        this.router.navigate([ProgramManagerURL + '/all'])

    }

    getNameErrorMessage() {
        if (this.ProgramForm.get('name').hasError('required')) {
            return 'You must enter a value';

        }
        if (this.ProgramForm.get('name').hasError('pattern')) {
            return 'Name is invalid'
        }
    }
    // getManagerIdErrorMessage() {
    //     if (this.ProgramForm.get('managerId').hasError('required')) {
    //         return 'You must enter a value';
    //     }
    //     if (this.ProgramForm.get('managerId').hasError('maxLength')) {
    //         return 'Manager id must be 9 digits long';
    //     }
    //     if (this.ProgramForm.get('managerId').hasError('minLength')) {
    //         return 'Manager id must be 9 digits long';
    //     }
    // }
    // getCostErrorMessage(){
    //   if (this.cost.hasError('required')) {
    //     return 'You must enter a value';
    //   }

    // }
    getDescriptionErrorMessage() {
        if (this.ProgramForm.get('shortDescription').hasError('required')) {
            return 'You must enter a value';
        }
    }
}

function positiveNumberValidator(): import("@angular/forms").ValidatorFn {
    throw new Error('Function not implemented.');
}
