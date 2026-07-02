import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationCreditsComponent } from './verification-credits.component';

describe('VerificationCreditsComponent', () => {
  let component: VerificationCreditsComponent;
  let fixture: ComponentFixture<VerificationCreditsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerificationCreditsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificationCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
