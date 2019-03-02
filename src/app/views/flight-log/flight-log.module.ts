import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { FlightLogComponent } from './flight-log.component';
import { FlightLogRoutingModule } from './flight-log-routing.module';
import { AddFlightComponent } from './add-flight.component';
import { BulkFlightComponent } from './bulk-flight.component';

@NgModule({
  imports: [
    FormsModule,
    FlightLogRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ FlightLogComponent, AddFlightComponent, BulkFlightComponent ]
})
export class FlightLogModule { }