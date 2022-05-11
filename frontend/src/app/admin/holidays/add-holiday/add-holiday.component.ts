import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-holiday',
  templateUrl: './add-holiday.component.html',
  styleUrls: ['./add-holiday.component.sass'],
})
export class AddHolidayComponent {
  holidayForm: FormGroup;
  breadscrums = [
    {
      title: 'Add Holiday',
      items: ['Fees'],
      active: 'Add Holiday',
    },
  ];
  constructor(private fb: FormBuilder) {
    this.holidayForm = this.fb.group({
      no: ['', [Validators.required]],
      title: ['', [Validators.required]],
      sDate: ['', [Validators.required]],
      eDate: ['', [Validators.required]],
      type: ['', [Validators.required]],
      details: [''],
    });
  }
  onSubmit() {
    console.log('Form Value', this.holidayForm.value);
  }
}
