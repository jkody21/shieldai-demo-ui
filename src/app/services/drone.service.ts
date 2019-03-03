import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Drone } from '../models/drone';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { map, catchError, filter } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DroneService {
  private env = environment;
  private droneUrl = this.env.serviceBase + "drone";

  constructor(
    private http : HttpClient
  ) { }


  findDrones() : Observable<Drone[]> {
    return this.http
      .get<Drone[]>(this.droneUrl)
      .pipe(
          map(data => data), 
          catchError(this.handleError)
      );
  }

  findActiveDrones() : Observable<Drone[]> {
    return this.findDrones().pipe(
      map(result =>
        result.filter(one => one.isActive)
      ));
  }


  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);

    alert(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}
