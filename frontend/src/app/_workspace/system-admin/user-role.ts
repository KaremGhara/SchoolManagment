 import {Component} from '@angular/core';

interface Role {
  value: string;
  viewValue: string;
}

/**
 * @title Basic select
 */
@Component({
  selector: 'add-user-component',
  templateUrl: 'select-overview-example.html',
})
export class SelectRole {
  roles: Role[] = [
    {value: 'manager-0', viewValue: 'Manager'},
    {value: 'parent-1', viewValue: 'Parent'},
    {value: 'school stuff-2', viewValue: 'School stuff'},
  ];
}