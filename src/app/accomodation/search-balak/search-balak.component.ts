import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {AccomodationService} from '../../_services/accomodation.service';
import swal from 'sweetalert2';

declare var require: any
declare var $: any;

@Component({
  selector: 'app-search-balak',
  templateUrl: './search-balak.component.html',
  styleUrls: ['./search-balak.component.css']
})
export class SearchBalakComponent implements OnInit {

  type: any;
  id: any;
  cols: any;
  balaks: any;
  roomInfo: any;
  constructor(public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any, private accomodationService: AccomodationService) { }

  ngOnInit() {
    this.roomInfo = this.data.accommodation_info;

    this.balaks = [];
    if ($('.selectpicker').length !== 0) {
      $('.selectpicker').selectpicker({
        iconBase: 'nc-icon',
        tickIcon: 'nc-check-2'
      });
    }

    this.cols = [
      { field: 'bal_id', header: 'id' },
      { field: 'bal_surname', header: 'Surname' },
      { field: 'bal_name', header: 'Name' },
      { field: 'bal_father', header: 'Father' },
      { field: '', header: 'Action'}
    ];
  }

  searchBalak() {
    if (this.type === 'balak') {
        this.accomodationService.getBalakByBalakId(this.id).subscribe(data => {
          // @ts-ignore
          console.log(data.balak_info);
          // @ts-ignore
          this.balaks.push(data.balak_info);
        });
    } else if (this.type === 'group') {
        this.accomodationService.getBalaksByGroupId(this.id).subscribe( data => {
          // @ts-ignore
          console.log(data.group_info.balak_info);
          this.balaks = [];
          // @ts-ignore
          this.balaks = data.group_info.balak_info;
        });
    }
  }

  addBalak(data) {
    // console.log(this.roomInfo);
    // const maxCap = this.roomInfo.acc_max_cap;
    // const allocated = this.roomInfo.total_allocated;

    // if (maxCap === allocated) {
    //   swal({
    //     title: 'You can not add more balaks to room',
    //     text: 'Max capacity has been achieved',
    //     timer: 2000,
    //     showConfirmButton: false
    //   }).catch(swal.noop)
    //   return;
    // } else if ( maxCap > allocated) {
      this.accomodationService.addRemoveBalakFromRoom(this.roomInfo.acc_id, data.bal_id, 'assign').subscribe(d => {
        console.log(d);
        // @ts-ignore
        if (d.status === 'pass') {
          swal({
            title: 'Balak has been added to room ' + this.roomInfo.acc_title,
            text: '',
            timer: 2000,
            showConfirmButton: false
          }).catch(swal.noop);
          this.accomodationService.getRoomByRoomId(this.roomInfo.acc_title).subscribe(room => {
            this.roomInfo = room.accomodation_info;
          });
          this.balaks.forEach((bal, i) => {
            if (bal.bal_id === data.bal_id) {
              this.balaks.splice(i, 1);
            }
          });
        }
      });

  }

}
