import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';
import { AESCryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { EligibilityService } from 'src/app/services/eligibility/eligibility.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
import { environment } from 'src/environments/environment';
declare let $: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @ViewChild('termOfUse') termOfUse!: ElementRef;

  isOTPSent: any = false;
  isLoggedIn: any = false;
  FormEmail: any;
  FormPassword: any;
  FormFirstName: any;
  FormLastName: any;
  FormMobileNo: any;
  FormCheckbox: any;
  otp1: any;
  MobileSiginBarFlag: any = true;
  oldToken: any;
  newToken: any;
  footerotp1: string = "";
  footerotp2: string = "";
  footerotp3: string = "";
  footerotp4: string = "";
  footerotp5: string = "";
  footerotp6: string = "";
  interval: any;
  resendbuttonText = 'Resend OTP';
  footerYear: number = new Date().getFullYear();

  CommonUrl = environment.CommonUrl;
  AgentUrl = environment.AgentUrl;
  calltype: any;
  usertype: any = 'Customer';
  UrlRegister: any = 'auth/customer/register';
  UrlSendOTP: any = 'auth/customer/send-otp';
  urlValidateOTP: any = 'auth/customer/ValidateOTP';
  Token: any;
  AToken: any;
  CreditUrl = environment.CreditUrl;
  InsuranceUrl = environment.InsuranceUrl;
  WealthUrl = environment.WealthUrl;
  AgentInsuranceUrl = environment.AgentInsuranceUrl;
  AgentCommonUrl = environment.AgentCommonUrl;

  constructor(public api: ApiService, public validation: ValidateService, public toastr: ToastrService, public route: Router, public cryptoManager: AESCryptoService, public eligibility: EligibilityService) { }

  ngOnInit(): void {
    this.isOTPSent = false;
    this.FormCheckbox = 0;

    let authToken = localStorage.getItem('CustToken') ?? '';
    if (this.validation.isNullEmptyUndefined(authToken)) {
      this.isLoggedIn = false;
      this.MobileSiginBarFlag = true;
    }
    else {
      this.isLoggedIn = true;
      this.MobileSiginBarFlag = false;
    }
  }

  ngDoCheck(): void {
    let objToken = this.eligibility.getSessionParams('CustToken');
    if (!this.validation.isNullEmptyUndefined(objToken)) {
      this.newToken = objToken.token;
    }
    if (this.newToken != this.oldToken) {
      this.oldToken = this.newToken;
      if (this.validation.isNullEmptyUndefined(this.newToken)) {
        this.isLoggedIn = false;
        this.MobileSiginBarFlag = true;
      }
      else {
        this.isLoggedIn = true;
        this.MobileSiginBarFlag = false;
      }
    }
  }

  CreditRouterUrl(Path: any) {
    this.Token = localStorage.getItem("CustToken");
    this.CreditUrl = environment.CreditUrl.replace("{TOKEN}", encodeURIComponent(this.Token));
    this.CreditUrl = this.CreditUrl.replace("{PATH}", encodeURIComponent(Path));
    window.location.href = this.CreditUrl;
  }

  InsurancetRouterUrl(Path: any) {
    this.Token = localStorage.getItem("CustToken");
    this.InsuranceUrl = environment.InsuranceUrl.replace("{TOKEN}", encodeURIComponent(this.Token));
    this.InsuranceUrl = this.InsuranceUrl.replace("{PATH}", encodeURIComponent(Path));
    window.location.href = this.InsuranceUrl;
  }
  wealthtRouterUrl(Path: any) {
    this.Token = localStorage.getItem("CustToken");
    this.WealthUrl = environment.WealthUrl.replace("{TOKEN}", encodeURIComponent(this.Token));
    this.WealthUrl = this.WealthUrl.replace("{PATH}", encodeURIComponent(Path));
    window.location.href = this.WealthUrl;
  }

  GoToAgentInsurance(para: any) {
    this.AToken = localStorage.getItem("AgentToken");
    this.AgentInsuranceUrl = environment.AgentInsuranceUrl.replace("{ATOKEN}", encodeURIComponent(this.AToken));
    this.AgentInsuranceUrl = this.AgentInsuranceUrl.replace("{PATH}", encodeURIComponent(para));
    window.location.href = this.AgentInsuranceUrl;
  }
  GoToAgentCommon(para: any) {
    this.AToken = localStorage.getItem("AgentToken");
    this.AgentCommonUrl = environment.AgentCommonUrl.replace("{ATOKEN}", encodeURIComponent(this.AToken));
    this.AgentCommonUrl = this.AgentCommonUrl.replace("{PATH}", encodeURIComponent(para));
    window.location.href = this.AgentCommonUrl;
  }

  

  ResetOTP() {
    this.footerotp1 = "";
    this.footerotp2 = "";
    this.footerotp3 = "";
    this.footerotp4 = "";
    this.footerotp5 = "";
    this.footerotp6 = "";
  }



  ResetModal() {
    this.FormFirstName = "";
    this.FormLastName = "";
    this.FormEmail = "";
    this.FormMobileNo = "";
    this.otp1 = "";
  }


  GetApplicantData() {
    this.api.get("auth/customer/user", true).subscribe(response => {
      localStorage.setItem("ApplicantData", this.cryptoManager.Encrypt(response.data));
    })
  }
 
  showSupportModal() {

    $("#supportModal").modal("show");
  }

  scrollToTerms() {
    window.open('/terms-of-use#terms-section', '_blank', "noopener");
  }
  knowMore(){
    // window.open("https://uatnw.finizon.com/","_blank", "noopener");  
    window.open("http://65.1.237.83/","_blank", "noopener");      
  }
}

