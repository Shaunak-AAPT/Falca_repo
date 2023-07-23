import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { registerRequest } from 'src/app/models/registerRequest.model';
import { ApiService } from 'src/app/services/api/api.service';
import { AESCryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { EligibilityService } from 'src/app/services/eligibility/eligibility.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
import { environment } from 'src/environments/environment';
import { SupportModalComponent } from '../../pages/support-modal/support-modal.component';

declare var $: any;
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
  // @ViewChild(SupportModalComponent) supportComponent!: SupportModalComponent;
  // @ViewChild('supportModal') supportModal!: ElementRef;
  // @Output() supportClicked = new EventEmitter<void>();

  // onSupportClick() {
  //   this.supportClicked.emit();
  //   console.log( this.supportClicked.emit(),'supportemit')
  // }

  constructor(public validation: ValidateService, private toastr: ToastrService, private route: Router, private api: ApiService, private cryptoManager: AESCryptoService, private eligibility: EligibilityService) { }

  ngDoCheck(): void {
    this.CheckDashboard();
    var objToken = this.eligibility.getSessionParams('CustToken');
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
  // console.log("showmodel:", this.showModal);
}
  ngOnInit(): void {

    // $("body").click(function(){
    //   $(".login-popup").addClass("show");
    // });

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
    // $(".body-color").scroll(function () {
    //   if ($(".body-color").scrollTop()) {
    //     $(".mobile-sticky").show();
    //   }
    //   else {
    //     $(".mobile-sticky").hide();
    //   }
    // });
  
    var authToken = localStorage.getItem('CustToken') || '';
    if (this.validation.isNullEmptyUndefined(authToken)) {
      this.isLoggedIn = false;
    }
    else {
      this.isLoggedIn = true;
    }
    var self = this;
    $("#site-backdrop").click(function () {
      self.handleOpenCloseNav();
    });
  }


  // GotoCredit() {
  //   this.Token = localStorage.getItem("CustToken");
  //   this.CreditUrl = environment.CreditUrl.replace("{TOKEN}", encodeURIComponent(this.Token));
  //   window.location.href = this.CreditUrl;
  // }
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
      var URL = this.route.url;
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

  otpToggle(event: Event, calltype?: any) {
    event.stopPropagation();
    if (this.validation.isNullEmptyUndefined(this.FormEmail)) {
      this.toastr.error("Please enter a valid email");
    }
    else if (!this.validation.validateEmail(this.FormEmail)) {
      this.toastr.error("Please enter valid Email id");
    }
    else {

      this.ResetOTP();
      setTimeout(() => {
        if (calltype == 'login') {
          this.calltype = 'login';
          this.Login(event);
        }
        else {
          this.calltype = 'register';
          this.RegisterCust(event);
        }
      }, 0);

    }
  }

  Login(event: Event) {
    try {
      event.stopImmediatePropagation();
      let loginData = new FormData();
      loginData.append('email', this.FormEmail);
      this.api.post('auth/customer/login', loginData, false).subscribe(async response => {
        if (response.response.n == 1) {
          this.isOTPSent = true;
          $("#headerotp-screen").modal("show");
          this.resendbuttonText = "0:60"
          this.countdown();
          // console.log('response', response)
          this.toastr.success(response.response.Msg);
        }
        else {
          this.toastr.error(response.response.Msg);
          this.isOTPSent = false;
          // localStorage.clear();
          // this.route.navigate(['/']);
        }
      });
    }
    catch (ex) {
    }
  }

  RegisterCust(event: Event) {

    if (this.validation.isNullEmptyUndefined(this.FormFirstName)) {
      this.toastr.error("First Name is Mandatory");
    }
    else if (this.validation.isNullEmptyUndefined(this.FormLastName)) {
      this.toastr.error("Last Name is Mandatory");
    }
    else if (this.validation.isNullEmptyUndefined(this.FormEmail)) {
      this.toastr.error("Email id is Mandatory");
    }
    else if (!this.validation.validateEmail(this.FormEmail)) {
      this.toastr.error("Please enter valid Email id");
    }
    else if (this.validation.isNullEmptyUndefined((this.FormMobileNo.toString()).trim())) {
      this.toastr.error("Mobile Number is Mandatory");
    }
    else if (!this.validation.validateMobileNumber(this.FormMobileNo.trim())) {
      this.toastr.error("Please enter valid Mobile number");
    }
    else {
      if (this.usertype == 'Customer') {
        this.UrlRegister = 'auth/customer/register';
      }
      else if (this.usertype == 'Partner') {
        this.UrlRegister = 'auth/agent/register';
      }

      try {
        event.stopImmediatePropagation();
        let registerData = new registerRequest();
        registerData.mobileNumber = this.FormMobileNo;
        registerData.email = this.FormEmail;
        registerData.firstName = this.FormFirstName;
        registerData.lastName = this.FormLastName;
        registerData.consent_id = 1;
        registerData.ip_address = '192.168.0.1';
        // registerData.agentType = 2;
        registerData.gender = 1;

        this.api.post(this.UrlRegister, registerData, false).subscribe(async response => {
          // console.log(response);
          if (response.response.n == 1) {
            this.isOTPSent = true;
            $("#headerotp-screen").modal("show");
            this.resendbuttonText = "0:60"
            this.countdown();
            this.toastr.success(response.response.Msg);
          }
          else {
            this.toastr.error(response.response.Msg);
            this.isOTPSent = false;
            // localStorage.clear();
            // this.route.navigate(['/']);
          }
        });
      } catch (ex) {
      }
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

  ResendOTP() {
    if (this.usertype == 'Customer') {
      this.UrlSendOTP = 'auth/customer/send-otp';
    }
    else if (this.usertype == 'Partner') {
      this.UrlSendOTP = 'auth/agent/loginWithOtp';
    }

    this.ResetOTP();
    const data = new FormData();
    data.append("email", this.FormEmail);
    this.api.post(this.UrlSendOTP, data, false).subscribe(response => {
      if (response.response.n == 1) {
        // console.log(response.data.otp);
        // this.toastr.success(response.data.otp);
        this.resendbuttonText = "0:60";
        this.countdown();
      }
      else {
        this.toastr.error(response.response.Msg);
      }
    })
  }

  countdown() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      var timer: any = this.resendbuttonText;
      timer = timer.split(':');
      var minutes = timer[0];
      var seconds = timer[1];
      seconds -= 1;
      if (minutes < 0) return;
      else if (seconds < 0 && minutes != 0) {
        minutes -= 1;
        seconds = 59;
      }
      else if (seconds < 10 && seconds.length != 2) {
        seconds = '0' + seconds
      };
      this.resendbuttonText = minutes + ':' + seconds;
      if (minutes == 0 && seconds == 0) {
        clearInterval(this.interval)
        this.resendbuttonText = 'Resend OTP';
      };
    }, 1000);
  }

  ResetOTP() {
    this.headotp1 = "";
    this.headotp2 = "";
    this.headotp3 = "";
    this.headotp4 = "";
    this.headotp5 = "";
    this.headotp6 = "";
  }

  keytab(nextTabId: number, event: any) {
    let actionFlag = false;
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode < 96 || charCode > 105)) {
    }
    else if (charCode == 8) {
      // nextTabId--;
      if (nextTabId < 1) {
        nextTabId = 1;
      }
      nextTabId -= 2;
      actionFlag = true;
    }
    else {
      if (nextTabId > 6) {
        nextTabId = 6;
      }
      actionFlag = true;
    }
    // console.log("OTPfssf0",$('#headotp'+(nextTabId -1)).val().length)
    if (actionFlag && $('#headotp' + (nextTabId - 1)).val().length == 1) {
      const field = document.getElementById("headotp" + nextTabId);
      if (field) {
        field.focus();
        field.click();
      }
    }
  }

  async verifyOtpBtn() {
    await this.verifyOtp();
  }

  async verifyOtp() {
    if (this.usertype == 'Customer') {
      this.urlValidateOTP = 'auth/customer/ValidateOTP';
    }
    else if (this.usertype == 'Partner') {
      this.urlValidateOTP = 'auth/agent/loginOtpValidator';
    }

    return new Promise(async (resolve, reject) => {
      var otp = this.headotp1.toString() + this.headotp2.toString() + this.headotp3.toString() + this.headotp4.toString() + this.headotp5.toString() + this.headotp6.toString();

      if (!this.validation.isNullEmptyUndefined(this.FormEmail) && otp.length == 6) {
        const data = new FormData();
        data.append("email", this.FormEmail);
        data.append("otp", otp); //this.otp1 + this.otp2 + this.otp3 + this.otp4 + this.otp5 + this.otp6);
        let sOTP = otp;

        this.api.post(this.urlValidateOTP, data).subscribe(async response => {
          if (response.response.n == 1) {
            // console.log('signin', response);
            this.toastr.success("OTP Validation Success");
            $("#headerotp-screen").modal("hide");
            this.isLoggedIn = true;
            if (!this.validation.isNullEmptyUndefined(response.data.token.customer)) {
              var encryptedTokenCustomer = { "token": response.data.token.customer };
              localStorage.setItem("CustToken", this.cryptoManager.Encrypt(encryptedTokenCustomer));
            }
            if (!this.validation.isNullEmptyUndefined(response.data.token.agent)) {
              var encryptedTokenAgent = { "token": response.data.token.agent };
              localStorage.setItem("AgentToken", this.cryptoManager.Encrypt(encryptedTokenAgent));
            }
            // this.route.navigate(['/overview']);
            this.ResetModal();
            this.GetApplicantData();
            if (!this.validation.isNullEmptyUndefined(response.data.token.agent)) {
              // if (this.calltype == 'register') {
              //   this.GoToAgent('/agent-type')
              // }
              // else if (this.calltype == 'login') {
              //   this.GoToAgent('/overview');
              // }
              if (response.agentType.Insurance == true && (response.agentType.credit == true || response.agentType.wealth == true)) {
                this.GoToAgentCommon('agent-overview');
              }
              else if (response.agentType.Insurance == true) {
                if (response.agentKyc.Insurance == true) {
                  this.GoToAgentInsurance('/agent-insurance-dashboard');
                }
                else {
                  this.GoToAgentInsurance('/agent-insurance-onboarding');
                }
              }
              else if (response.agentType.Insurance != true) {

                if (response.agentType.credit == true && response.agentType.wealth == true) {
                  this.GoToAgentCommon('agent-overview');
                }
                else if (response.agentType.credit == true) {
                  if (response.agentKyc.credit == true) {
                    this.GoToAgentCommon('agent-credit-dashboard');
                  }
                  else {
                    this.GoToAgentCommon('agent-credit-onboarding');
                  }
                }
                else if (response.agentType.wealth == true) {
                  if (response.agentKyc.wealth == true) {
                    this.GoToAgentCommon('agent-wealth-dashboard');
                  }
                  else {
                    this.GoToAgentCommon('agent-wealth-onboarding');
                  }
                }
                else {
                  this.GoToAgentCommon('agent-type');
                }
              }
            }
            else if (this.validation.isNullEmptyUndefined(response.data.token.agent)) {
              setTimeout(() => {
                // console.log('route url', this.route.url);
                if (this.route.url == '/') {
                  this.route.navigate(['/overview']);
                }
              }, 1000);
            }

            resolve(response);
          }
          else {
            this.toastr.error(response.response.Msg);
            reject(response);
          }
        });
      } else {
        this.toastr.error("Please enter valid OTP.");
        reject(0);
      }
    });
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
    // $(".login-popup").addClass('show');
    this.isOTPSent = false;
  }

  customerinsurancelink(){
    window.open("https://ins.finizoninsurance.com/user/home", "_blank");

  }

  customerinvestmentlink(){
    // window.open("https://wealth.finizon.com/client-login","_blank");
    window.open("http://65.1.237.83/wealth","_blank");

  }

  partnerinsurancelink(){
    window.open("https://ins.finizoninsurance.com/partner/posp-home","_blank");
    // window.open("https://ins.finizoninsurance.com/partner/signup","_blank");


    
  }
  partnerinvestmentlink(){
    window.open("https://wealth.finizon.com/advisor-login", "_blank");
    // window.open("https://docs.google.com/forms/d/e/1FAIpQLSfNgk3MZJANGVd_PwwcUf7PFlsza2GOG-lVp3PYmBcvZyFtAw/viewform", "_blank");
    
  }
}
