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
    topRankMarks: any = [];
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
            minMarks: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100) ] ),
            maxMarks: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)])
            
        });

        this.searchMarkesForm.controls['minMarks'].valueChanges.subscribe(value => {
            console.log(value);
        });
       
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
    get f() { return this.searchMarkesForm.controls; };
    get minMarks() {
        return this.searchMarkesForm.get('minMarks') as FormControl;
    }

    get maxMarks() {
        return this.searchMarkesForm.get('maxMarks') as FormControl;
    }
    _setSpardhaName(spardhaName) {
        this.markReqObj.spardha_name = spardhaName;
    }
    _setTop_record(top_record) {
        this.markReqObj.top_record = top_record;
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
    showAdd(selectedfor) {
        if (selectedfor === 'No') {
            return true;
        }
        else return false;
    }
    showRemove(selectedfor) {
        if (selectedfor === 'Yes') {
            return true;
        }
        else return false;
    }
    selectRomove(_mark_id,actionName, index){
        let select_remove = {
            mark_id: _mark_id,
            action: actionName
        }
        let editField = "";
        if (actionName === 'select') {
            editField = 'Yes'
        }
        else {
            editField = 'No'
        }
        this.spardhaservice.select_remove_for_final_adhivation(select_remove)
             .pipe()
             .subscribe(
                 data => {
                     console.log(data)
                     let updateItem = this.topRankMarks.marks.find(mark => mark.mark_id === _mark_id);
                     let _index = this.topRankMarks.marks.indexOf(updateItem);
                     this.topRankMarks.marks[_index].mark_selected4final = editField;
                     //this.spardhaDate=data;
                     //console.log(this.spardhaDate.dates)
                    /// this.router.navigateByUrl('/');
                 },
                 error => {
                     this.alertService.error(error);
                     this.loading = false;
                 });
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
        
        
        
        if (this.searchMarkesForm.invalid) {
            return;
        }
        this.markReqObj.min_marks = minMarkesValue;
        this.markReqObj.max_marks = maxMarkesValue;
        this.spardhaservice.getSpardhaMarks(this.markReqObj)
            .pipe()
            .subscribe(
                data => {
                    console.log(data)
                    this.topRankMarks = data;
                    console.log(this.spardhaUniqueName.spardhas)
                    /// this.router.navigateByUrl('/');
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
        
    }
    
    ngAfterViewInit(){
        // Init Tooltips
        $('[rel="tooltip"]').tooltip();
    }
}
