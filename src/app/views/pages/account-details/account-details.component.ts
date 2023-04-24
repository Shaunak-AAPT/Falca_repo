import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { AESCryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { EligibilityService } from 'src/app/services/eligibility/eligibility.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  LiabilitiesList: any = [];
  LiabilitiesCount: any;
  InsuranceCount: any;
  InvestmentsCount: any;
  InsuranceList: any;
  DiGiGoldDetails: any;


  constructor(public validation: ValidateService, private eligibilityService: EligibilityService, private api: ApiService, private route: Router, private crypto: AESCryptoService) { }

  ngOnInit(): void {

    $(".body-color").scroll(function () {
      if ($(".body-color").scrollTop() > 150) {
        $('#sidebar').css('position', 'fixed');
        $('#sidebar').css('top', '5%');
        $('#sidebar').css('width', $("#sidebar-main").width() + 'px');
      }
      else if ($(".body-color").scrollTop() <= 150) {
        $('#sidebar').css('position', '');
        $('#sidebar').css('top', '');
        $('#sidebar').css('width', '');
      }
      if ($('#sidebar').offset().top + $("#sidebar").height() > $("#footer").offset().top - 100) {
        $('#sidebar').css('top', -($("#sidebar").offset().top + $("#sidebar").height() - $("#footer").offset().top + 100));
      }
    });
    this.GetCounts();
    this.GetLiabilities();
    this.GetInsuranceList();
    this.GetMyInvestments();
  }

  GetCounts() {
    this.api.get('dashboard/get-dashboard', true).subscribe(response => {
      if (response.response.n == 1) {
        this.LiabilitiesCount = response.liabilities;
        this.InsuranceCount = response.Insurances;
        this.InvestmentsCount = response.Investment;
        // console.log('InsuranceCount',this.InsuranceCount);
        // this.GetInRupeeFormat(this.LiabilitiesCount);
        // alert(this.GetInRupeeFormat(this.LiabilitiesCount))
      }
    })
  }

  GetInRupeeFormat(x: any) {

    x = x.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != '')
      lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    // alert(res);
    return res;
  }

  GetLiabilities() {
    this.api.get('dashboard/get-pending-products', true).subscribe(response => {
      if (response.response.n == 1) {
        // console.log(response)
        this.LiabilitiesList = response.data;
        // console.log(this.LiabilitiesList)
      }
    })
  }

  // GetLiabilities() {
  //   this.api.get('dashboard/get-credit-products?application_status=&loan_type=', true).subscribe(response => {
  //     if (response.response.n == 1) {
  //       console.log(response)
  //       this.LiabilitiesList = response.data;
  //       this.LiabilitiesCount = response.liabilitiesCount;
  //       // console.log(this.LiabilitiesList)
  //     }
  //   })
  // }

  UpdateOfflineLoan(modal: any) {
    // console.log('modal', modal.id);
    if (modal.offline == true) {
      this.route.navigate(['/update-loan-details/' + modal.id]);
    }
  }


  GetInsuranceList() {
    let Data = new FormData();
    Data.append('insurance_product', '');
    this.api.post("insurance/common/get-active-products-insurance", Data, true).subscribe(response => {
      console.log('GetInsuranceList', response);
      if (response.response.n == 1) {
        this.InsuranceList = response.data;
      }
    })
  }
  GetMyInvestments() {
    this.GetDigiGoldDetails();
  }

  GetDigiGoldDetails() {
    this.api.get("digitalGold/oat/get-portfolio-balance", true).subscribe(resp => {
      console.log('digitalGold/oat/get-portfolio-balance', resp)
      if (resp.response.n == 1) {
        this.DiGiGoldDetails = resp.data;
      }
    })

  }
  praposeNumber: any;
  GetActivePraposer(list: any) {
    debugger;
    this.praposeNumber = list;
    this.eligibilityService.setSessionParams("ActivePraposer", this.praposeNumber);
    this.route.navigateByUrl('/active-insurance');
  }

  Token: any;
  InsuranceUrl = environment.InsuranceUrl;

  InsurancetRouterUrl() {
    this.Token = localStorage.getItem("CustToken");
    this.InsuranceUrl = environment.InsuranceUrl.replace("{TOKEN}", encodeURIComponent(this.Token));
    this.InsuranceUrl = this.InsuranceUrl.replace("{PATH}", encodeURIComponent('/account-details'));
    window.location.href = this.InsuranceUrl;
  }



}


