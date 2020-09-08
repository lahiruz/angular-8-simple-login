import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';

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