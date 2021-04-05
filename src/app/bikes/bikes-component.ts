import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SecurityService} from '../common/service/security.service';
import {AppService} from '../app.service';
import {MsgService} from '../common/service/msg.service';

@Component({
    selector: 'app-bikes',
    templateUrl: './bikes.component.html',
    styleUrls: ['./bikes.component.scss']
})
export class BikesComponent implements OnInit {

    constructor(private securityService: SecurityService,
                private app: AppService,
                private router: Router,
                private msgService: MsgService) {
    }

    ngOnInit(): void {
    }

}
