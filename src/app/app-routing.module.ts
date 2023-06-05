import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { CommonDashboardComponent } from './views/pages/common-dashboard/common-dashboard.component';
import { CreditDashboardComponent } from './views/pages/credit-dashboard/credit-dashboard.component';
import { InsuranceDashboardComponent } from './views/pages/insurance-dashboard/insurance-dashboard.component';
import { WealthDashboardComponent } from './views/pages/wealth-dashboard/wealth-dashboard.component';
import { AccountProfileDetailsComponent } from './views/pages/account-profile-details/account-profile-details.component';
import { AccountDesktopMenuComponent } from './views/pages/account-desktop-menu/account-desktop-menu.component';
import { AccountKycVerficationComponent } from './views/pages/account-kyc-verfication/account-kyc-verfication.component';
import { AccountLinkedProfilesComponent } from './views/pages/account-linked-profiles/account-linked-profiles.component';
import { AccountDetailsComponent } from './views/pages/account-details/account-details.component';
import { UpdateLoanDetailsComponent } from './views/pages/update-loan-details/update-loan-details.component';
import { AccountRiskProfilingComponent } from './views/pages/account-risk-profiling/account-risk-profiling.component';
import { AccountBankDetailsComponent } from './views/pages/account-bank-details/account-bank-details.component';
import { AccountTransactionsComponent } from './views/pages/account-transactions/account-transactions.component';
import { AccountDigigoldPortfolioComponent } from './views/pages/account-digigold-portfolio/account-digigold-portfolio.component';
import { AddNewLoanComponent } from './views/pages/add-new-loan/add-new-loan.component';
import { SipComponent } from './views/tools/sip/sip.component';
import { EmiComponent } from './views/tools/emi/emi.component';
import { ApplyLoanEmiComponent } from './views/tools/apply-loan-emi/apply-loan-emi.component';
import { CreateGoalComponent } from './views/tools/create-goal/create-goal.component';
import { InvestmentComponent } from './views/tools/investment/investment.component';
import { KycPanVerificationComponent } from './views/pages/kyc-pan-verification/kyc-pan-verification.component';
import { ActiveInsuranceComponent } from './views/pages/active-insurance/active-insurance.component';
import { AccountMutualfundsPortfolioComponent } from './views/pages/account-mutualfunds-portfolio/account-mutualfunds-portfolio.component';
import { TermsOfUseComponent } from './views/pages/terms-of-use/terms-of-use.component';
import { SupportModalComponent } from './views/pages/support-modal/support-modal.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'overview', component: CommonDashboardComponent },
  { path: 'credit-dashboard', component: CreditDashboardComponent },
  { path: 'insurance-dashboard', component: InsuranceDashboardComponent },
  { path: 'wealth-dashboard', component: WealthDashboardComponent },
  { path: 'profile-details', component: AccountProfileDetailsComponent },
  { path: 'account-desktop-menu', component: AccountDesktopMenuComponent },
  { path: 'kyc-verification', component: AccountKycVerficationComponent },
  { path: 'linked-profiles', component: AccountLinkedProfilesComponent },
  { path: 'account-details', component: AccountDetailsComponent },
  { path: 'account-digigold-portfolio', component: AccountDigigoldPortfolioComponent },
  { path: 'account-mutualfunds-portfolio', component: AccountMutualfundsPortfolioComponent },
  { path: 'update-loan-details/:id', component: UpdateLoanDetailsComponent },
  { path: 'risk-profiling', component: AccountRiskProfilingComponent },
  { path: 'bank-details', component: AccountBankDetailsComponent },
  { path: 'transactions', component: AccountTransactionsComponent },
  { path: 'add-new-loan', component: AddNewLoanComponent },
  { path: 'tools-sip', component: SipComponent },
  { path: 'tools-emi', component: EmiComponent },
  { path: 'apply-for-loan', component: ApplyLoanEmiComponent },
  { path: 'create-goal', component: CreateGoalComponent },
  { path: 'investment/:type', component: InvestmentComponent },
  { path: 'kyc-pan-verification', component: KycPanVerificationComponent },
  { path: 'active-insurance', component: ActiveInsuranceComponent },
  { path:'terms-of-use',component:TermsOfUseComponent},
  { path:'support',component:SupportModalComponent},

  { path:'account-profile-details',component:AccountProfileDetailsComponent}
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy', onSameUrlNavigation: 'reload',useHash: false }),// useHash: true }),
    BrowserAnimationsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
