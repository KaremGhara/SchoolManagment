import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.sass']
})
export class AdminDetailsComponent implements OnInit {
  breadscrums = [
    {
      title: 'profile admin',
      items: ['admin'],
      active: 'profile admin',
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
