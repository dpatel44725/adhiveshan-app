import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {AccomodationService} from '../../_services/accomodation.service';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';

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
  showActionButtons = true;
  @Output()
  submitForm: EventEmitter<any> = new EventEmitter<any>();

  constructor(public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any, private accomodationService: AccomodationService) { }

  ngOnInit() {
   this.accomodation = this.data.accommodation_info;
   this.showActionButtons = this.data.showActionButtons;
    this.accomodationService.getAllBalaksAssignedToRoom(this.data.accommodation_info.acc_id).subscribe(data => {
      // @ts-ignore
      this.balaks = data.accommodation_balaks;
    });
    this.cols = [
      { field: 'bal_id', header: 'id', show: true, width: 100 },
      // { field: 'bal_surname', header: 'Surname', show: true },
      { field: 'bal_name', header: 'Name', show: true, width: 300  },
      // { field: 'bal_father', header: 'Father', show: true  },
      { field: 'bal_grp_id', header: 'Group Id', show: true, width: 100   },
      { field: '', header: 'Action', show: this.showActionButtons, width: 100  }
    ];
  }

  searchGroup(groupId) {
    console.log(groupId);
  }

  removeBalak(rowData) {
      this.accomodationService.addRemoveBalakFromRoom(this.data.accommodation_info.acc_id, rowData.bal_id, 'remove').subscribe(data => {
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

  captureScreen() {
  this.showActionButtons = false;
    const data = document.getElementById('printContent');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save(this.accomodation.acc_room_no + '_Detail.pdf');

    });
  }
}
