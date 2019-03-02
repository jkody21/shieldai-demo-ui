import { Component, OnInit } from '@angular/core';
import { FlightlogService } from '../../services/flightlog.service';
import { FlightLog } from '../../models/flight-log';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-flight-log',
  templateUrl: './flight-log.component.html',
  styleUrls: ['./flight-log.component.scss']
})
export class FlightLogComponent implements OnInit {

  public flightLog: FlightLog[];
  public flightLog$: Observable<FlightLog[]>;
  
  constructor(
    private service : FlightlogService
  ) { }

  ngOnInit() {
    this.flightLog$ = this.service.findFlightLogs();
  }

}
