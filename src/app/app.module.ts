import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgApexchartsModule } from 'ng-apexcharts'
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { WebcamModule } from 'ngx-webcam';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
// import { CommonDashboardComponent } from './views/pages/common-dashboard/common-dashboard.component';
// import { CreditDashboardComponent } from './views/pages/credit-dashboard/credit-dashboard.component';
// import { InsuranceDashboardComponent } from './views/pages/insurance-dashboard/insurance-dashboard.component';
// import { WealthDashboardComponent } from './views/pages/wealth-dashboard/wealth-dashboard.component';
import { HeaderComponent } from './views/shared/header/header.component';
import { FooterComponent } from './views/shared/footer/footer.component';
import { LayoutComponent } from './layout/layout/layout.component';
// import { AccountProfileDetailsComponent } from './views/pages/account-profile-details/account-profile-details.component';
// import { AccountDesktopMenuComponent } from './views/pages/account-desktop-menu/account-desktop-menu.component';
// import { AccountKycVerficationComponent } from './views/pages/account-kyc-verfication/account-kyc-verfication.component';
// import { AccountLinkedProfilesComponent } from './views/pages/account-linked-profiles/account-linked-profiles.component';
// import { AccountDetailsComponent } from './views/pages/account-details/account-details.component';
// import { UpdateLoanDetailsComponent } from './views/pages/update-loan-details/update-loan-details.component';
// import { AccountRiskProfilingComponent } from './views/pages/account-risk-profiling/account-risk-profiling.component';
// import { AccountBankDetailsComponent } from './views/pages/account-bank-details/account-bank-details.component';
// import { AccountTransactionsComponent } from './views/pages/account-transactions/account-transactions.component';
// import { AddNewLoanComponent } from './views/pages/add-new-loan/add-new-loan.component';
// import { SipComponent } from './views/tools/sip/sip.component';
// import { EmiComponent } from './views/tools/emi/emi.component';
// import { ApplyLoanEmiComponent } from './views/tools/apply-loan-emi/apply-loan-emi.component';
// import { CreateGoalComponent } from './views/tools/create-goal/create-goal.component';
// import { InvestmentComponent } from './views/tools/investment/investment.component';
// import { KycPanVerificationComponent } from './views/pages/kyc-pan-verification/kyc-pan-verification.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
// import { ActiveInsuranceComponent } from './views/pages/active-insurance/active-insurance.component';
// import { AccountDigigoldPortfolioComponent } from './views/pages/account-digigold-portfolio/account-digigold-portfolio.component';
// import { AccountMutualfundsPortfolioComponent } from './views/pages/account-mutualfunds-portfolio/account-mutualfunds-portfolio.component';
// import { BlogsComponent } from './views/pages/blogs/blogs.component';
import { TermsOfUseComponent } from './views/pages/terms-of-use/terms-of-use.component';
import { SupportModalComponent } from './views/pages/support-modal/support-modal.component';
import { LeadModalComponent } from './views/pages/lead-modal/lead-modal.component';
import { WealthHomeComponent } from './views/pages/wealth-home/wealth-home.component';
// import { WealthBlogsComponent } from './wealth-blogs/wealth-blogs.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,  
    // CommonDashboardComponent,
    // CreditDashboardComponent,
    // InsuranceDashboardComponent,
    // WealthDashboardComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    // AccountProfileDetailsComponent,
    // AccountDesktopMenuComponent,
    // AccountKycVerficationComponent,
    // AccountLinkedProfilesComponent,
    // AccountDetailsComponent,
    // UpdateLoanDetailsComponent,
    // AccountRiskProfilingComponent,
    // AccountBankDetailsComponent,
    // AccountTransactionsComponent,
    // AddNewLoanComponent,
    // SipComponent,
    // EmiComponent,
    // ApplyLoanEmiComponent,
    // CreateGoalComponent,
    // InvestmentComponent,
    // KycPanVerificationComponent,
    // ActiveInsuranceComponent,
    // AccountDigigoldPortfolioComponent,
    // AccountMutualfundsPortfolioComponent,
    // BlogsComponent,
    TermsOfUseComponent,
    SupportModalComponent,
    LeadModalComponent,
    WealthHomeComponent,
    // WealthBlogsComponent,
  
    
    
  ],
  imports: [

    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    CarouselModule,
    NgxSliderModule,
    WebcamModule,
    NgApexchartsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
  
    ToastrModule.forRoot({timeOut:3000,preventDuplicates:true}),
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),

  ],
  providers: [
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
