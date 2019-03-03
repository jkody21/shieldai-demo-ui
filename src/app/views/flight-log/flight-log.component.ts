import { Component, OnInit } from '@angular/core';
import { FlightlogService } from '../../services/flightlog.service';
import { FlightLog } from '../../models/flight-log';
import { Observable } from 'rxjs';
import { Drone } from '../../models/drone';
import { DroneService } from '../../services/drone.service';

@Component({
  selector: 'app-flight-log',
  templateUrl: './flight-log.component.html',
  styleUrls: ['./flight-log.component.scss']
})
export class FlightLogComponent implements OnInit {

  droneId : number;
  droneGeneration: number;
  from: Date;
  to: Date;
  longitude: number;
  latitude: number;
  distance: number;
  durationLow: number;
  durationHigh: number;

  public flightLog: FlightLog[];
  public flightLog$: Observable<FlightLog[]>;
  drones$: Observable<Drone[]>;
  
  constructor(
    private droneService: DroneService,
    private service : FlightlogService
  ) { }

  ngOnInit() {
    this.drones$ = this.droneService.findDrones();
    this.doSearch({});
  }


  buildMapUrl(lon: number, lat: number, width: number, height: number) : string {
    var o = []

    o.push("//maps.googleapis.com/maps/api/staticmap?");
    o.push("center=" + lat + "," + lon);
    o.push("&zoom=14");
    o.push("&size=" + width + "x" +  height);
    o.push("&markers=color:green%7Clabel:D%7C32.7109069824219,-117.159820556641&sensor=false&key=AIzaSyBp7ksO0zIv5OS1z70tV7UVe4ZajhSZCHk");

    return o.join('');
  }
  
  doSearch(request: any) {
    this.flightLog$ = this.service.findFlightLogs(request);
  }

  doFilter() {
    var request = {
      droneId : this.droneId,
      droneGeneration: this.droneGeneration,
      from: this.from,
      to: this.to,
      longitude: this.longitude,
      latitude: this.latitude,
      distance: this.distance,
      durationHigh: this.durationHigh,
      durationLow: this.durationLow
    }

    this.doSearch(request);
  }

  reset() {
    this.droneId = null;
    this.droneGeneration = null;
    this.from = null;
    this.to = null;
    this.longitude = null;
    this.latitude = null;
    this.distance = null;

    this.doFilter();
  }

}
