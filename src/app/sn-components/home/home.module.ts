import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {Routing} from './home.route';
import {HomeComponent, VidyoRoomDialog} from './home.component';


import '../../../assets/scripts/sn.js';
import {FormsModule} from "@angular/forms";
import {MatDialogModule, MatFormFieldModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    Routing,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule
  ],
  declarations: [HomeComponent, VidyoRoomDialog],
  entryComponents: [HomeComponent, VidyoRoomDialog]
})

export class HomeModule {
}
