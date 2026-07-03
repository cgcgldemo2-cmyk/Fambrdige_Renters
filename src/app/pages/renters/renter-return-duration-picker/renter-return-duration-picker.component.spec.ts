import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenterReturnDurationPickerComponent } from './renter-return-duration-picker.component';

describe('RenterReturnDurationPickerComponent', () => {
  let component: RenterReturnDurationPickerComponent;
  let fixture: ComponentFixture<RenterReturnDurationPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenterReturnDurationPickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenterReturnDurationPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
