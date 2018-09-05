import { Component, OnInit, OnChanges, DoCheck, AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
import { Router, Event as RouterEvent, ActivatedRoute, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from "@angular/router";
import { CommonModule } from "@angular/common";

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(public router: Router, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    try {
    }
    catch (err) { console.error(err); }
  }
}
