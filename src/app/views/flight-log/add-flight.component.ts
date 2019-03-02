import { Component, OnInit } from '@angular/core';
import { FlightlogService } from '../../services/flightlog.service';
import { FlightLogComponent } from './flight-log.component';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.scss']
})
export class AddFlightComponent implements OnInit {

  flightForm: FormGroup

  /*
  droneId : number = 121;
  droneGeneration: number = 32;
  beginOn: Date = new Date();
  endOn: Date = new Date();
  longitude: number = 42.3601;
  latitude: number = 71.0589;
  mapPath: string = "test map";
  */

  constructor(
    private flightService : FlightlogService,
    private fb: FormBuilder) { 
      this.buildForm();
    }

  ngOnInit() {
    
  }

  buildForm() {
      this.flightForm = this.fb.group({
         droneId: ['', Validators.required ],
         droneGeneration: ['', Validators.required ],
         beginOn: ['', Validators.required ],
         endOn: ['', Validators.required ],
         longitude: ['', [Validators.required, Validators.min(-90.0), Validators.max(90.0) ]],
         latitude: ['', [Validators.required, Validators.min(-180.0), Validators.max(180.0) ]],
         mapPath: ['' ]
      });
  }


  addFlight() {
    console.log('adding flight');
    /*
    var flight = {
      flightLogId: 0,
      droneId : this.droneId,
      droneGeneration: this.droneGeneration,
      beginOn: this.beginOn,
      endOn: this.endOn,
      longitude: this.longitude,
      latitude: this.latitude,
      mapPath: this.mapPath
    }
    */
    var flight = this.flightForm.value;
    flight.flightLogId = 0;

    console.log(this.flightForm.valid);
    console.log(this.flightForm.value);

    this.flightService.addLog(flight).subscribe(f => console.log(f));
  }

}
