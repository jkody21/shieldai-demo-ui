import { Component, OnInit } from '@angular/core';
import { FlightlogService } from '../../services/flightlog.service';
import { FlightLog } from '../../models/flight-log';
import { Observable } from 'rxjs';
import { Drone } from '../../models/drone';
import { DroneService } from '../../services/drone.service';

import { ModalModule, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalContentComponent } from '../../containers/default-layout/modal.component';

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
  droneList: Drone[];
  bsModalRef: BsModalRef;
  
  constructor(
    private droneService: DroneService,
    private service : FlightlogService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.drones$ = this.droneService.findDrones();
    this.drones$.subscribe(d => this.droneList = d);
    this.doSearch({});
  }


  buildMapUrl(lon: number, lat: number, width: number, height: number) : string {
    var o = []

    o.push("//maps.googleapis.com/maps/api/staticmap?");
    o.push("center=" + lat + "," + lon);
    o.push("&zoom=14");
    o.push("&size=" + width + "x" +  height);
    o.push("&markers=color:green%7Clabel:D%7C" + lat + "," + lon + "&sensor=false");
    o.push("&key=AIzaSyBp7ksO0zIv5OS1z70tV7UVe4ZajhSZCHk");

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


  showModal(title:string, flightLog:FlightLog) {
    var drone = this.getDroneById(flightLog.droneId);
    var modalContent = this.buildModalContent(flightLog, drone);
    title = drone.name + ': ' + flightLog.beginOn;

    const initialState = {
      content:modalContent,
      title: title,
      class: 'modal-lg'
    };

    this.bsModalRef = this.modalService.show(ModalContentComponent, Object.assign({}, { class: 'modal-lg', initialState }));
    this.bsModalRef.content.closeBtnName = 'Close';
  }


  private buildModalContent(content:FlightLog, drone: Drone) {
    var o = [];

    o.push('<div class="flight-display">');

    o.push('<div class="row">');
    o.push('<div class="col-md-6">Drone Name:</div>');
    o.push('<div class="col-md-6 bold">' + drone.name + '</div>');
    o.push('</div>');

    o.push('<div class="row">');
    o.push('<div class="col-md-6">Drone Id:</div>');
    o.push('<div class="col-md-6 bold">' + drone.droneId + '</div>');
    o.push('</div>');

    o.push('<div class="row">');
    o.push('<div class="col-md-6">Current Drone Generation:</div>');
    o.push('<div class="col-md-6 bold">' + drone.currentGeneration + '</div>');
    o.push('</div>');

    o.push('<div class="row">');
    o.push('<div class="col-md-6">Drone is in Service:</div>');

    if(drone.isActive) 
      o.push('<div class="col-md-6 bold"><i class="fa fa-check-circle fa-lg is-active"></i></div>');
    else
      o.push('<div class="col-md-6 bold"><i class="fa fa-check-circle fa-lg is-inactive"></i></div>');

    o.push('</div>');

    o.push('<div class="row">');
    o.push('<div class="col-md-6">Flight Drone Generation:</div>');
    o.push('<div class="col-md-6 bold">' + content.droneGeneration + '</div>');
    o.push('</div>');

    o.push('<div class="row">');
    o.push('<div class="col-md-6">Flight Began On:</div>');
    o.push('<div class="col-md-6 bold">' + content.beginOn + '</div>');
    o.push('</div>');

    o.push('<div class="row">');
    o.push('<div class="col-md-6">Flight Ended On:</div>');
    o.push('<div class="col-md-6 bold">' + content.endOn + '</div>');
    o.push('</div>');

    o.push('<div class="row">');
    o.push('<div class="col-md-6">Flight Duration:</div>');
    o.push('<div class="col-md-6 bold">' + this.calculateDuration(content.beginOn, content.endOn)  + ' minutes</div>');
    o.push('</div>');

    o.push('<div class="row">');
    o.push('<div class="col-md-6">Average Position:</div>');
    o.push('<div class="col-md-6 bold">' + content.longitude + " / " + content.latitude + '</div>');
    o.push('</div>');

    o.push('<div class="row">');
    o.push('<div class="col-md-12"><hr /></div>');
    o.push('</div>');

    o.push('<div class="row">');
    o.push('<div class="col-md-6"><h4>Average Position</h4><img src="' + this.buildMapUrl(content.longitude, content.latitude, 300, 300) + '" /></div>');
    o.push('<div class="col-md-6"><h4>Building Map</h4><img src="' + content.mapPath + '" /></div>');
    o.push('</div>');

    o.push('</div>');

    return o.join('');
  }


  private getDroneById(id:number) {
    for(var i = 0; i < this.droneList.length; i++) {
      var d = this.droneList[i];

      if(d.droneId == id)
        return this.droneList[i];
    }

    return null;
  }


  private calculateDuration(start:Date, end:Date) {
    console.log(start + " " + end);
    console.log(new Date(end).getMilliseconds());
    console.log(new Date(start).getMilliseconds());
    var diffMs = (new Date(end).getTime() - new Date(start).getTime());
    console.log(diffMs);

    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    
    return diffMins;
  }

}
