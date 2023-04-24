import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMutualfundsPortfolioComponent } from './account-mutualfunds-portfolio.component';

describe('AccountMutualfundsPortfolioComponent', () => {
  let component: AccountMutualfundsPortfolioComponent;
  let fixture: ComponentFixture<AccountMutualfundsPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountMutualfundsPortfolioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountMutualfundsPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
