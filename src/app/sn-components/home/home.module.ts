import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routing } from './home.route';
import { HomeComponent } from './home.component';


import '../../../assets/scripts/sn.js';
import { JoinVidyoCallDirective } from '../../sn-directives/join-vidyo-call.directive';

@NgModule({
  imports: [
    CommonModule,
    Routing,        
  ],
  declarations: [HomeComponent, JoinVidyoCallDirective]
})

export class HomeModule { }
