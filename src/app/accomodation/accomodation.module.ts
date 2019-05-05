import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccomodationComponent } from './accomodation/accomodation.component';
import {AccomodationRoutes} from './accomodation.routing'
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {CalendarModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(AccomodationRoutes),
    CalendarModule
  ],
  declarations: [AccomodationComponent]
})
export class AccomodationModule { }
