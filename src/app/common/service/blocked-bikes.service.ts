import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AppService} from "../../app.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {BikeDTO, BikeStationDTO, BikeListDTO} from "../../generated/dto";

@Injectable()
export class BlockedBikesService {

    constructor(private http: HttpClient) {
    }

    getBlockedBikes(): Observable<BikeListDTO> {
        return this.http.get<BikeListDTO>("/api/bikes/blocked");
    }

    unblockBike(id: string): Observable<any> {
        return this.http.delete(`/api/bikes/blocked/${id}`)
    }

    blockBike(id: string): Observable<BikeDTO> {
        const body = {
            "id": id
        }

        return this.http.post<BikeDTO>('/api/bikes/blocked', body);
    }
}