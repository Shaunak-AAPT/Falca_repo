import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { TermsOfUseComponent } from './views/pages/terms-of-use/terms-of-use.component';
import { SupportModalComponent } from './views/pages/support-modal/support-modal.component';
import { LeadModalComponent } from './views/pages/lead-modal/lead-modal.component';
import { WealthHomeComponent } from './views/pages/wealth-home/wealth-home.component';
import { MotorComponent } from './views/pages/Motor/motor/motor.component';
import { WeatherComponent } from './views/pages/weather/weather/weather.component';
import { CropComponent } from './views/pages/Crop/crop/crop.component';
import { PlaceholderComponent } from './views/pages/Placeholder_screen/placeholder/placeholder.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'terms-of-use', component: TermsOfUseComponent },
  { path: 'support', component: SupportModalComponent },
  { path: 'lead', component: LeadModalComponent },
  { path: 'wealth', component: WealthHomeComponent },

  { path: 'motor', component:MotorComponent },
  { path: 'weather', component: WeatherComponent },
  { path: 'accident', component: CropComponent },
  { path: 'placeholder', component:PlaceholderComponent}



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', onSameUrlNavigation: 'reload', useHash: false }),// useHash: true }),
    BrowserAnimationsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
