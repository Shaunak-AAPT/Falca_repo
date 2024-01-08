import { Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';
import { AESCryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { EligibilityService } from 'src/app/services/eligibility/eligibility.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
import { environment } from 'src/environments/environment';

declare let $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isOTPSent: any = false;
  isLoggedIn: any = false;
  FormEmail: any;
  FormPassword: any;
  FormFirstName: any;
  FormLastName: any;
  FormMobileNo: any;
  otp1: any;
  oldToken: any;
  newToken: any;
  WealthUrl = environment.WealthUrl;
  InsuranceUrl = environment.InsuranceUrl;
  CommonUrl = environment.CommonUrl;
  CreditUrl = environment.CreditUrl;
  AgentUrl = environment.AgentUrl;
  Token: any;
  AToken: any;
  headotp1: string = "";
  headotp2: string = "";
  headotp3: string = "";
  headotp4: string = "";
  headotp5: string = "";
  headotp6: string = "";
  interval: any;
  resendbuttonText = 'Resend OTP';
  IsDashboard: boolean = false;
  footerYear: number = new Date().getFullYear();
  calltype: any;
  usertype: any = 'Customer';
  UrlRegister: any = 'auth/customer/register';
  UrlSendOTP: any = 'auth/customer/send-otp';
  urlValidateOTP: any = 'auth/customer/ValidateOTP';
  AgentInsuranceUrl = environment.AgentInsuranceUrl;
  AgentCommonUrl = environment.AgentCommonUrl;
 

  constructor(public validation: ValidateService, private toastr: ToastrService, private route: Router, private api: ApiService, private cryptoManager: AESCryptoService, private eligibility: EligibilityService) { }

  ngDoCheck(): void {
    this.CheckDashboard();
    let objToken = this.eligibility.getSessionParams('CustToken');
    if (!this.validation.isNullEmptyUndefined(objToken)) {
      this.newToken = objToken.token;
    }
    if (this.newToken != this.oldToken) {
      this.oldToken = this.newToken;
      if (this.validation.isNullEmptyUndefined(this.newToken)) {
        this.isLoggedIn = false;
      }
      else {
        this.isLoggedIn = true;
      }
    }
  }



  showSupportModal() {

    $("#supportModal").modal("show");
  }
  ngOnInit(): void {
    $(".login-popup").on('click', function (e: any) {
      e.stopPropagation();
    });
    $(".open-signup").click(function () {
      $(".sign-up").show();
      $(".sign-in").hide();
    });
    $(".open-sigin").click(function () {
      $(".sign-in").show();
      $(".sign-up").hide();
    });
    

    let authToken = localStorage.getItem('CustToken') ?? '';
    if (this.validation.isNullEmptyUndefined(authToken)) {
      this.isLoggedIn = false;
    }
    else {
      this.isLoggedIn = true;
    }
    let self = this;
    $("#site-backdrop").click(function () {
      self.handleOpenCloseNav();
    });
  }

  GotoInsurance() {
    this.Token = localStorage.getItem("CustToken");
    this.InsuranceUrl = environment.InsuranceUrl.replace("{TOKEN}", encodeURIComponent(this.Token));
    window.location.href = this.InsuranceUrl;
  }
  GotoWealth() {
    this.Token = localStorage.getItem("CustToken");
    this.WealthUrl = environment.WealthUrl.replace("{TOKEN}", encodeURIComponent(this.Token));
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

  CheckDashboard() {
    setTimeout(() => {
      let URL = this.route.url;
      if (URL == '/overview' || URL == '/wealth-dashboard' || URL == '/insurance-dashboard' || URL == '/credit-dashboard') {
        this.IsDashboard = true;
      }
      else {
        this.IsDashboard = false;
      }
    }, 1000);
  }

  handleOpenCloseNav() {
    if (document.getElementById("site-wrapper-menu")!.classList.contains("show-nav")) {
      document.getElementById("site-wrapper-menu")!.classList.remove("show-nav");
      $("#site-backdrop").css("display", "none");
    } else {
      document.getElementById("site-wrapper-menu")!.classList.add("show-nav");
      $("#site-backdrop").css("display", "block");
    }
  }

  

  Logout() {
    this.isLoggedIn = false;
    localStorage.clear();
    this.isOTPSent = false;
    this.ResetModal();
    this.handleOpenCloseNav();
    this.route.navigate(['/']);
  }



  ResetOTP() {
    this.headotp1 = "";
    this.headotp2 = "";
    this.headotp3 = "";
    this.headotp4 = "";
    this.headotp5 = "";
    this.headotp6 = "";
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

  cancleModal() {
    this.isOTPSent = false;
  }

  customerinsurancelink() {
    window.open("https://diy.ins.finizoninsurance.com/user/home/", "_blank", "noopener");
  }


  customerinvestmentlink() {
    window.open("https://wealth.finizon.com/client-login", "_blank", "noopener");
  }
  
  wealthlink() {
    // window.location.href = "https://uatnw.finizon.com/wealth";
    window.location.href = "http://65.1.237.83/wealth";

    
  }


  partnerinsurancelink() {
    window.open("https://ins.finizoninsurance.com/partner/posp-home", "_blank", "noopener");
  }

  partnerinvestmentlink() {
    window.open("https://wealth.finizon.com/advisor-login", "_blank", "noopener");

  }
  insurefitLink() {
        // window.open("https://dev.finizon.com/spprd/wellness?referralid=goqii", "_blank", "noopener");
        window.open(" http://65.1.237.83:5800/spprd/wellness?referralid=goqii", "_blank", "noopener");
     
  }

  shopkeeperLink() {
    // window.open("https://dev.finizon.com/spprd/shopkeeper?referralid=godigit", "_blank", "noopener");
    window.open("http://65.1.237.83:5800/spprd/shopkeeper?referralid=godigit", "_blank", "noopener");

  }
  monexoLink() {
    // window.open("https://dev.finizon.com/monexo?referralid=monexo", "_blank", "noopener");
    window.open("http://65.1.237.83:5800/monexo?referralid=monexo", "_blank", "noopener");
  
  }


  insureLink() {
    // window.open("https://uatnw.finizoninsurance.com/", "_blank", "noopener");    
    window.open("http://65.1.237.83:6800/", "_blank", "noopener");   
    
  }
}
