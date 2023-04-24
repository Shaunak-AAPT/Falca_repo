import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDigigoldPortfolioComponent } from './account-digigold-portfolio.component';

describe('AccountDigigoldPortfolioComponent', () => {
  let component: AccountDigigoldPortfolioComponent;
  let fixture: ComponentFixture<AccountDigigoldPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountDigigoldPortfolioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDigigoldPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
