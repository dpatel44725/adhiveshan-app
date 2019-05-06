import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as jspdf from 'jspdf';

import html2canvas from 'html2canvas'; 
import { AlertService, SpardhaService } from '../../_services';
declare var $: any;


@Component({
    moduleId: module.id,
    selector: 'extended-table-cmp',
    templateUrl: 'spardhaBalakListPDF.html'
})

export class SpardhaDetail implements OnInit {
    loading = false;
    selectedSaprdha: string = "";
    selectedDate: string = "";
    selectedTime: string = "";
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
            slot_marks_submitted: "No"
        },
        spardhas: []
    }
    showSave: boolean = false;
    display = 'none'; //default Variable
    constructor(
        private router: Router,
        private spardhaservice: SpardhaService,
        private alertService: AlertService,
        private modalService: NgbModal,
        private _route: ActivatedRoute
    ) {

    }
    ngOnInit() {
        const slot_id = +this._route.snapshot.paramMap.get('id');
        console.log(slot_id)
        this.spardhaservice.getSpardhaBalakList(slot_id)
            .pipe()
            .subscribe(
                data => {
                   /// console.log(data)
                    this.spardhaBalakList = data;
                    if (this.spardhaBalakList.spardha_info.slot_marks_submitted="Yes") {
                        this.showSave = true;
                  
                    }
                    this.display = 'block';
                    console.log(this.spardhaBalakList)
                    
                    
                    /// this.router.navigateByUrl('/');
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
    captureScreen() {
        var data = document.getElementById('reportContent');

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
            pdf.save(this.spardhaBalakList.spardha_info.slot_spardha +'Detail.pdf'); // Generated PDF   
        });
    }
    saveMarks() {
        var postMarks:any = {};
        postMarks.spardha_id = this.spardhaBalakList.spardha_info.slot_id;
        postMarks.marks = []
        var marks:any = {}
        for (let i = 0; i < this.spardhaBalakList.spardha_balaks.length; i++) {
            if (this.spardhaBalakList.spardha_balaks[i].mark_marks > 0 && this.spardhaBalakList.spardha_balaks[i].mark_marks < 101) {
               // postMarks.marks.push({ bal_id: this.spardhaBalakList.spardha_balaks[i].bal_id,marks: this.spardhaBalakList.spardha_balaks[i].mark_marks })
                marks[this.spardhaBalakList.spardha_balaks[i].bal_id,marks]=this.spardhaBalakList.spardha_balaks[i].mark_marks;
            }
        }
        console.log(postMarks)
    }
    
    
    
    
    
    
    ngAfterViewInit() {
        // Init Tooltips
        $('[rel="tooltip"]').tooltip();
    }
}
