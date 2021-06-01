import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SecurityService} from '../common/service/security.service';
import {AppService} from '../app.service';
import {MsgService} from '../common/service/msg.service';
import {BikeService} from "../common/service/bike.service";
import {BikeDTO, BikeStationDTO, ReservedBikeDTO} from "../generated/dto";
import {BikeStationService} from "../common/service/bike-station.service";
import {MalfunctionService} from "../common/service/malfunction.service";

@Component({
    selector: 'app-bikes',
    templateUrl: './bikes.component.html',
    styleUrls: ['./bikes.component.scss']
})
export class BikesComponent implements OnInit {

    constructor(private securityService: SecurityService,
                private app: AppService,
                private router: Router,
                private msgService: MsgService,
                private bikeService: BikeService,
                private malfunctionService: MalfunctionService,
                private bikeStationService: BikeStationService) {
    }

    bikes: BikeDTO[];
    reservations: ReservedBikeDTO[];
    selectedBike: BikeDTO;
    selectedReservation: ReservedBikeDTO;
    loadedStations: BikeStationDTO[];
    stations: BikeStationDTO[];
    selectedStation: BikeStationDTO;
    filter: string;
    action: string;
    reported = false;
    description = "";
    reportedMessage = false;

    ngOnInit(): void {
        this.bikeService.getRentedBikes().subscribe(bikes => {
            this.bikes = bikes;
        })
        this.bikeService.getReservedBikes().subscribe(reservations => {
            this.reservations = reservations.bikes;
        })

    }

    onReservationClick(reservation: ReservedBikeDTO) {
        if (this.selectedReservation == reservation) {
            this.selectedReservation = null;
            return;
        }
        this.selectedBike = null
        this.selectedReservation = reservation;
    }

    onBikeClick(bike: BikeDTO) {
        if (this.selectedBike == bike) {
            this.selectedBike = null;
            return;
        }
        this.selectedReservation = null;
        this.selectedBike = bike;
        if (!this.loadedStations) {
            this.loadStations();
        }
    }

    onFilterInput(value: string) {
        this.filter = value;
        this.stations = this.loadedStations.filter(s => s.name.includes(value) || ('' + s.id).startsWith(value));
    }

    loadStations() {
        this.bikeStationService.getAllBikeStations()
            .subscribe(stations => {
                this.loadedStations = stations;
                this.stations = stations;
            });
    }

    onStationClick(s: BikeStationDTO) {
        this.selectedStation = s;
    }

    onNoClick() {
        this.selectedStation = null;
        this.action = null;
        this.reported = false;
    }

    onYesClick() {
        this.bikeService.returnBike(this.selectedBike.id, this.selectedStation.id)
            .subscribe(() => {
                this.bikes = this.bikes.filter(b => b.id != this.selectedBike.id);
                this.selectedStation = null;
                this.selectedBike = null;
            });
    }

    displayDate(date: Date) : string {
        date = new Date(date);
        return ((date.getHours() > 9) ? date.getHours() : ('0' + date.getHours())) + ":" +
            ((date.getMinutes() > 9) ? date.getMinutes() : ('0' + date.getMinutes())) + ":" +
            ((date.getSeconds() > 9) ? date.getSeconds() : ('0' + date.getSeconds())) + " " +
            ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '.' +
            ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1)))
    }

    onCancelClick() {
        this.action = "cancel";
    }

    onRentClick() {
        this.action = "rent";
    }

    onYesCancelClick() {
        this.bikeService.cancelReservation(this.selectedReservation.id)
            .subscribe(() => {
                this.reservations = this.reservations.filter(r => r.id != this.selectedReservation.id);
                this.selectedReservation = null;
                this.action = null;
            })
    }

    onYesRentClick() {
        this.bikeService.rentBike(this.selectedReservation.id)
            .subscribe(() => {
                this.reservations = this.reservations.filter(r => r.id != this.selectedReservation.id);

                const newBike = new BikeDTO();
                newBike.id = this.selectedReservation.id;

                this.bikes.push(newBike)

                this.selectedReservation = null;
                this.action = null;
            })
    }

    onReportClick() {
        this.reported = true;
    }

    onReportDescriptionInput(s: string) {
        this.description = s;
    }

    onReportConfimClick() {
        this.malfunctionService.createMalfunction(this.selectedBike.id, this.description)
            .subscribe(() => {
                this.description = "";
                this.reported = false;
                this.reportedMessage = true;
            })
    }
}
