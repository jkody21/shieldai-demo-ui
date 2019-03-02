import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { FlightLogComponent } from './views/flight-log/flight-log.component';
import { AddFlightComponent } from './views/flight-log/add-flight.component';
import { BulkFlightComponent } from './views/flight-log/bulk-flight.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'flight-log',
        component: FlightLogComponent,
        data: {
          title: 'Flight Log'
        }
      },
      {
        path: 'flight-log/add-flight',
        component: AddFlightComponent,
        data: {
          title: 'Add a Flight'
        }
      },
      {
        path: 'flight-log/bulk-flight',
        component: BulkFlightComponent,
        data: {
          title: 'Add Many Flights'
        }
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
