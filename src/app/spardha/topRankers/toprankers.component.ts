import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
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
    verified = false;
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
    };
    
    topRankMarks: any = [];
    topRangegroup: any = ['10', '20', '30', '40', '50']
    minMaxRange:any = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100']
    display = 'none'; //default Variable
    sections: FormArray;
    
    items: FormArray;
    
    markReqObj = {
        top_record: 0,
        min_marks: 0,
        max_marks: 0,
        spardha_name: '',
        location_type:''


    }
    currentUser: any;
    
    constructor(
        private router: Router,
        private spardhaservice: SpardhaService,
        private alertService: AlertService,
        private modalService: NgbModal,
        private fb: FormBuilder,
        
    ) {
        

    }
    @ViewChild('contentToConvert') contentToConvert: ElementRef;
    ngOnInit() {
        this.searchMarkesForm = this.fb.group({
            //minMarks: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100) ] ),
            //maxMarks: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
            sections: this.fb.array([])

        });

        //this.searchMarkesForm.controls['minMarks'].valueChanges.subscribe(value => {
        //    console.log(value);
        //});
       // let tempdata: any = {
       //     "satrus": "pass",
       //     "spardhas": [
       //         {
       //              "slot_spardha":"Pravachan"
       //         },
       //     {
       //             "slot_spardha": "Mukh Path"
       //         },
       //         {
       //             "slot_spardha": "Vachnamrut"
       //         },

       //         ]
       //    };
       //this.setSectionsWithData(tempdata);
        
        this.spardhaservice.getUniqueSaprdhaName()
             .pipe()
             .subscribe(
                 data => {
                     console.log(data)
                     //this.spardhaUniqueName = data;
                     this.setSectionsWithData(data);


                     console.log(this.spardhaUniqueName.spardhas)
                    /// this.router.navigateByUrl('/');
                 },
                 error => {
                     this.alertService.error(error);
                     this.loading = false;
                 });
    }
    createSections(): FormGroup  {
        return this.fb.group({
            spardhaname: new FormControl(''),
            markeRange: new FormControl(''),
            minMarks: new FormControl(''),
            maxMarks: new FormControl(''),
            locationType:new FormControl('')
        });
    }
    setSectionsWithData(data) {
        this.spardhaList = data.spardhas;
        this.spardhaUniqueName = [];
        this.spardhaList.forEach((saprdhaName, index) => {
            this.sections = this.searchMarkesForm.get('sections') as FormArray;
            this.spardhaUniqueName.push({ id: index, sectionName: saprdhaName.slot_spardha, marks:[] });
            this.sections.push(this.createSections())
            
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
    selectRomove(_mark_id,actionName, sectionIndex){
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
                     let updateItem = this.spardhaUniqueName[sectionIndex].marks.marks.find(mark => mark.mark_id === _mark_id);
                     let _index = this.spardhaUniqueName[sectionIndex].marks.indexOf(updateItem);
                     this.spardhaUniqueName[sectionIndex].marks[_index].mark_selected4final = editField;
                     //this.spardhaDate=data;
                     //console.log(this.spardhaDate.dates)
                    /// this.router.navigateByUrl('/');
                 },
                 error => {
                     this.alertService.error(error);
                     this.loading = false;
                 });
    }
    onSubmit(index) {
        let telp = this.searchMarkesForm.get('sections') as FormArray;
        let minMarkesValue = telp.controls[index]['controls'].minMarks.value;
        let maxMarkesValue = telp.controls[index]['controls'].maxMarks.value
       // console.log(this.searchMarkesForm.controls['minMarks'].value)
        // stop here if form is invalid

        if (minMarkesValue > maxMarkesValue) {
            //telp.controls[index]['controls'].maxMarks.setErrors({ 'incorrect': true });
            return;
        }
        /// backend call
        
        
        
        if (telp.controls[index]['controls'].spardhaname.value === "" ) {
            return;
        }
        this.markReqObj.min_marks = minMarkesValue;
        this.markReqObj.max_marks = maxMarkesValue;
        this.markReqObj.spardha_name = telp.controls[index]['controls'].spardhaname.value;
        this.markReqObj.top_record = telp.controls[index]['controls'].markeRange.value;
        this.markReqObj.location_type = telp.controls[index]['controls'].locationType.value;
        
        
        this.spardhaservice.getSpardhaMarks(this.markReqObj)
            .pipe()
            .subscribe(
                data => {
                    console.log(data)
                    this.topRankMarks = data;
                    this.spardhaUniqueName[index].marks = this.topRankMarks.marks;
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
