import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FlightLog } from '../models/flight-log';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FlightlogService {

  constructor(
    private http: HttpClient
  ) { }

  private flightLogUrl = "http://shieldai-api.jeffkody.com/flightlog"

  
  findFlightLogs() : Observable<FlightLog[]> {
    return this.http
      .get<FlightLog[]>(this.flightLogUrl)
      .pipe(
          map(data => data), 
          catchError(this.handleError)
      );
  }


  addLog(log: FlightLog) : Observable<FlightLog> {
    return this.http
      .post<FlightLog>(this.flightLogUrl, log)
      .pipe(
          map(data => data), 
          catchError(this.handleError)
      );
  }



  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}
