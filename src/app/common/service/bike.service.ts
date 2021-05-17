import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BikeDTO, BikeListDTO} from '../../generated/dto';
import {map} from 'rxjs/operators';

@Injectable()
export class BikeService {

    constructor(private http: HttpClient) {
    }

    getRentedBikes(): Observable<BikeListDTO> {
        return this.http.get<BikeListDTO>('/api/bikes/rented');
    }

    returnBike(id: number, stationId: number): Observable<any> {

        const body = {
            'id': id
        };

        return this.http.post(`/api/stations/${stationId}/bikes`, body);
    }

    rentBike(id: number): Observable<any> {
        const body = {
            'id': id
        };
        return this.http.post('/api/bikes/rented', body);
    }

    getBikesInStation(stationId: number): Observable<BikeDTO[]> {
        return this.http.get<BikeListDTO>(`/api/stations/${stationId}/bikes`)
            .pipe(map(r => r.bikes));
    }

    deleteBike(bikeId: number):
}
