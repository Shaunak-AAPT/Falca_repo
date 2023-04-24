import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditDashboardComponent } from './credit-dashboard.component';

describe('CreditDashboardComponent', () => {
  let component: CreditDashboardComponent;
  let fixture: ComponentFixture<CreditDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
