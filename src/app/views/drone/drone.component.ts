import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Drone } from '../../models/drone';
import { DroneService } from '../../services/drone.service';

@Component({
  selector: 'app-drone',
  templateUrl: './drone.component.html',
  styleUrls: ['./drone.component.scss']
})
export class DroneComponent implements OnInit {

  public drones$: Observable<Drone[]>;

  constructor(
    private droneService: DroneService
  ) { }

  ngOnInit() {
    this.drones$ = this.droneService.findDrones();
  }

}
