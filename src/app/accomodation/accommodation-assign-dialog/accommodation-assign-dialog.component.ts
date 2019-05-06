import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {AccomodationService} from '../../_services/accomodation.service';

@Component({
  selector: 'app-accommodation-assign-dialog',
  templateUrl: './accommodation-assign-dialog.component.html',
  styleUrls: ['./accommodation-assign-dialog.component.css']
})
export class AccommodationAssignDialogComponent implements OnInit {

  accomodation: any = {};
  groupId: any;
  cols: any;
  balaks: any = [];
  @Output()
  submitForm: EventEmitter<any> = new EventEmitter<any>();

  constructor(public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any, private accomodationService: AccomodationService) { }

  ngOnInit() {
    this.accomodationService.getAllBalaksAssignedToRoom(this.data.accommodation_info.acc_id).subscribe(data => {
      // @ts-ignore
      this.balaks = data.accommodation_balaks;
    });
    this.cols = [
      { field: 'bal_id', header: 'id' },
      { field: 'bal_surname', header: 'Surname' },
      { field: 'bal_name', header: 'Name' },
      { field: 'bal_father', header: 'Father' },
      { field: 'bal_grp_id', header: 'Group Id' },
      { field: '', header: 'Action'}
    ];
  }

  searchGroup(groupId) {
    console.log(groupId);
  }

  removeBalak(rowData) {
      this.accomodationService.addRemoveBalakFromRoom(this.data.accommodation_info.acc_id, rowData.bal_id, 'remove').subscribe(data =>{
        console.log(data);
        // @ts-ignore
        if (data.status === 'pass') {
          this.balaks.forEach((bal, i) => {
            if (bal.bal_id === rowData.bal_id) {
              this.balaks.splice(i, 1);
            }
          });
         }
      });
  }
}
