import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AppService} from "../../app.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {BikeDTO, BikeListDTO, BikeStationDTO, ReservedBikeDTO} from "../../generated/dto";
import {map} from "rxjs/operators";

@Injectable()
export class BikeService {

    constructor(private http: HttpClient) {
    }

    getRentedBikes(): Observable<BikeDTO[]> {
        return this.http.get<BikeListDTO>("/api/bikes/rented")
            .pipe(map(r => r.bikes));
    }

    getReservedBikes(): Observable<ReservedBikeDTO[]> {
        return this.http.get<ReservedBikeDTO[]>("/api/bikes/reserved")
    }
    
    returnBike(id: number, stationId: number): Observable<any> {

        const body = {
            "id": id
        }

        return this.http.post(`/api/stations/${stationId}/bikes`, body);
    }

    rentBike(id: number) : Observable<any>{
        const body = {
            "id": id
        }
        return this.http.post("/api/bikes/rented", body);
    }

    getBikesInStation(stationId: number): Observable<BikeDTO[]> {
        return this.http.get<BikeListDTO>(`/api/stations/${stationId}/bikes`)
            .pipe(map(r => r.bikes));
    }

    reserveBike(id: number) : Observable<any>{
        const body = {
            "id": id
        }
        return this.http.post("/api/bikes/reserved", body);
    }

    cancelReservation(id: number): Observable<any> {
        return this.http.delete(`/api/bikes/reserved/${id}`)
    }
}