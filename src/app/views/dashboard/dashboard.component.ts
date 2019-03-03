import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { FlightlogService } from '../../services/flightlog.service';
import { Observable } from 'rxjs';
import { FlightMetrics } from '../../models/flight-metrics';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  public metrics$ : Observable<FlightMetrics>;
  public metrics: FlightMetrics;



  constructor(
    private flightService: FlightlogService
  ) {

  }
  
  ngOnInit(): void {
    // generate random values for mainChart
    this.metrics$ = this.flightService.getFlightMetrics();
    this.metrics$.subscribe(m => this.metrics = m);
  }
}
