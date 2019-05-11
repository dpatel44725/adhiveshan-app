import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccomodationComponent } from './accomodation/accomodation.component';
import {AccomodationRoutes} from './accomodation.routing'
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {CalendarModule} from 'primeng/primeng';
import { AccommodationInfoComponent } from './accommodation-info/accommodation-info.component';
import {TableModule} from 'primeng/table';
import {MatButtonModule, MatDialogModule, MatIconModule, MatToolbarModule} from '@angular/material';
import { AccommodationAssignDialogComponent } from './accommodation-assign-dialog/accommodation-assign-dialog.component';
import { SearchBalakComponent } from './search-balak/search-balak.component';
import {InputTextModule} from 'primeng/inputtext';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(AccomodationRoutes),
        CalendarModule,
        TableModule,
        MatDialogModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        InputTextModule
    ],
  declarations: [AccomodationComponent, AccommodationInfoComponent, AccommodationAssignDialogComponent, SearchBalakComponent],
    entryComponents: [AccommodationAssignDialogComponent, SearchBalakComponent]
})
export class AccomodationModule { }
