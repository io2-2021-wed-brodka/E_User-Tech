import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AppService} from "../../app.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {BikeStationDTO, BikeStationListDTO} from "../../generated/dto";
import {map} from "rxjs/operators";

@Injectable()
export class BikeStationService {

    constructor(private http: HttpClient) {
    }

    getAllBikeStations(): Observable<BikeStationDTO[]> {
        return this.http.get<BikeStationListDTO>("/api/stations/active").pipe(map(r => r.stations));
    }
}