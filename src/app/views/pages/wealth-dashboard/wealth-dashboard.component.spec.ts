import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WealthDashboardComponent } from './wealth-dashboard.component';

describe('WealthDashboardComponent', () => {
  let component: WealthDashboardComponent;
  let fixture: ComponentFixture<WealthDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WealthDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WealthDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
