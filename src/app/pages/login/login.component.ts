import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertService, AuthenticationService} from '../../_services';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'app-login-cmp',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  focus;
  focus1;
  focus2;
    test: Date = new Date();
    private toggleButton;
    private sidebarVisible: boolean;
    private nativeElement: Node;
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    loginError:boolean =false;

    constructor(private element: ElementRef,
                private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private authenticationService: AuthenticationService,
                private alertService: AlertService) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }
     checkFullPageBackgroundImage() {
        const $page = $('.full-page');
        const image_src = $page.data('image');

        if (image_src !== undefined) {
            const image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>';
            $page.append(image_container);
        }
    };

    ngOnInit() {
        // LoginComponent.checkFullPageBackgroundImage();
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

        setTimeout(function() {
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700);
        this.loginForm = new FormGroup({
            mobile: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
    }
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        //this.router.navigateByUrl('/');
         this.authenticationService.login(this.f.mobile.value, this.f.password.value)
             .pipe()
             .subscribe(
                 data => {
                   if(data.status == 'pass'){
                       console.log('pass');
                       this.router.navigateByUrl('/');
                   }else{
                     console.log('fail');
                     this.alertService.error(data.message);
                     this.loading = false;
                     this.loginError=true;
                   }
                 },
                 error => {
                     this.alertService.error(error);
                     this.loading = false;
                 });
    }
    sidebarToggle() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        const sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if (this.sidebarVisible === false) {
            setTimeout(function() {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }
}
