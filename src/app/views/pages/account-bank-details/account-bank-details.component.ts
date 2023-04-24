import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';
import { AESCryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
declare var $: any;
@Component({
  selector: 'app-account-bank-details',
  templateUrl: './account-bank-details.component.html',
  styleUrls: ['./account-bank-details.component.css']
})
export class AccountBankDetailsComponent implements OnInit {

  SecondaryBankAccount: boolean = false;
  AddBankAccount: boolean = false;
  BankDetailsList: any = [];

  AccountNumber: any;
  AccountHoldersName: any;
  BankName: any;
  IFSCCode: any;
  AccountType: any;
  Branch: any;

  bankid: any;
  i: any;

  constructor(public validation: ValidateService, private toastr: ToastrService, private api: ApiService, private route: Router, private crypto: AESCryptoService) { }

  ngOnInit(): void {
    this.GetBankDetails();
  }

  GetBankDetails() {
    this.api.get("auth/customer/add-bank", true).subscribe(response => {
      // console.log(response)
      if (response.response.n == 1) {
        this.BankDetailsList = response.data;
      }
      else {
        this.AddBankAccount = true;
      }
    })
  }

  AddBankDetails() {
    if (this.validation.isNullEmptyUndefined(this.AccountNumber)) {
      this.toastr.error("Account Number is mandatory");
    }
    else if (this.validation.isNullEmptyUndefined(this.AccountHoldersName)) {
      this.toastr.error("Account Holders Name is mandatory");
    }
    else if (this.validation.isNullEmptyUndefined(this.BankName)) {
      this.toastr.error("Bank Name is mandatory");
    }
    else if (this.validation.isNullEmptyUndefined(this.IFSCCode)) {
      this.toastr.error("IFSC Code is mandatory");
    }
    else if (this.validation.isNullEmptyUndefined(this.AccountType)) {
      this.toastr.error("Account Type is mandatory");
    }
    else if (this.validation.isNullEmptyUndefined(this.Branch)) {
      this.toastr.error("Branch is mandatory");
    }
    else {
      let Data = new FormData();
      Data.append("account_number", this.AccountNumber);
      Data.append("account_holder_name", this.AccountHoldersName);
      Data.append("bank_name", this.BankName);
      Data.append("IFSC_name", this.IFSCCode);
      Data.append("branch_name", this.Branch);
      Data.append("account_type", this.AccountType);
      this.api.post('auth/customer/add-bank', Data, true).subscribe(response => {
        if (response.response.n == 1) {
          this.AddBankAccount = false;
          this.GetBankDetails();
        }
        else {
          this.toastr.error(response.response.Msg);
        }
      })
    }
  }

  OpenModal(bankid: any, i: any) {
    // debugger
    this.bankid = bankid;
    this.i = i;
    $('#set-as-default').modal('show');
  }

  MakePrimaryBank() {
    let Data = new FormData();
    Data.append("bankId", this.bankid);
    this.api.post('auth/customer/primary-account-change', Data, true).subscribe(response => {
      if (response.response.n == 1) {
        // this.toastr.success(response.response.Msg);
        this.BankDetailsList[this.i].primary_account = true;
        for (let j = 0; j < this.BankDetailsList.length; j++) {
          if (this.BankDetailsList[j].id != this.bankid) {
            this.BankDetailsList[j].primary_account = false;
          }
        }
        $('#set-as-default').modal('hide');
      }
      else {
        this.toastr.error(response.response.Msg);
      }
    })
  }

}
