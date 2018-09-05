import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopMenuComponent } from './top-menu.component';
import { Routing } from './top-menu.route';


@NgModule({
  imports: [
    CommonModule,
    Routing
  ],
  declarations: [TopMenuComponent],
  exports: [TopMenuComponent]
})
export class TopMenuModule { }
