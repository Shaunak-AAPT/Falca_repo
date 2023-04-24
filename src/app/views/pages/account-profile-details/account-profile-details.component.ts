import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';
import { AESCryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-account-profile-details',
  templateUrl: './account-profile-details.component.html',
  styleUrls: ['./account-profile-details.component.css']
})
export class AccountProfileDetailsComponent implements OnInit {
  gendervalue: any;
  enableSavechanges: boolean = true;
  isDisabledPancard: boolean = false;
  isDisabledAadharcard: boolean = false;
  PreviousEmail: any;
  panCard: any;
  aadharCard: any;
  ProfileImage: any;
  ApplicantData: any = {
    "address1": "",
    "address2": "",
    "dob": "",
    "email": "",
    "firstName": "",
    "gender": "",
    "lastName": "",
    "middleName": "",
    "mobileNumber": "",
    "occupation": "",
    "profilePic": "",
    "referralCode": "",
    "panCard": "",
    "aadharCard": "",
    "blZip": "",
    "blCity": "",
    "blState": "",
    "blStateCode": "",
    "blCountry": "",
    "dlLine1": "",
    "dlLine2": "",
    "dlZip": "",
    "dlCity": "",
    "dlState": "",
    "dlStateCode": "",
    "dlCountry": "",
    "same_as_bd": false,
  };

  otp1: string = "";
  otp2: string = "";
  otp3: string = "";
  otp4: string = "";
  otp5: string = "";
  otp6: string = "";
  interval: any;
  resendbuttonText = 'Resend OTP';
  FromPath: any;
  WealthUrl = environment.WealthUrl;
  Token: any;

  constructor(public validate: ValidateService, private api: ApiService, private toastr: ToastrService, private route: Router, private crypto: AESCryptoService) { }

  ngOnInit(): void {
    this.DOB();
    if (localStorage.getItem("ApplicantData") != null) {
      this.ApplicantData = this.crypto.Decrypt(localStorage.getItem("ApplicantData"));
      console.log('app data', this.ApplicantData)
      this.PreviousEmail = this.ApplicantData.email;
      if (!this.validate.isNullEmptyUndefined(this.ApplicantData.profilePic)) {
        $("#profileimg").attr("src", this.ApplicantData.profilePic);
      }
      if (!this.validate.isNullEmptyUndefined(this.ApplicantData.aadharCard)) {
        this.isDisabledAadharcard = true;
        this.HideAadharNumber();
      }
      if (!this.validate.isNullEmptyUndefined(this.ApplicantData.panCard)) {
        this.isDisabledPancard = true;
        this.HidePanNumber();
      }
    }
    if (localStorage.getItem("FromPath") != null) {
      this.FromPath = this.crypto.Decrypt(localStorage.getItem('FromPath'))
      console.log(this.FromPath)
    }



  }
  DOB() {
    var year = new Date().getFullYear();
    var month = new Date().getMonth();
    var day = new Date().getDate();
    var date = new Date(year - 18, month, day);

    var monthbefore = (date.getMonth() + 1).toString();
    var daybefore = (date.getDate()).toString();
    var yearbefore = date.getFullYear();
    if (parseInt(monthbefore) < 10) {
      monthbefore = '0' + monthbefore.toString();
    }
    if (parseInt(daybefore) < 10) {
      daybefore = '0' + daybefore.toString();
    }
    var maxDate = yearbefore + '-' + monthbefore + '-' + daybefore;
    $('#dob').attr('max', maxDate);
  }

  HidePanNumber() {
    var mainStr = this.ApplicantData.panCard,
      vis = mainStr.slice(-2),
      countNum = '';
    for (var i = (mainStr.length) - 2; i > 0; i--) {
      countNum += 'X';
    }
    this.panCard = countNum + vis;
    // this.ApplicantData.panCard = this.ApplicantData.panCard.replace(/.(?=\d{4})/g, "#");    
  }

  HideAadharNumber() {
    var mainStr = this.ApplicantData.aadharCard,
      vis = mainStr.slice(-2),
      countNum = '';
    for (var i = (mainStr.length) - 2; i > 0; i--) {
      countNum += 'X';
    }
    this.aadharCard = countNum + vis;
    // this.ApplicantData.panCard = this.ApplicantData.panCard.replace(/.(?=\d{4})/g, "#");    
  }


  Checked() {
    if ($('input[name=consent1]').is(':checked')) {
      this.ApplicantData.same_as_bd = true;
    }
    else {
      this.ApplicantData.same_as_bd = false;
    }
    this.enableSavechanges = false;
  }

  GetCity(para: any) {
    if (this.ApplicantData.blZip.length == 6 && para == 'blZip') {
      let data = new FormData();
      data.append("pincode", this.ApplicantData.blZip);
      this.api.post("auth/customer/get-pincode", data).subscribe((resp) => {
        this.ApplicantData.blCity = resp.data.city;
        this.ApplicantData.blState = resp.data.state;
        this.ApplicantData.blCountry = resp.data.country;
        this.ApplicantData.blStateCode = resp.RtoLocations[0].code;
      });
    }
    else if (this.ApplicantData.dlZip.length == 6 && para == 'dlZip') {
      let data = new FormData();
      data.append("pincode", this.ApplicantData.dlZip);
      this.api.post("auth/customer/get-pincode", data).subscribe((resp) => {
        this.ApplicantData.dlCity = resp.data.city;
        this.ApplicantData.dlState = resp.data.state;
        this.ApplicantData.dlCountry = resp.data.country;
        this.ApplicantData.dlStateCode = resp.RtoLocations[0].code;
      });
    }
  }




  ValidateProfileDetails() {
    debugger
    var array = ['jpg', 'png', 'jpeg', 'webp'];
    let extension;
    if (!this.validate.isNullEmptyUndefined(this.ProfileImage)) {
      extension = this.ProfileImage.name?.split('.')[1];
      extension = extension?.toLowerCase();
    }

    if (this.validate.isNullEmptyUndefined(this.ApplicantData.firstName)) {
      this.toastr.error("First Name is Mandatory");
    }
    else if (this.validate.isNullEmptyUndefined(this.ApplicantData.lastName)) {
      this.toastr.error("Last Name is Mandatory");
    }
    else if (this.validate.isNullEmptyUndefined(this.ApplicantData.dob)) {
      this.toastr.error("Date of birth is Mandatory");
    }
    else if (this.validate.isNullEmptyUndefined(this.ApplicantData.email)) {
      this.toastr.error("Email id is Mandatory");
    }
    else if (!this.validate.validateEmail(this.ApplicantData.email)) {
      this.toastr.error("Enter valid Email id");
    }
    else if (this.validate.isNullEmptyUndefined((this.ApplicantData.mobileNumber.toString()).trim())) {
      this.toastr.error("Mobile Number is Mandatory");
    }
    else if (!this.validate.validateMobileNumber(this.ApplicantData.mobilenumber.trim())) {
      this.toastr.error("Please enter valid Mobile number");
    }
    else if (this.validate.isNullEmptyUndefined(this.ApplicantData.gender)) {
      this.toastr.error("Gender is Mandatory");
    }
    // else if (this.validate.isNullEmptyUndefined(this.ApplicantData.profilePic)) {
    //   this.toastr.error("Please select Profile Image");
    // }
    else if (!this.validate.isNullEmptyUndefined(this.ProfileImage) && (array.indexOf(extension) <= -1)) {
      this.toastr.error("Please select valid file for Profile Image");
    }
    else if (this.isDisabledPancard == false && this.validate.isNullEmptyUndefined(this.panCard)) {
      this.toastr.error("Pan Card is Mandatory");
    }
    else if (this.isDisabledPancard == false && !this.validate.validatePancard(this.panCard)) {
      this.toastr.error("Enter valid Pan Card");
    }
    else if (this.isDisabledAadharcard == false && this.validate.isNullEmptyUndefined(this.aadharCard)) {
      this.toastr.error("Aadhar Card is Mandatory");
    }
    else if (this.isDisabledAadharcard == false && !this.validate.validateAadharNumber(this.aadharCard)) {
      this.toastr.error("Enter valid Aadhar Card");
    }
    else if (this.validate.isNullEmptyUndefined(this.ApplicantData.address1)) {
      this.toastr.error("Please enter your billing address");
    }
    else if (this.validate.isNullEmptyUndefined(this.ApplicantData.blZip)) {
      this.toastr.error("Please enter your billing pincode");
    }
    else if (this.validate.isNullEmptyUndefined(this.ApplicantData.blCity)) {
      this.toastr.error("Please enter valid billing pincode");
    }
    else if (this.validate.isNullEmptyUndefined(this.ApplicantData.blState)) {
      this.toastr.error("Please enter your billing State");
    }
    else if (this.validate.isNullEmptyUndefined(this.ApplicantData.blCountry)) {
      this.toastr.error("Please enter your billing Country");
    }
    else if (this.ApplicantData.same_as_bd == false && this.validate.isNullEmptyUndefined(this.ApplicantData.dlLine1)) {
      this.toastr.error("Please enter your delivery address");
    }
    else if (this.ApplicantData.same_as_bd == false && this.validate.isNullEmptyUndefined(this.ApplicantData.dlZip)) {
      this.toastr.error("Please enter your delivery pincode");
    }
    else if (this.ApplicantData.same_as_bd == false && this.validate.isNullEmptyUndefined(this.ApplicantData.dlCity)) {
      this.toastr.error("Please enter valid delivery pincode");
    }
    else if (this.ApplicantData.same_as_bd == false && this.validate.isNullEmptyUndefined(this.ApplicantData.dlState)) {
      this.toastr.error("Please enter your delivery State");
    }
    else if (this.ApplicantData.same_as_bd == false && this.validate.isNullEmptyUndefined(this.ApplicantData.dlCountry)) {
      this.toastr.error("Please enter your delivery Country");
    }


    else {

      $("#update_changes").modal("show");
    }
  }

  SendOTP() {
    let data = new FormData();
    data.append("email", this.PreviousEmail);
    this.api.post("auth/customer/send-otp", data).subscribe(response => {
      if (response.response.n == 1) {
        $("#update_changes").modal("hide");
        this.ResetOTP();
        $("#otp-screen").modal("show");
        this.resendbuttonText = "0:60"
        this.countdown();
        // console.log("SendOTP", response.data.otp)
      }
    })
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
    if (actionFlag) {
      const field = document.getElementById("otp" + nextTabId);
      if (field) {
        field.focus();
        field.click();
      }
    }
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

  ResendOTP() {
    this.ResetOTP();
    const data = new FormData();
    data.append("email", this.PreviousEmail);
    this.api.post('auth/customer/send-otp', data, false).subscribe(response => {
      if (response.response.n == 1) {
        // console.log(response.data.otp);
        // this.toastr.success(response.data.otp);
        this.resendbuttonText = "0:60";
        this.countdown();
      }
      else{
        this.toastr.error(response.response.Msg);
      }
    })
  }

  ResetOTP() {
    // debugger
    this.otp1 = "";
    this.otp2 = "";
    this.otp3 = "";
    this.otp4 = "";
    this.otp5 = "";
    this.otp6 = "";
  }

  
  

  verifyOtp() {
    var otp = this.otp1.toString() + this.otp2.toString() + this.otp3.toString() + this.otp4.toString() + this.otp5.toString() + this.otp6.toString();
    // console.log("OTP", otp);
    if (otp.length == 6) {
      let data = new FormData();
      data.append("email", this.PreviousEmail);
      data.append("otp", otp);
      this.api.post("auth/customer/ValidateOTP", data).subscribe((resp) => {
        // console.log("verifyOtp", resp);
        if (resp.response.n == 1) {
          if (!this.validate.isNullEmptyUndefined(resp.data.token.customer)) {
            var encryptedTokenCustomer = { "token": resp.data.token.customer };
            localStorage.setItem("CustToken", this.crypto.Encrypt(encryptedTokenCustomer));
          }
          if (!this.validate.isNullEmptyUndefined(resp.data.token.agent)) {
            var encryptedTokenAgent = { "token": resp.data.token.agent };
            localStorage.setItem("AgentToken", this.crypto.Encrypt(encryptedTokenAgent));
          }
          // localStorage.setItem("CustToken", this.crypto.Encrypt(resp.data));
          this.UpdateProfile();
        } else {
          this.toastr.error(resp.response.Msg);
        }
      });
    } else {
      this.toastr.error("kindly enter valid otp");
    }
  }

  UpdateProfile() {

    if (this.isDisabledAadharcard == false) {
      this.ApplicantData.aadharCard = this.aadharCard;
    }
    if (this.isDisabledPancard == false) {
      this.ApplicantData.panCard = this.panCard;
    }

    if (this.ApplicantData.same_as_bd == true) {
      this.ApplicantData.dlLine1 = this.ApplicantData.address1;
      this.ApplicantData.dlLine2 = this.ApplicantData.address2;
      this.ApplicantData.dlZip = this.ApplicantData.blZip;
      this.ApplicantData.dlCity = this.ApplicantData.blCity;
      this.ApplicantData.dlState = this.ApplicantData.blState;
      this.ApplicantData.dlCountry = this.ApplicantData.blCountry;
      this.ApplicantData.dlStateCode = this.ApplicantData.blStateCode;
    }
    this.ApplicantData.profilePic = this.ProfileImage;

    const data = {
      "firstName": this.ApplicantData.firstName,
      "lastName": this.ApplicantData.lastName,
      "mobileNumber": this.ApplicantData.mobileNumber.toString(),
      "email": this.ApplicantData.email,
      "dob": this.ApplicantData.dob,
      "panCard": this.ApplicantData.panCard,
      "aadharCard": this.ApplicantData.aadharCard,
      "gender": this.ApplicantData.gender,
      "billingAddress": {
        "line1": this.ApplicantData.address1,
        "line2": this.ApplicantData.address2,
        "city": this.ApplicantData.blCity,
        "state": this.ApplicantData.blState,
        "zip": this.ApplicantData.blZip,
        "country": this.ApplicantData.blCountry,
        "mobileNumber": this.ApplicantData.mobileNumber.toString(),
        "statecode": this.ApplicantData.blStateCode
      },
      "deliveryAddress": {
        "line1": this.ApplicantData.dlLine1,
        "line2": this.ApplicantData.dlLine2,
        "city": this.ApplicantData.dlCity,
        "state": this.ApplicantData.dlState,
        "zip": this.ApplicantData.dlZip,
        "country": this.ApplicantData.dlCountry,
        "mobileNumber": this.ApplicantData.mobileNumber.toString(),
        "statecode": this.ApplicantData.dlStateCode
      }
    }

    console.log("data", data);
    this.api.post("digitalGold/customer/create-profile", data, true).subscribe(response => {
      if (response.response.n == 1) {
        this.enableSavechanges = true;
        $("#otp-screen").modal("hide");
        this.toastr.success(response.response.Msg);
        this.GetApplicantData();
        debugger
        if (!this.validate.isNullEmptyUndefined(this.FromPath)) {
          this.GotoWealth();
        }
      }
      else{
        this.toastr.error(response.response.Msg);
      }
    })
  }

  GotoWealth() {
    this.Token = localStorage.getItem("CustToken");
    this.WealthUrl = environment.WealthUrl.replace("{TOKEN}", encodeURIComponent(this.Token));
    this.WealthUrl = this.WealthUrl.replace("{PATH}", encodeURIComponent(this.FromPath));
    this.WealthUrl = this.WealthUrl.replace("{DG}", "true")
    debugger
    window.location.href = this.WealthUrl;
  }

  GetApplicantData() {
    this.api.get("auth/customer/user", true).subscribe(response => {
      localStorage.setItem("ApplicantData", this.crypto.Encrypt(response.data));
    })
  }

  EditNumber() {
    $('#otp-screen').modal('hide');
    $('#email_id').focus();
  }

  uploadFile($event: any) {
    var reader = new FileReader();
    reader.readAsDataURL($event.target.files[0]);
    reader.onload = function () {
      var ThumbnailBase64 = reader.result;
      // console.log("thumbnail ", ThumbnailBase64);
      $("#profileimg").attr("src", ThumbnailBase64);
    }
    // console.log("event", $event.target.files[0]); // outputs the first file
    this.ProfileImage = $event.target.files[0];
    // console.log("event", this.ProfileImage);

    if (this.validate.isNullEmptyUndefined(this.ApplicantData.profilePic)) {
      this.ApplicantData.profilePic = this.ProfileImage;
    }
  }



  // UpdateProfile() {

  //   if(this.isDisabledAadharcard == false){
  //     this.ApplicantData.aadharCard = this.aadharCard;
  //   }
  //   if(this.isDisabledPancard == false){
  //     this.ApplicantData.panCard = this.panCard;
  //   }

  //   if (this.ApplicantData.same_as_bd == true) {
  //     this.ApplicantData.address1 = this.ApplicantData.dlLine1;
  //     this.ApplicantData.address2 = this.ApplicantData.dlLine2;
  //     this.ApplicantData.blZip = this.ApplicantData.dlZip;
  //     this.ApplicantData.blCity = this.ApplicantData.dlCity;
  //     this.ApplicantData.blState = this.ApplicantData.dlState;
  //     this.ApplicantData.blCountry = this.ApplicantData.dlCountry;
  //   }
  //   this.ApplicantData.profilePic = this.ProfileImage;
  //   let data = new FormData();
  //   data.append("firstName", this.ApplicantData.firstName);
  //   data.append("lastName", this.ApplicantData.lastName);
  //   data.append("dob", this.ApplicantData.dob);
  //   data.append("email", this.ApplicantData.email);
  //   data.append("mobileNumber", this.ApplicantData.mobileNumber);
  //   data.append("gender", this.ApplicantData.gender);
  //   // data.append("panCard", this.ApplicantData.panCard);
  //   data.append("profilePic", this.ApplicantData.profilePic);

  //   this.api.post("auth/customer/user", data, true).subscribe((resp) => {
  //     if (resp.response.n == 1) {
  //       this.enableSavechanges = true;
  //       $("#otp-screen").modal("hide");
  //       this.toastr.success(resp.response.Msg);
  //       this.GetApplicantData();
  //     }
  //   })
  // }

}
