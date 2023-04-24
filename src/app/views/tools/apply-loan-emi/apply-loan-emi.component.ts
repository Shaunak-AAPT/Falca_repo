import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';
import { AESCryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
declare var $: any;
@Component({
  selector: 'app-apply-loan-emi',
  templateUrl: './apply-loan-emi.component.html',
  styleUrls: ['./apply-loan-emi.component.css']
})
export class ApplyLoanEmiComponent implements OnInit {

  FullName = "";
  Mobile = "";
  Email = "";
  DOB = "";
  loanData: any;
  otp1: string = "";
  otp2: string = "";
  otp3: string = "";
  otp4: string = "";
  otp5: string = "";
  otp6: string = "";
  submitbtnLoading = false;
  submitotpbtnLoading = false;
  Otpinterval: any;
  time = 180;
  OtpResendTime: string = "";
  showOtpinterval = false;
  eighteenYearsAgo: any = new Date();
  ApplicantData: any;

  constructor(private api: ApiService, private toastr: ToastrService, public validation: ValidateService, private route: Router, private datepipe: DatePipe, private crypto: AESCryptoService) { }

  ngOnInit(): void {
    if (localStorage.getItem("loanData")) {
      this.loanData = JSON.parse(localStorage.getItem("loanData") || '{}');
    } else {
      this.route.navigate(['']);
    }
    this.eighteenYearsAgo.setTime(this.eighteenYearsAgo.valueOf() - 18 * 365 * 24 * 60 * 60 * 1000);
    this.eighteenYearsAgo = this.datepipe.transform(this.eighteenYearsAgo, 'yyyy-MM-dd');

    if (localStorage.getItem("ApplicantData") != null) {
      this.ApplicantData = this.crypto.Decrypt(localStorage.getItem("ApplicantData"));
      this.getPrefilledData();
    }
  }

  getPrefilledData() {
    this.FullName = this.ApplicantData.firstName + ' ' + this.ApplicantData.lastName;
    this.Mobile = this.ApplicantData.mobileNumber;
    this.Email = this.ApplicantData.email;
    this.DOB = this.ApplicantData.dob;
  }

  submit() {
    if (this.validation.isNullEmptyUndefined(this.FullName.trim())) {
      this.toastr.error("Please Enter Full Name")
      // }else if(this.Mobile.length != 10 || !(this.Mobile.charAt(0) == '8' || this.Mobile.charAt(0) == '7' || this.Mobile.charAt(0) == '9')){
      //   this.toastr.error("Please Enter Mobile Number")
    } else if (this.validation.isNullEmptyUndefined((this.Mobile.toString()).trim())) {
      this.toastr.error("Please Enter Mobile Number")
    } else if (this.validation.isNullEmptyUndefined(this.Email.trim())) {
      this.toastr.error("Please Enter Email")
    } else if (!this.validation.validateEmail(this.Email)) {
      this.toastr.error("Please Enter valid Email")
    } else if (this.validation.isNullEmptyUndefined(this.DOB)) {
      this.toastr.error("Please Enter Date Of Birth")
    } else {
      this.submitbtnLoading = true;
      let data = new FormData();
      data.append("roi", this.loanData.value3.toString());
      data.append("loanAmount", this.loanData.value1.toString());
      data.append("tenure", this.loanData.value2.toString());
      data.append("fullName", this.FullName);
      data.append("mobileNumber", this.Mobile);
      data.append("email", this.Email);
      data.append("dob", this.DOB);
      data.append("isSubmit", "1");
      data.append("category", this.loanData.category);
      this.api.post('emi/calculate-emi', data).subscribe(response => {
        this.submitbtnLoading = false;
        if (response.response.n == 1) {
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
          this.toastr.error(response.response.Msg)
        }
      });
    }
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
      data.append("email", this.Email);
      data.append("otp", this.otp1 + this.otp2 + this.otp3 + this.otp4 + this.otp5 + this.otp6);
      this.api.post('auth/customer/ValidateOTP', data).subscribe(response => {
        this.submitotpbtnLoading = false;
        if (response.response.n == 1) {
          $('#otp-screen').modal('hide');
          $('#thank-you').modal('show');
          this.resetFields();
          sessionStorage.clear();
        } else {
          this.toastr.error(response.response.Msg);
        }
      });
    } else {
      this.toastr.error("Please enter valid OTP.");
    }
  }

  resetFields() {
    this.Email = "";
    this.Mobile = "";
    this.DOB = "";
    this.FullName = "";
  }

}
