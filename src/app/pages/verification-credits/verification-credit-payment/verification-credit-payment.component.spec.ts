import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationCreditPaymentComponent } from './verification-credit-payment.component';

describe('VerificationCreditPaymentComponent', () => {
  let component: VerificationCreditPaymentComponent;
  let fixture: ComponentFixture<VerificationCreditPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerificationCreditPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificationCreditPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
