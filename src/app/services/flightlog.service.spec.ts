import { TestBed } from '@angular/core/testing';

import { FlightlogService } from './flightlog.service';

describe('FlightlogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlightlogService = TestBed.get(FlightlogService);
    expect(service).toBeTruthy();
  });
});
