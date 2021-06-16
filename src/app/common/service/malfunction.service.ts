import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AppService} from "../../app.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {
    BikeDTO,
    BikeListDTO,
    BikeStationDTO,
    MalfunctionDTO, MalfunctionListDTO, MalfunctionListDTOBuilder,
    ReservedBikeDTO,
    ReservedBikesListDTO
} from "../../generated/dto";
import {map} from "rxjs/operators";

@Injectable()
export class MalfunctionService {

    constructor(private http: HttpClient) {
    }

    getMalfunctions(): Observable<MalfunctionDTO[]> {
        return this.http.get<MalfunctionListDTO>("/api/malfunctions")
            .pipe(map(m => m.malfunctions));
    }

    createMalfunction(id: string, description: string) : Observable<any>{
        const body = {id, description}
        return this.http.post("/api/malfunctions", body);
    }

    deleteMalfunction(id: string): Observable<any> {
        return this.http.delete(`/api/malfunctions/${id}`)
    }

}
