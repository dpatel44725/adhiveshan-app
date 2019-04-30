import { Routes } from '@angular/router';
import {AccomodationComponent} from './accomodation/accomodation.component';

export const AccomodationRoutes: Routes = [{
  path: '',
  children: [{
    path: 'accomodation',
    component: AccomodationComponent
  }]
}];