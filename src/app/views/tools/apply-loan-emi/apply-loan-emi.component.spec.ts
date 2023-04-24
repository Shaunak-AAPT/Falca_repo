import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyLoanEmiComponent } from './apply-loan-emi.component';

describe('ApplyLoanEmiComponent', () => {
  let component: ApplyLoanEmiComponent;
  let fixture: ComponentFixture<ApplyLoanEmiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyLoanEmiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyLoanEmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
