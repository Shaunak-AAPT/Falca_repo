import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgApexchartsModule } from 'ng-apexcharts'
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WebcamModule } from 'ngx-webcam';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './views/shared/header/header.component';
import { FooterComponent } from './views/shared/footer/footer.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { TermsOfUseComponent } from './views/pages/terms-of-use/terms-of-use.component';
import { SupportModalComponent } from './views/pages/support-modal/support-modal.component';
import { LeadModalComponent } from './views/pages/lead-modal/lead-modal.component';
import { WealthHomeComponent } from './views/pages/wealth-home/wealth-home.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,  
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    TermsOfUseComponent,
    SupportModalComponent,
    LeadModalComponent,
    WealthHomeComponent,    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    CarouselModule,
    WebcamModule,
    NgApexchartsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
  
    ToastrModule.forRoot({timeOut:3000,preventDuplicates:true}),
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),

  ],
  providers: [
    DatePipe,
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
