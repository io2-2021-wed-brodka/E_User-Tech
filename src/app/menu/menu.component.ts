import {Component, OnInit} from '@angular/core';
import {SecurityService} from  "../common/service/security.service"

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    constructor(private securityService: SecurityService) {
    }

    techLinkAllowed = false;

    ngOnInit() {
        if(this.securityService.role == "tech" || this.securityService.role == "admin") {
            console.log("XD")
            this.techLinkAllowed = true;
        }
    }

}
