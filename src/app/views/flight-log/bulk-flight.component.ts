import { Component, OnInit } from '@angular/core';
import { FlightlogService } from '../../services/flightlog.service';

@Component({
  selector: 'app-bulk-flight',
  templateUrl: './bulk-flight.component.html',
  styleUrls: ['./bulk-flight.component.scss']
})
export class BulkFlightComponent implements OnInit {

  csv: string;
  json: string;
  showSuccess: boolean;

  constructor(
    private flightService: FlightlogService
  ) { }

  
  ngOnInit() {

  }


  processJson() {
    this.flightService.loadJsonStringToObjectArray(this.json).subscribe(r => {
      console.log(r);
      this.json = "";
      this.success();
    });
  }

  processCsv() {
    this.flightService.loadCsvToJson(this.csv).subscribe(r => {
      console.log(r);
      this.csv = "";
      this.success();
    });
  }

  showCsvHeaders() {
    this.csv = "droneId, droneGeneration, beginOn, endOn, longitude, latitude, mapPath";
  }

  showJsonFormat() {
    this.json = `
[
  {
    "droneId": 121,
    "droneGeneration": 2,
    "beginOn": "2019-02-28T20:36:13.312Z",
    "endOn": "2019-02-28T20:36:13.312Z",
    "longitude": -74.0060,
    "latitude": 40.7128,
    "mapPath": "string"
  }
]
    `;
  }

  success() {
    this.showSuccess = true;      
    var me = this;
    setTimeout(function() { me.showSuccess = false; }, 5000);
  }
}
