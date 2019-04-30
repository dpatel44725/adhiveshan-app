import { Component, OnInit, AfterViewInit } from '@angular/core';
import {AccomodationService} from 'app/_services/accomodation.service';

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
  constructor(private accomodationService: AccomodationService) { }

  ngOnInit() {
    this.accomodation = {};
    this.balakInfos = [];
  }

  searchRoom(roomId:string){
    this.accomodationService.getRoomByRoomId(roomId.toUpperCase()).subscribe(data => {
      console.log(data.accomodation_info);
      this.accomodation = data.accomodation_info;
      this.balakInfos =  data.balak_info;
    })
  }
  submitAccomodation(){
    if(!this.accomodation.acc_key_whom_to_given){
      this.accomodation['acc_key_whom_to_given'] = this.keyGivento;
    }
    console.log(this.accomodation);
    console.log(this.balakInfos);
  }
  selectDate(event,row){
    row.bal_check_in = new Date();
    return row;
  }
}
