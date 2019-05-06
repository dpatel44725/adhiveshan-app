import { Routes } from '@angular/router';
import {AccomodationComponent} from './accomodation/accomodation.component';
import {AccommodationInfoComponent} from './accommodation-info/accommodation-info.component';

export const AccomodationRoutes: Routes = [{
  path: '',
  children: [
    {
      path: 'accomodation-info',
      component: AccommodationInfoComponent
    },{
    path: 'accomodation',
    component: AccomodationComponent
  }]
}];