import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs/internal/observable/throwError';
import {Observable} from 'rxjs/internal/Observable';
import {AppService} from '../../app.service';
import {of} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class SecurityService {

    constructor(private http: HttpClient, private app: AppService, private router: Router) {
    }


    authenticate(credentials): Observable<any> {
        const headers = new HttpHeaders({
            'content-type': 'application/x-www-form-urlencoded'
        });

        const body = {
            "userName": credentials.username,
            "password": encodeURIComponent(credentials.password)
        }

        return this.http.post('/api/login', body, {headers: headers})
            .pipe(catchError(this.handleLoginError));
    }

    logout(): Observable<any> {
        return this.http.post('/api/security/logout', null)
            .pipe(catchError(this.handleError));
    }

    private handleLoginError(error: HttpErrorResponse) {
        if (error.status === 200 || error.status === 404) {
            return of(error.url);
        } else {
            return this.handleError(error);
        }
    }

    private handleError(error: HttpErrorResponse) {
        if (this.app) {
            this.app.unblockUI();
        }
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    }

}
