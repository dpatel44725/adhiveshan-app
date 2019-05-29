import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as jspdf from 'jspdf';
import { environment } from '../../../environments/environment';


import html2canvas from 'html2canvas'; 
import { AlertService, SpardhaService } from '../../_services';

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
selectedSaprdha:string="0";
selectedDate:string="0";
    selectedTime: string = "0";
    location_type: string ="Chhatralay"
    closeResult: string;
    spardhaBalakList: any = {
        spardha_info: {
            slot_id: "",
            slot_spardha: "",
            slot_date: "",
            slot_from_time: "",
            slot_to_time: "",
            slot_place: "",
            slot_room: "",
            slot_nirnayak_1: "",
            slot_nirnayak_2: "",
            slot_marks_verified: "",
            slot_marks_verified_by: "",
            slot_marks_submitted: ""
        }
    }
    display = 'none'; //default Variable
    
    
constructor(
                private router: Router,
                private spardhaservice: SpardhaService,
                private alertService: AlertService,
    private modalService: NgbModal,
    
                ) {
    
    }
    @ViewChild('contentToConvert') contentToConvert: ElementRef;
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
    _setRegionType(selected_location_type) {
        this.location_type = selected_location_type;
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
        //this.spardhaservice.getSpardhaList(this.selectedSaprdha ,this.selectedDate, this.selectedTime)
        //     .pipe()
        //     .subscribe(
        //         data => {
        //             console.log(data)
        //             this.spardhaList=data;
        //             console.log(this.spardhaDate.times)
                    
        //         },
        //         error => {
        //             this.alertService.error(error);
        //             this.loading = false;
        //         });
    }
    searchBalakList() {
        if (this.selectedSaprdha === "0" || this.selectedDate === "0" || this.selectedTime === "0") {
            console.log("Select")
            return false;
        }
        else {
            this.spardhaservice.getSpardhaList(this.selectedSaprdha, this.selectedDate, this.selectedTime, this.location_type)
                .pipe()
                .subscribe(
                    data => {
                        console.log(data)
                        this.spardhaList = data;
                        console.log(this.spardhaDate.times)
                        /// this.router.navigateByUrl('/');
                    },
                    error => {
                        this.alertService.error(error);
                        this.loading = false;
                    });
        }
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
         let pdfDownloadUrl = environment.pdfUrl+'/home/download_spardha_marsk_pdf/'+slot_id;
         console.log('pdfDownloadUrl',pdfDownloadUrl);
//         window.location = pdfDownloadUrl;
         window.open(pdfDownloadUrl,'_blank');
         /*this.spardhaservice.getSpardhaBalakList(slot_id)
             .pipe()
             .subscribe(
                 data => {
                     console.log(data)
                     this.spardhaBalakList = data;
                     this.display = 'block';
                     console.log(this.spardhaBalakList)
                     setTimeout(function () {
                         this.captureScreen();
                     }.bind(this), 2000);
                     /// this.router.navigateByUrl('/');
                 },
                 error => {
                     this.alertService.error(error);
                     this.loading = false;
                 });
	*/
     //Set block css
    }
    downloadPdf() {
        
        const doc = new jspdf();
        const specialElementHandlers = {
            '#editor': function (element, renderer) {
                return true;
            }
        };

        const content = this.contentToConvert.nativeElement;

        doc.fromHTML(content.innerHTML, 15, 15, {
            'width': 190,
            'elementHandlers': specialElementHandlers
        });

        doc.save('asdfghj' + '.pdf');
    }
 captureScreen() {
     var data = document.getElementById('reportContent');
     this.display = 'none';
        html2canvas(data).then(canvas => {
            // Few necessary setting options  
            var imgWidth = 208;
            var pageHeight = 295;
            var imgHeight = canvas.height * imgWidth / canvas.width;
            var heightLeft = imgHeight;

            const contentDataURL = canvas.toDataURL('image/png')
            let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
            var position = 0;
            pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
            pdf.save(this.spardhaBalakList.spardha_info.slot_spardha + 'Detail.pdf'); 

        });
    }
 closeModalDialog(){
  this.display='none'; //set none css after close dialog
 }
    ngAfterViewInit(){
        // Init Tooltips
        $('[rel="tooltip"]').tooltip();
    }
}
