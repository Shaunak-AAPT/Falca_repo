import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveInsuranceComponent } from './active-insurance.component';

describe('ActiveInsuranceComponent', () => {
  let component: ActiveInsuranceComponent;
  let fixture: ComponentFixture<ActiveInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveInsuranceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
