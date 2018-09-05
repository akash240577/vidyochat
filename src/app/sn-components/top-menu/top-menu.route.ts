import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopMenuComponent } from './top-menu.component';

const routes: Routes = [
  { path: '', component: TopMenuComponent},  
];

export const Routing: ModuleWithProviders = RouterModule.forChild(routes);