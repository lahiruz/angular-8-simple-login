import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '@/_models';
import { AuthenticationService } from '@/_services';
import './home.component.scss';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    currentUser: User;
    users = [];

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/welcome']);
    }
}