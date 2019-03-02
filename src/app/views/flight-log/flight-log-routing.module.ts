import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlightLogComponent } from './flight-log.component';
import { AddFlightComponent } from './add-flight.component';
import { BulkFlightComponent } from './bulk-flight.component';

const routes: Routes = [
  {
    path: '',
    component: FlightLogComponent,
    data: {
      title: 'Flight Log'
    },
    children: [
      {
        path: 'add-flight',
        component: AddFlightComponent,
        data: {
          title: 'Add a Flight'
        }
      },
      {
        path: 'bulk-flight',
        component: BulkFlightComponent,
        data: {
          title: 'Bulk Add Flight Log'
        }
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightLogRoutingModule {}
