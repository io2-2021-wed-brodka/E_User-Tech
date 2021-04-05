import {Component, OnInit} from '@angular/core';
import {SecurityService} from '../common/service/security.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthGuard} from "../common/guards/auth-guard";

@Component({
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']

})
export class RegisterComponent implements OnInit {

    credentials = {username: '', password: ''};
    message: string;
    sessionExpired: boolean;

    constructor(private securityService: SecurityService,
                private route: ActivatedRoute,
                private router: Router,
                private authGuard: AuthGuard) {
    }

    ngOnInit() {
    }


}
