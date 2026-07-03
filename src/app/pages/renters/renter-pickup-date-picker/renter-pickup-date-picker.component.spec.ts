import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenterPickupDatePickerComponent } from './renter-pickup-date-picker.component';

describe('RenterPickupDatePickerComponent', () => {
  let component: RenterPickupDatePickerComponent;
  let fixture: ComponentFixture<RenterPickupDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenterPickupDatePickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenterPickupDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
