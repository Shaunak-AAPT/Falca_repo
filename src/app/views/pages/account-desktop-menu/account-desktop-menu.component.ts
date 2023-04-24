import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';
import { AESCryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { EligibilityService } from 'src/app/services/eligibility/eligibility.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
declare var $: any;
@Component({
  selector: 'app-account-desktop-menu',
  templateUrl: './account-desktop-menu.component.html',
  styleUrls: ['./account-desktop-menu.component.css']
})
export class AccountDesktopMenuComponent implements OnInit {
  selectedItem: any;
  ApplicantData: any;
  oldToken: any;
  newToken: any;


  constructor(public validate: ValidateService, private api: ApiService, private toastr: ToastrService, public route: Router, private crypto: AESCryptoService, private eligibility: EligibilityService) { }

  ngDoCheck(): void {
    var objToken = this.eligibility.getSessionParams('CustToken');
    if (!this.validate.isNullEmptyUndefined(objToken)) {
      this.newToken = objToken.token;
    }
    if (this.newToken != this.oldToken) {
      this.oldToken = this.newToken;
      if (localStorage.getItem("ApplicantData") != null) {
        this.ApplicantData = this.crypto.Decrypt(localStorage.getItem("ApplicantData"));
        if (!this.validate.isNullEmptyUndefined(this.ApplicantData.profilePic)) {
          $("#profile").attr("src", this.ApplicantData.profilePic);
        }
      }

    }
  }
  ngOnInit(): void {
  }

}
