import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SecurityService} from '../common/service/security.service';
import {AppService} from '../app.service';
import {MsgService} from '../common/service/msg.service';
import {BikeService} from "../common/service/bike.service";
import {BikeDTO, BikeStationDTO} from "../generated/dto";
import {BikeStationService} from "../common/service/bike-station.service";
import {BlockedBikesService} from "../common/service/blocked-bikes.service";

@Component({
    selector: 'app-stations',
    templateUrl: './blockedBikes.component.html',
    styleUrls: ['./blockedBikes.component.scss']
})
export class BlockedBikesComponent implements OnInit {

    constructor(private securityService: SecurityService,
                private app: AppService,
                private router: Router,
                private msgService: MsgService,
                private blockedBikesService: BlockedBikesService) {
    }

    loadedBlockedBikes: BikeDTO[];
    blockedBikes: BikeDTO[];
    selectedBike: BikeDTO;
    filter: string = "";
    blockInput: string = "";

    ngOnInit(): void {
        this.blockedBikesService.getBlockedBikes()
            .subscribe(stations => {
                this.loadedBlockedBikes = stations.bikes;
                this.blockedBikes = stations.bikes;
            })
    }

    onFilterInput(value: string) {
        this.filter = value;
        this.blockedBikes = this.loadedBlockedBikes.filter(s => s.station.name.includes(value) || ("" + s.id).startsWith(value))
    }

    blockBike() {
        this.blockedBikesService.blockBike(+this.blockInput).subscribe(bike => {
            this.blockInput = "";
            this.loadedBlockedBikes.push(bike);
            this.blockedBikes = this.loadedBlockedBikes
                .filter(s => s.station.name.includes(this.filter) || ("" + s.id).startsWith(this.filter));
        })
    }

    onBlockInput(value) {
        this.blockInput = value;
    }

    onUnblockClick(s) {
        this.selectedBike = s;
    }

    onNoClick() {
        this.selectedBike = null;
    }

    onYesClick() {
        this.blockedBikesService.unblockBike(this.selectedBike.id)
            .subscribe(() => {
                this.loadedBlockedBikes = this.loadedBlockedBikes.filter(b => b.id != this.selectedBike.id);
                this.blockedBikes =  this.blockedBikes.filter(b => b.id != this.selectedBike.id);
                this.selectedBike = null;
            })
    }
}
