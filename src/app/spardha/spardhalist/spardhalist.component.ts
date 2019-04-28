import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {AlertService, SpardhaService} from '../../_services';
declare var $:any;


@Component({
    moduleId: module.id,
    selector: 'extended-table-cmp',
    templateUrl: 'spardhalist.component.html'
})

export class SpardhalistComponent implements OnInit{
loading = false;
spardhaUniqueName:any =[];
spardhaDate:any=[];
spardhaTime:any=[];
spardhaList:any=[];
selectedSaprdha:string="";
selectedDate:string="";
selectedTime:string="";
closeResult: string;
 display='none'; //default Variable
constructor(
                private router: Router,
                private spardhaservice: SpardhaService,
                private alertService: AlertService,
                private modalService: NgbModal
                ) {
        
    }
    ngOnInit(){
        this.spardhaservice.getUniqueSaprdhaName()
             .pipe()
             .subscribe(
                 data => {
                     console.log(data)
                     this.spardhaUniqueName=data;
                     console.log(this.spardhaUniqueName.spardhas)
                    /// this.router.navigateByUrl('/');
                 },
                 error => {
                     this.alertService.error(error);
                     this.loading = false;
                 });
    }
    _getSpardhaDate(spardhasname){
        this.selectedSaprdha=spardhasname;
        this.spardhaservice.getSpardhaDate(spardhasname)
             .pipe()
             .subscribe(
                 data => {
                     console.log(data)
                     this.spardhaDate=data;
                     console.log(this.spardhaDate.dates)
                    /// this.router.navigateByUrl('/');
                 },
                 error => {
                     this.alertService.error(error);
                     this.loading = false;
                 });
    }
    _getSpardhaTime(spardhadate){
        this.selectedDate=spardhadate;
        this.spardhaservice.getSpardhaTime(this.selectedSaprdha ,this.selectedDate)
             .pipe()
             .subscribe(
                 data => {
                     console.log(data)
                     this.spardhaTime=data;
                     console.log(this.spardhaDate.times)
                    /// this.router.navigateByUrl('/');
                 },
                 error => {
                     this.alertService.error(error);
                     this.loading = false;
                 });
    }
_getSpardhaList(spardhatime){
        this.selectedTime=spardhatime;
        this.spardhaservice.getSpardhaList(this.selectedSaprdha ,this.selectedDate, this.selectedTime)
             .pipe()
             .subscribe(
                 data => {
                     console.log(data)
                     this.spardhaList=data;
                     console.log(this.spardhaDate.times)
                    /// this.router.navigateByUrl('/');
                 },
                 error => {
                     this.alertService.error(error);
                     this.loading = false;
                 });
    }
    open(content, slot_id) {
        console.log(slot_id)
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    downloadPDF(){
        alert('download')
    }
    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
        } else {
        return  `with: ${reason}`;
        }
    }
     openModalDialog(slot_id){
         console.log(slot_id)
    this.display='block'; //Set block css
 }

 closeModalDialog(){
  this.display='none'; //set none css after close dialog
 }
    ngAfterViewInit(){
        // Init Tooltips
        $('[rel="tooltip"]').tooltip();
    }
}
