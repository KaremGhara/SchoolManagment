import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonUtilsRoutingModule } from './common-utils-routing.module';
import { ScreenContainerComponent } from './screen-container/screen-container.component';
import { ComponentsModule } from '../../shared/components/components.module';
import { CommonService }from './classes/common.service'

@NgModule({
  declarations: [
    ScreenContainerComponent
  ],
  imports: [
    CommonModule,
    CommonUtilsRoutingModule,
    ComponentsModule
  ],
  exports: [
    ScreenContainerComponent
    
  ],
  providers:[
  ]
})
export class CommonUtilsModule {
 

 }
