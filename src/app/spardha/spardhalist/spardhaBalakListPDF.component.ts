import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as jspdf from 'jspdf';

import html2canvas from 'html2canvas'; 
import { AlertService, SpardhaService, AuthenticationService } from '../../_services';
declare var $: any;
import { Role } from '../../_models';

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
    apiCall: any;
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
            slot_nirnayak_2: '',
            slot_marks_verified: '',
            slot_marks_verified_by: '',
            slot_marks_submitted: ''
        },
        spardha_balaks: []
    }
    showSave: boolean = true;
    showSubmited: boolean = false;
    showVerifiedBy: boolean = false;
    showDownload: boolean = false;
    display = 'none'; //default Variable
    authenticationService: AuthenticationService;
    currentUser: any;
    constructor(
        private router: Router,
        private spardhaservice: SpardhaService,
        private alertService: AlertService,
        private modalService: NgbModal,
        private _route: ActivatedRoute,
        authenticationService: AuthenticationService
        
    ) {
        this.authenticationService = authenticationService;
        this.currentUser = authenticationService.currentUserValue;
        if (this.currentUser.user_role === Role.SUPER_ADMIN) {
            this.showSubmited = true;
            this.showSave = true;
        }
        else if (this.currentUser.user_role === Role.MARKSHEET_MANAGER || this.currentUser.user_role === Role.SUPER_ADMIN) {
            this.showSave = true;
        }
        else if (this.currentUser.user_role === Role.VERIFICATION_MANAGER || this.currentUser.user_role === Role.SUPER_ADMIN) {
            this.showVerifiedBy = true;
            this.showSave = true;
        }
    }
    ngOnInit() {
        const slot_id = +this._route.snapshot.paramMap.get('id');
        console.log(slot_id)
         this.spardhaservice.getSpardhaBalakList(slot_id)
            .pipe()
            .subscribe(
                data => {
                   this.spardhaBalakList = data;
                    if (this.spardhaBalakList.spardha_info.slot_marks_verified == "Yes" && this.currentUser.user_role !== Role.MARKSHEET_MANAGER) {
                        this.showSave = false;
                        this.showVerifiedBy = false;

                    }
                    //if (this.spardhaBalakList.spardha_info.slot_marks_verified == "Yes") {
                    //    this.showSubmited = true;
                    //    this.showSave = false;
                    //    this.showVerifiedBy = true;
                    //}
                    //if (this.spardhaBalakList.spardha_info.slot_marks_verified == "Yes" && this.spardhaBalakList.spardha_info.slot_marks_verified == "Yes") {
                    //    this.showSubmited = false;
                    //    this.showSave = false;
                    //    this.showVerifiedBy = true;
                    //}
                    this.display = 'block';
                    console.log(this.spardhaBalakList)
                    this.showDownload = true;
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
                this.apiCall = data;
                  // this.router.navigateByUrl('/spardha');
                this.alertService.success(this.apiCall.message);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
    submitMarks() {

    }
    verifiedMarks() {

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
    ngAfterViewInit() {
        // Init Tooltips
        $('[rel="tooltip"]').tooltip();
    }
}
