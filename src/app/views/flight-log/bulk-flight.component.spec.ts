import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkFlightComponent } from './bulk-flight.component';

describe('BulkFlightComponent', () => {
  let component: BulkFlightComponent;
  let fixture: ComponentFixture<BulkFlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkFlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
