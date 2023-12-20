import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { TermsOfUseComponent } from './views/pages/terms-of-use/terms-of-use.component';
import { SupportModalComponent } from './views/pages/support-modal/support-modal.component';
import { LeadModalComponent } from './views/pages/lead-modal/lead-modal.component';
import { WealthHomeComponent } from './views/pages/wealth-home/wealth-home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'terms-of-use', component: TermsOfUseComponent },
  { path: 'support', component: SupportModalComponent },
  { path: 'lead', component: LeadModalComponent },
  { path: 'wealth', component: WealthHomeComponent },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', onSameUrlNavigation: 'reload', useHash: false }),// useHash: true }),
    BrowserAnimationsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
