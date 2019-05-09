import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as jspdf from 'jspdf';

import html2canvas from 'html2canvas'; 
import {AlertService, SpardhaService} from '../../_services';
import { Text } from '@angular/compiler/src/i18n/i18n_ast';
declare var $:any;


@Component({
    moduleId: module.id,
    selector: 'extended-table-cmp',
    templateUrl: 'toprankers.component.html'
})

export class TopRankers implements OnInit{
    loading = false;
    spardhaUniqueName:any =[];
    spardhaDate:any=[];
    spardhaTime:any=[];
    spardhaList: any = [];
    searchMarkesForm: FormGroup;
    submitted = false;
    selectedSaprdha:string="";
    selectedDate:string="";
    selectedTime:string="";
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
    Marks: any = [];
    topRangegroup: any = ['10', '20', '30', '40', '50']
    minMaxRange:any = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100']
    display = 'none'; //default Variable
    markReqObj = {
        top_record: 0,
        min_marks: 0,
        max_marks: 0,
        spardha_name:''


    }
    
    constructor(
        private router: Router,
        private spardhaservice: SpardhaService,
        private alertService: AlertService,
        private modalService: NgbModal,
        private formBuilder: FormBuilder
    ) {
        
    }
    @ViewChild('contentToConvert') contentToConvert: ElementRef;
    ngOnInit() {
        this.searchMarkesForm = new FormGroup({
            minMarks: new FormControl('', [Validators.required, Validators.min(3), Validators.max(100) ] ),
            maxMarks: new FormControl('', [Validators.required, Validators.min(3), Validators.max(100)])
            
        });

        //this.searchMarkesForm.controls['minMarks'].valueChanges.subscribe(value => {
        //    console.log(value);
        //});
       
        //this.spardhaservice.getUniqueSaprdhaName()
        //     .pipe()
        //     .subscribe(
        //         data => {
        //             console.log(data)
        //             this.spardhaUniqueName=data;
        //             console.log(this.spardhaUniqueName.spardhas)
        //            /// this.router.navigateByUrl('/');
        //         },
        //         error => {
        //             this.alertService.error(error);
        //             this.loading = false;
        //         });
    }
    get f() { return this.searchMarkesForm.controls; };
    get minMarks() {
        return this.searchMarkesForm.get('minMarks') as FormControl;
    }

    get maxMarks() {
        return this.searchMarkesForm.get('maxMarks') as FormControl;
    }
    
    _getSpardhaDate(spardhasname){
        this.selectedSaprdha=spardhasname;
        //this.spardhaservice.getSpardhaDate(spardhasname)
        //     .pipe()
        //     .subscribe(
        //         data => {
        //             console.log(data)
        //             this.spardhaDate=data;
        //             console.log(this.spardhaDate.dates)
        //            /// this.router.navigateByUrl('/');
        //         },
        //         error => {
        //             this.alertService.error(error);
        //             this.loading = false;
        //         });
    }
   
    onSubmit() {
        this.submitted = true;
        let minMarkesValue = this.searchMarkesForm.controls['minMarks'].value;
        let maxMarkesValue = this.searchMarkesForm.controls['maxMarks'].value;
        console.log(this.searchMarkesForm.controls['minMarks'].value)
        // stop here if form is invalid

        if (minMarkesValue > maxMarkesValue) {
            this.maxMarks.setErrors({ 'incorrect': true });
            
        }
        /// backend call
        this.Marks = [
            {
                "mark_id": "2",
                "mark_bal_id": "2212",
                "mark_spardha": "1",
                "mark_marks": "80",
                "mark_adhivation_type": "Semi",
                "mark_selected4final": "No",
                "mark_remark": null,
                "slot_spardha": "Pravachan",
                "slot_date": "2019-05-01",
                "slot_from_time": "12:10:00",
                "slot_to_time": "14:10:00",
                "slot_place": "Vidhyamandir School",
                "slot_room": "1",
                "bal_surname": "Patel",
                "bal_name": "Akshar",
                "bal_father": "Dineshbhai",
                "bal_phone": "9428518750"
            },
            {
                "mark_id": "1",
                "mark_bal_id": "2211",
                "mark_spardha": "1",
                "mark_marks": "50",
                "mark_adhivation_type": "Semi",
                "mark_selected4final": "No",
                "mark_remark": null,
                "slot_spardha": "Pravachan",
                "slot_date": "2019-05-01",
                "slot_from_time": "12:10:00",
                "slot_to_time": "14:10:00",
                "slot_place": "Vidhyamandir School",
                "slot_room": "1",
                "bal_surname": "Jethva",
                "bal_name": "Saral",
                "bal_father": "Harikrishnabhai",
                "bal_phone": "9998816300"
            }
        ]
        
        
        if (this.searchMarkesForm.invalid) {
            return;
        }

        
    }
    
    ngAfterViewInit(){
        // Init Tooltips
        $('[rel="tooltip"]').tooltip();
    }
}
