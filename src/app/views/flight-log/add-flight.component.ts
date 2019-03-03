import { Component, OnInit } from '@angular/core';
import { FlightlogService } from '../../services/flightlog.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DroneService } from '../../services/drone.service';
import { Observable } from 'rxjs';
import { Drone } from '../../models/drone';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.scss']
})
export class AddFlightComponent implements OnInit {

  showSuccess:boolean = false;
  flightForm: FormGroup
  drones$: Observable<Drone[]>;
  droneList: Drone[];

  constructor(
    private flightService : FlightlogService,
    private droneService: DroneService,
    private fb: FormBuilder) { 
      this.buildForm();
    }

  ngOnInit() {
    this.drones$ = this.droneService.findActiveDrones();
    this.drones$.subscribe(d => this.droneList = d);
  }

  buildForm() {
      this.flightForm = this.fb.group({
         droneId: ['', Validators.required ],
         droneGeneration: ['', Validators.required ],
         beginOn: ['', Validators.required ],
         endOn: ['', Validators.required ],
         longitude: ['', [Validators.required, Validators.min(-180.0), Validators.max(180.0) ]],
         latitude: ['', [Validators.required, Validators.min(-90.0), Validators.max(90.0) ]],
         mapPath: ['' ]
      });

      /*
      this.flightForm.get('longitude').setValue(-118.2437);
      this.flightForm.get('latitude').setValue(34.0522);
      this.flightForm.get('beginOn').setValue('2019-21-03');
      this.flightForm.get('endOn').setValue('2019-23-03');
      this.flightForm.get('mapPath').setValue('test');
      */
  }


  addFlight() {
    var flight = this.flightForm.value;
    flight.flightLogId = 0;

    this.flightService.addLog(flight).subscribe(f => {
      console.log(f)
      this.flightForm.reset();

      this.success();
    });
  }

  success() {
    this.showSuccess = true;      
    var me = this;
    setTimeout(function() { me.showSuccess = false; }, 5000);
  }


  droneSelect(value:any) {
    var selectedDrone = this.getDroneById(value);
    this.flightForm.get('droneGeneration').setValue(selectedDrone.currentGeneration);
  }

  getDroneById(id:number) {
    for(var i = 0; i < this.droneList.length; i++) {
      var d = this.droneList[i];

      if(d.droneId == id)
        return this.droneList[i];
    }

    return null;
  }
}
