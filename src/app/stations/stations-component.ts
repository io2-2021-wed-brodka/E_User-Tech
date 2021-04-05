import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SecurityService} from '../common/service/security.service';
import {AppService} from '../app.service';
import {MsgService} from '../common/service/msg.service';
import {BikeStationService} from "../common/service/bike-station.service";
import {BikeStationDTO} from "../generated/dto";

@Component({
    selector: 'app-stations',
    templateUrl: './stations.component.html',
    styleUrls: ['./stations.component.scss']
})
export class StationsComponent implements OnInit {

    stations: BikeStationDTO[] = [];

    constructor(private bikeStationService: BikeStationService) {
    }

    ngOnInit(): void {
        this.bikeStationService.getAllBikeStations().subscribe(stations => {
            this.stations = stations;
        })
    }

}
