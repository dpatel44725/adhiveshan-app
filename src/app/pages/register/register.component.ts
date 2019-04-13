import {Component, OnInit, ElementRef, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertService, AuthenticationService, UserService} from '../../_services';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'register-cmp',
    templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit, OnDestroy {
  focus;
  focus1;
  focus2;
    test: Date = new Date();
    registerForm: FormGroup;
    private toggleButton;
    private sidebarVisible: boolean;
    private nativeElement: Node;
    loading = false;
    submitted = false;

    constructor(private element: ElementRef,
                private formBuilder: FormBuilder,
                private router: Router,
                private authenticationService: AuthenticationService,
                private userService: UserService,
                private alertService: AlertService) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }
    checkFullPageBackgroundImage() {
        const $page = $('.full-page');
        const image_src = $page.data('image');
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('register-page');
        if (image_src !== undefined) {
            const image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
            $page.append(image_container);
        }
    };

    ngOnInit() {
        this.checkFullPageBackgroundImage();

        this.registerForm = new FormGroup({
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            username: new FormControl('', Validators.required),
            password: new FormControl('', [Validators.required, Validators.minLength(6)])
        });

        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

        setTimeout(function() {
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700)
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    ngOnDestroy() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('register-page');
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
    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe()
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
