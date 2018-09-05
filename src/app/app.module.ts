import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { TopMenuModule } from './sn-components/top-menu/top-menu.module';
import { AppRoutingModule } from './app.routing';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { JoinVidyoCallDirective } from './sn-directives/join-vidyo-call.directive';


@NgModule({
  declarations: [
    AppComponent,
    //JoinVidyoCallDirective,  
  ],

  imports: [
    AppRoutingModule,
    BrowserModule,    
    TopMenuModule,  
    FormsModule,
    ReactiveFormsModule,  
    environment.production ? ServiceWorkerModule.register('ngsw-worker.js') : []     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
