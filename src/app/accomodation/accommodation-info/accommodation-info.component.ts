import {Component, OnInit} from '@angular/core';
import {AccomodationService} from '../../_services/accomodation.service';
import {AccommodationAssignDialogComponent} from '../accommodation-assign-dialog/accommodation-assign-dialog.component';
import {MatDialog} from '@angular/material';
import {SearchBalakComponent} from '../search-balak/search-balak.component';

@Component({
  selector: 'app-accommodation-info',
  templateUrl: './accommodation-info.component.html',
  styleUrls: ['./accommodation-info.component.css']
})
export class AccommodationInfoComponent implements OnInit {

  accommodationData: any;
  balaks: any = [];

  cols: any[];

  constructor(private accomodationService: AccomodationService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.accommodationData = [];
    this.cols = [
      { field: 'acc_id', header: 'id' },
      { field: 'acc_title', header: 'Room Id' },
      { field: 'acc_building', header: 'Building' },
      { field: 'acc_floor', header: 'Floor' },
      { field: 'acc_room_no', header: 'Room No' },
      { field: 'acc_max_cap', header: 'Max Cap.' },
      { field: 'total_allocated', header: 'Allocated' },
      { field: '', header: 'Action'}
    ];

    this.accomodationService.getAllAccommodation().subscribe(data => {
      // @ts-ignore
      this.accommodationData =  data.accommodations;
    });

  }

  openAssignDialog(data) {
    const dialogRef = this.dialog.open(AccommodationAssignDialogComponent, {
      width: '1000Px',
      data: {
        accommodation_info: data,
        showActionButtons: true
      }
    });

    dialogRef.afterClosed().subscribe(d => {
      this.accomodationService.getAllAccommodation().subscribe(dd => {
        // @ts-ignore
        this.accommodationData =  dd.accommodations;
      });
    });
  }
  openSearchDialog(data) {
    const dialogRef = this.dialog.open(SearchBalakComponent, {
      width: '1000Px',
      data: {
        accommodation_info: data,
      }
    });

    dialogRef.afterClosed().subscribe(d => {
      this.accomodationService.getAllAccommodation().subscribe(dd => {
        // @ts-ignore
        this.accommodationData =  dd.accommodations;
      });
    });
  }
  openPrintDialog(data) {
    const dialogRef = this.dialog.open(AccommodationAssignDialogComponent, {
      width: '1000Px',
      data: {
        accommodation_info: data,
        showActionButtons: false
      }
    });

    dialogRef.afterClosed().subscribe(d => {
      this.accomodationService.getAllAccommodation().subscribe(dd => {
        // @ts-ignore
        this.accommodationData =  dd.accommodations;
      });
    });
  }


}
