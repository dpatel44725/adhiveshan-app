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
            slot_id: '',
            slot_spardha: '',
            slot_date: '',
            slot_from_time: '',
            slot_to_time: '',
            slot_place: '',
            slot_room: '',
            slot_nirnayak_1: '',
            slot_nirnayak_2: "Devesh",
            slot_marks_verified: '',
            slot_marks_verified_by: '',
            slot_marks_submitted: ''
        },
        spardha_balaks: []
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
                   this.spardhaBalakList = data;
                    if (this.spardhaBalakList.spardha_info.slot_marks_submitted="Yes") {
                        this.showSave = true;

                    }
                    this.display = 'block';
                    console.log(this.spardhaBalakList)
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    saveMarks() {
        const submitMarks:any={};
        submitMarks.spardha_id = this.spardhaBalakList.spardha_info.slot_id;
        submitMarks.marks = {}

        for (let i = 0; i < this.spardhaBalakList.spardha_balaks.length; i++) {
            if (this.spardhaBalakList.spardha_balaks[i].mark_marks > 0 && this.spardhaBalakList.spardha_balaks[i].mark_marks < 101) {
                submitMarks.marks[this.spardhaBalakList.spardha_balaks[i].bal_id]=this.spardhaBalakList.spardha_balaks[i].mark_marks;
            }
        }
        console.log(submitMarks)
        this.spardhaservice.submitSpardhaBalakMarks(submitMarks)
            .pipe()
            .subscribe(
                data => {
                   this.router.navigateByUrl('/spardha');
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    ngAfterViewInit() {
        // Init Tooltips
        $('[rel="tooltip"]').tooltip();
    }
}
