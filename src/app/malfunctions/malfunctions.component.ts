import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SecurityService} from '../common/service/security.service';
import {AppService} from '../app.service';
import {MsgService} from '../common/service/msg.service';
import {BikeService} from "../common/service/bike.service";
import {BikeDTO, BikeStationDTO, MalfunctionDTO} from "../generated/dto";
import {BikeStationService} from "../common/service/bike-station.service";
import {MalfunctionService} from "../common/service/malfunction.service";

@Component({
    selector: 'app-stations',
    templateUrl: './malfunctions.component.html',
    styleUrls: ['./malfunctions.component.scss']
})
export class MalfunctionsComponent implements OnInit {

    constructor(private securityService: SecurityService,
                private app: AppService,
                private router: Router,
                private msgService: MsgService,
                private malfunctionService: MalfunctionService) {
    }

    loadedMalfunctions: MalfunctionDTO[];
    malfunctions: MalfunctionDTO[];
    filter: string;

    ngOnInit(): void {
        this.malfunctionService.getMalfunctions()
            .subscribe(malfunctions => {
                this.loadedMalfunctions = malfunctions;
                this.malfunctions = malfunctions;
            })
    }

    onFilterInput(value: string) {
        this.filter = value;
        this.malfunctions = this.loadedMalfunctions.filter(s => ("" + s.bikeId).startsWith(value))
    }

    onDeleteClick(m: MalfunctionDTO) {
        this.malfunctionService.deleteMalfunction(m.id)
            .subscribe(() => {
                this.loadedMalfunctions = this.loadedMalfunctions.filter(mal => mal != m);
                this.malfunctions = this.malfunctions.filter(mal => mal != m);
            })
    }
}
