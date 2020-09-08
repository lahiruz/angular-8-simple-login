import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '@/_services';

import './welcome.component.scss';

@Component({ 
    templateUrl: 'welcome.component.html'
})
export class WelcomeComponent implements OnInit {
    welcomeForm: FormGroup;
    loading = false;
    submitted = false;
    invalidUserName = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        const {username, password} = this.authenticationService.currentUserValue || {};
        if (username && !password) {
            this.router.navigate(['/welcome']);
        } else {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.welcomeForm = this.formBuilder.group({
            username: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.welcomeForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        // this.alertService.clear();

        // stop here if form is invalid
        if (this.welcomeForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.verifyUserName(this.f.username.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/login']);
                },
                error => {
                    this.invalidUserName = true;
                    // this.alertService.error(error);
                    this.loading = false;
                });
    }
}
