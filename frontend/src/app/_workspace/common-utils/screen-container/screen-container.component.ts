import { Component, ContentChild, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-screen-container',
  templateUrl: './screen-container.component.html',
  styleUrls: ['./screen-container.component.sass']
})
export class ScreenContainerComponent implements OnInit {

  @Input() 
  title:string = "*** Need to set this title ***"

  @Input() 
  breadscrums = []


  @ContentChild(Component) childComponent:Component;

  constructor() { }

  ngOnInit(): void {
  }

}
