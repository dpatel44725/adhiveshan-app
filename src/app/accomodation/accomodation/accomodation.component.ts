import { Component, OnInit, AfterViewInit } from '@angular/core';
import {AccomodationService} from 'app/_services/accomodation.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-accomodation',
  templateUrl: './accomodation.component.html',
  styleUrls: ['./accomodation.component.css']
})
export class AccomodationComponent implements OnInit {
  roomId: any;
  accomodation: any;
  table: any;
  balakInfos: any;
  keyGivento: string;
  checkOut: string;
  constructor(private accomodationService: AccomodationService) { }

  ngOnInit() {
    this.accomodation = {};
    this.balakInfos = [];
  }

  searchRoom(roomId: string) {
    this.accomodationService.getRoomByRoomId(roomId.toUpperCase()).subscribe(data => {
      console.log(data.accomodation_info);

      this.accomodation = data.accomodation_info;
      this.checkOut = this.accomodation.acc_check_out;
      console.log(this.checkOut);
      data.balak_info.forEach(balak => {
        if (balak.bal_check_in !== null) {
          balak['checkedIn'] = true;
        } else {
          balak['checkedIn'] = false;
        }
        this.balakInfos.push(balak);
      })
      console.log(this.balakInfos);
    })
  }
  submitAccomodation() {
    if (!this.accomodation.acc_key_whom_to_given) {
      this.accomodation['acc_key_whom_to_given'] = this.keyGivento;
    }
    const balaks: string[] = [];
    this.balakInfos.forEach(balak => {
      if (balak.bal_check_in !== null) {
        balaks.push(balak.bal_id);
      }
    });
    console.log(this.checkOut);


    this.accomodationService.submitRoomInfo(this.accomodation.acc_title, balaks, this.checkOut,
        this.accomodation.acc_key_whom_to_given ? 'Yes' : 'No', this.accomodation.acc_key_whom_to_given).subscribe(data => {
        console.log(data);
        this.showSwal(data.status, data.message);
        this.accomodation = {};
        this.checkOut = undefined;
        this.balakInfos = [];

    })

  }
  selectDate(event, row) {
    row.bal_check_in = new Date();
    return row;
  }
  showSwal(status, msg) {
      swal({
        title: status,
        text: msg,
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-success',
        type: 'success'
      }).catch(swal.noop);
   }
  }
