import { Options } from '@angular-slider/ngx-slider';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';
import { AESCryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
declare var $: any;
@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css'],
  animations: [
    trigger('fadeinout', [
      state('hide', style({ 'height': '0%', 'opacity': '0', 'display': 'none' })),
      state('visible', style({ 'height': '4%', 'opacity': '1' })),
      transition('hide => visible', [
        style({ 'display': 'block' }), animate('1000ms ease-in')
      ]),
      transition('visible => hide', [animate('10ms ease-out')])
    ])
  ]
})
export class InvestmentComponent implements OnInit {

  value21: number = 200000;
  options21: Options = {
    floor: 0,
    ceil: 500000,
    translate: (value21: number, label: any): string => {
      if (isNaN(+value21)) {
        this.value21 = 0;
      }
      switch (label) {
        case label.Low:
          return "<b>Min 1 Lakh</b> ₹" + value21;
        case label.High:
          return "<b>Max 5 Lakh</b> ₹" + value21;
        default:
          return "₹" + this.returnAmountInText(value21);
      }
    }

  };

  value22: number = 2000000;
  options22: Options = this.getOptionsForTarget();

  value23: number = 10;
  sliderValue23: number = 10;
  options23: Options = {
    floor: 0,
    ceil: 20,
    step: 0.01,
    translate: (sliderValue23: number, label: any): string => {
      if (isNaN(+sliderValue23)) {
        this.value23 = 0;
        this.sliderValue23 = 0;
      }
      this.value23 = this.sliderValue23;
      switch (label) {
        case label.Low:
          return "<b>Min 1 %</b> " + sliderValue23;
        case label.High:
          return "<b>Max 20 %</b>" + sliderValue23;
        default:
          return sliderValue23 + "%";
      }
    }

  };
  value24: number = 3.5;
  value26: number = 3.5;
  options24: Options = {
    floor: 0,
    ceil: 15,
    step: 0.01,
    translate: (value26: number, label: any): string => {
      if (isNaN(+value26)) {
        this.value26 = 0;
        this.value24 = 0;
      }
      this.value24 = this.value26;
      switch (label) {
        case label.Low:
          return "<b>Min 1 %</b> " + value26;
        case label.High:
          return "<b>Max 15 %</b>" + value26;
        default:
          return value26 + "%";
      }
    }

  };
  StepCount: number = 0;
  Steps: any = [];
  ShowNxtBtn: boolean = true;
  SetWidth: any = [];
  InvestmentType = "";
  InvestmentTypeId: number = 2;
  investmentMode: any = 1;
  targetDate: any;
  fullName: any;
  email: any;
  mobileNumber: any;
  ResponseData: any = { "monthly": 0, "expectedCorpus": 0 };
  Otpinterval: any;
  time = 180;
  OtpResendTime: string = "";
  showOtpinterval = false;
  otp1: string = "";
  otp2: string = "";
  otp3: string = "";
  otp4: string = "";
  otp5: string = "";
  otp6: string = "";
  submitbtnLoading = false;
  submitotpbtnLoading = false;
  ApplicantData: any;


  constructor(private activeRoute: ActivatedRoute, private toastr: ToastrService, private route: Router, public validation: ValidateService, private api: ApiService, private crypto: AESCryptoService) { }

  ngOnInit(): void {
    var today = new Date(new Date().setDate(new Date().getDate() + parseInt('30'))).toISOString().split('T')[0];
    document.getElementsByName("targeted-date")[0].setAttribute('min', today);
    this.activeRoute.params.subscribe(params => {
      this.InvestmentType = params['type'];
      if (this.InvestmentType == 'car') {
        this.InvestmentTypeId = 2;
      } else if (this.InvestmentType == 'education') {
        this.InvestmentTypeId = 4;
      } else if (this.InvestmentType == 'house') {
        this.InvestmentTypeId = 3;
      } else if (this.InvestmentType == 'retirement') {
        this.InvestmentTypeId = 5;
      }
    });
    this.Steps = [];
    this.Steps[0] = true;
    this.SetWidth[0] = 0;
    this.SetWidth[1] = 20;
    this.SetWidth[2] = 40;
    this.SetWidth[3] = 50;
    this.SetWidth[4] = 70;
    this.SetWidth[5] = 80;
    this.SetWidth[6] = 90;
    this.SetWidth[7] = 100;

    if (localStorage.getItem("ApplicantData") != null) {
      this.ApplicantData = this.crypto.Decrypt(localStorage.getItem("ApplicantData"));
      this.getPrefilledData();
    }
  }

  getPrefilledData() {
    this.fullName = this.ApplicantData.firstName + ' ' + this.ApplicantData.lastName;
    this.mobileNumber = this.ApplicantData.mobileNumber;
    this.email = this.ApplicantData.email;
  }

  getOptionsForTarget(): Options {
    this.activeRoute.params.subscribe(params => {
      this.InvestmentType = params['type'];
    });
    let ReturnOption = {};
    if (this.InvestmentType == 'car') {
      ReturnOption = {
        floor: 100000,
        ceil: 5000000,
        translate: (value22: number, label: any): string => {
          if (isNaN(+value22)) {
            this.value22 = 100000;
          }
          switch (label) {
            case label.Low:
              return "<b>Min 1 Lakh </b> ₹" + value22;
            case label.High:
              return "<b>Max 50 Lakh</b> ₹" + value22;
            default:
              return "₹" + this.returnAmountInText(value22);
          }
        }
      };
    } else if (this.InvestmentType == 'house') {
      ReturnOption = {
        floor: 100000,
        ceil: 200000000,
        translate: (value22: number, label: any): string => {
          if (isNaN(+value22)) {
            this.value22 = 100000;
          }
          switch (label) {
            case label.Low:
              return "<b>Min 1 Lakh </b> ₹" + value22;
            case label.High:
              return "<b>Max 20 Cr</b> ₹" + value22;
            default:
              return "₹" + this.returnAmountInText(value22);
          }
        }
      };
    } else if (this.InvestmentType == 'education') {
      ReturnOption = {
        floor: 100000,
        ceil: 50000000,
        translate: (value22: number, label: any): string => {
          if (isNaN(+value22)) {
            this.value22 = 100000;
          }
          switch (label) {
            case label.Low:
              return "<b>Min 1 Lakh </b> ₹" + value22;
            case label.High:
              return "<b>Max 5 Cr</b> ₹" + value22;
            default:
              return "₹" + this.returnAmountInText(value22);
          }
        }
      };
    } else if (this.InvestmentType == 'retirement') {
      ReturnOption = {
        floor: 100000,
        ceil: 100000000,
        translate: (value22: number, label: any): string => {
          if (isNaN(+value22)) {
            this.value22 = 100000;
          }
          switch (label) {
            case label.Low:
              return "<b>Min 1 Lakh </b> ₹" + value22;
            case label.High:
              return "<b>Max 10 Cr</b> ₹" + value22;
            default:
              return "₹" + this.returnAmountInText(value22);
          }
        }
      };
    }
    return ReturnOption;
  }

  returnAmountInText(value: number) {
    let GivenValue = value.toString();
    if (GivenValue.length > 5 && GivenValue.length < 8) {
      return (parseFloat(GivenValue) / 100000).toFixed(2) + ' Lakh';
    } else if (GivenValue.length > 7) {
      return (parseFloat(GivenValue) / 10000000).toFixed(2) + ' Cr';
    }
    else {
      return GivenValue;
    }
  }
  NextStep() {
    this.ShowNxtBtn = true;
    if (this.StepCount == 0 && this.validation.isNullEmptyUndefined(this.investmentMode)) {
      this.toastr.error("Please select the investment mode");
    } else if (this.StepCount == 1 && (this.validation.isNullEmptyUndefined(this.value22.toString()) || this.value22 == 0)) {
      this.toastr.error("Targeted amount should be greater than zero");
    } else if (this.StepCount == 2 && this.validation.isNullEmptyUndefined(this.targetDate)) {
      this.toastr.error("Please provide the goal targeted date");
    } else if (this.StepCount == 3 && this.validation.isNullEmptyUndefined(this.value21.toString())) {
      this.toastr.error("Please provide proper amount");
    } else if (this.StepCount == 3 && ((this.value22 - this.value21) < 1)) {
      this.toastr.error("Amount set aside can not be lesser than target amount");
    } else if (this.StepCount == 4 && this.validation.isNullEmptyUndefined(this.value23.toString())) {
      this.toastr.error("Please provide rate of return");
    } else if (this.StepCount == 5 && this.validation.isNullEmptyUndefined(this.value24.toString())) {
      this.toastr.error("Please provide rate of inflation");
    } else if (this.StepCount == 6 && (this.validation.isNullEmptyUndefined(this.fullName) || this.validation.isNullEmptyUndefined(this.email) || this.validation.isNullEmptyUndefined(this.mobileNumber) || (this.mobileNumber.length < 10))) {
      // } else if (this.StepCount == 6 && (this.validation.isNullEmptyUndefined(this.fullName) || this.validation.isNullEmptyUndefined(this.email) || this.validation.isNullEmptyUndefined(this.mobileNumber) || (this.mobileNumber.length < 10 || !(this.mobileNumber.charAt(0) != '8' || this.mobileNumber.charAt(0) != '7' || this.mobileNumber.charAt(0) != '9')))) {
      if (this.validation.isNullEmptyUndefined(this.fullName)) {
        this.toastr.error("Please provide your full name");
      } else if (this.validation.isNullEmptyUndefined(this.mobileNumber)) {
        this.toastr.error("Please provide your mobile number");
        // } else if (this.mobileNumber.length != 10 || !(this.mobileNumber.charAt(0) == '8' || this.mobileNumber.charAt(0) == '7' || this.mobileNumber.charAt(0) == '9')) {
        //   this.toastr.error("Please provide valid mobile number");
      } else if (this.validation.isNullEmptyUndefined((this.mobileNumber.toString()).trim())) {
        this.toastr.error("Please Enter Mobile Number")
      } else if (this.validation.isNullEmptyUndefined(this.email)) {
        this.toastr.error("Please provide your email");
      }
    } else {
      if (this.StepCount == 6) {
        this.Submit();
      } else {
        if (this.StepCount < 8) {
          this.StepCount += 1;
          this.Steps = [];
          this.Steps[this.StepCount] = true;
        }
        if (this.StepCount == 7) {
          this.ShowNxtBtn = false;
        }
      }
    }
  }

  PreviousStep() {
    this.submitbtnLoading = false;
    this.ShowNxtBtn = true;
    if (this.StepCount > 0) {
      this.StepCount -= 1;
      this.Steps = [];
      this.Steps[this.StepCount] = true;
    } else {
      this.route.navigate(['/']);
    }
  }

  Submit() {
    this.otp1 = "";
    this.otp2 = "";
    this.otp3 = "";
    this.otp4 = "";
    this.otp5 = "";
    this.otp6 = "";
    this.submitbtnLoading = true;
    let data = new FormData();
    data.append("name", this.InvestmentType);
    data.append("type", this.InvestmentTypeId.toString());
    data.append("investmentMode", this.investmentMode.toString());
    data.append("targetAmount", (this.value22 - this.value21).toString());
    data.append("targetDate", this.targetDate);
    data.append("expectedCorpus", this.value21.toString());
    data.append("rateInflation", this.value24.toString());
    data.append("rateReturn", this.value23.toString());
    data.append("fullName", this.fullName);
    data.append("email", this.email);
    data.append("mobileNumber", this.mobileNumber);
    this.api.post('sipCalculator/goal-tools', data).subscribe(response => {
      this.submitbtnLoading = false;
      if (response.response.n == 1 && (!this.validation.isNullEmptyUndefined(response.data.monthly) || !this.validation.isNullEmptyUndefined(response.data.quarterly) || !this.validation.isNullEmptyUndefined(response.data.lumpsum)) && !this.validation.isNullEmptyUndefined(response.data.expectedCorpus)) {
        if (!this.validation.isNullEmptyUndefined(response.data.monthly)) {
          response.data.monthly = response.data.monthly.toFixed(2);
        } else if (!this.validation.isNullEmptyUndefined(response.data.quarterly)) {
          response.data.monthly = response.data.quarterly.toFixed(2);
        } else if (!this.validation.isNullEmptyUndefined(response.data.lumpsum)) {
          response.data.monthly = response.data.lumpsum.toFixed(2);
        }
        response.data.expectedCorpus = response.data.expectedCorpus.toFixed(2);
        this.ResponseData = response.data;
        $('#otp-screen').modal('show');
        $("#otp1").focus();
        $("#otp1").click();
        this.time = 180;
        this.showOtpinterval = true;
        this.Otpinterval = setInterval(() => {
          this.time--;
          if (this.time == 0) {
            this.showOtpinterval = false;
            clearInterval(this.Otpinterval);
          } else {
            var otprm = Math.floor(this.time % 3600 / 60).toString();
            var otprs = Math.floor(this.time % 3600 % 60).toString();
            otprs = otprs.length > 1 ? otprs : '0' + otprs;
            this.OtpResendTime = otprm + ":" + otprs;
          }
        }, 1000);
      } else {
        this.toastr.error(response.response.Msg);
      }
    });
  }

  changeOtpFocus(index: any, event: any) {
    let actionFlag = false;
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode < 96 || charCode > 105)) {
    }
    else if (charCode == 8) {
      index--;
      if (index < 1) {
        index = 1;
      }
      actionFlag = true;
    }
    else {
      index++;
      if (index > 6) {
        index = 6;
      }
      actionFlag = true;
    }
    if (actionFlag) {
      const field = document.getElementById("otp" + index);
      if (field) {
        field.focus();
        field.click();
      }

    }
  }
  verifyOtp() {
    if (!this.validation.isNullEmptyUndefined(this.otp1) && !this.validation.isNullEmptyUndefined(this.otp2) && !this.validation.isNullEmptyUndefined(this.otp3) && !this.validation.isNullEmptyUndefined(this.otp4) && !this.validation.isNullEmptyUndefined(this.otp5) && !this.validation.isNullEmptyUndefined(this.otp6)) {
      this.submitotpbtnLoading = true;
      const data = new FormData();
      data.append("email", this.email);
      data.append("otp", this.otp1 + this.otp2 + this.otp3 + this.otp4 + this.otp5 + this.otp6);
      this.api.post('auth/customer/ValidateOTP', data).subscribe(response => {
        this.otp1 = "";
        this.otp2 = "";
        this.otp3 = "";
        this.otp4 = "";
        this.otp5 = "";
        this.otp6 = "";
        this.submitotpbtnLoading = false;
        if (response.response.n == 1) {
          $('#otp-screen').modal('hide');
          this.StepCount += 1;
          this.Steps = [];
          this.Steps[this.StepCount] = true;
        } else {
          this.toastr.error(response.response.Msg);
        }
      });
    } else {
      this.toastr.error("Please enter valid OTP.");
    }
  }

}
