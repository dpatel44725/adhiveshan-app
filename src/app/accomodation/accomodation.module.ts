import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccomodationComponent } from './accomodation/accomodation.component';
import {AccomodationRoutes} from './accomodation.routing'
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(AccomodationRoutes),
  ],
  declarations: [AccomodationComponent]
})
export class AccomodationModule { }
