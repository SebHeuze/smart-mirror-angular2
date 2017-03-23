import { Routes } from '@angular/router';
import { MirrorComponent } from './mirror';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '',      component: MirrorComponent }
];
