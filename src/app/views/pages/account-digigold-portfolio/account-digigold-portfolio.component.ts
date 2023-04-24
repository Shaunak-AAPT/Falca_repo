import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { AESCryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
declare var $: any;

@Component({
  selector: 'app-account-digigold-portfolio',
  templateUrl: './account-digigold-portfolio.component.html',
  styleUrls: ['./account-digigold-portfolio.component.css']
})
export class AccountDigigoldPortfolioComponent implements OnInit {

  DiGiGoldDetails: any;
  ListDetails: any;
  ListDetailsPageIndex: number = 1;

  constructor(public validation: ValidateService, private api: ApiService, private route: Router, private crypto: AESCryptoService) { }

  ngOnInit(): void {
    this.scrolltotop();
    this.GetDigiGoldDetails();
    this.GetPortfolioDetails();
  }
  scrolltotop() {
    $('.body-color').animate({
      scrollTop: 0
    }, 0);
  }

  GetDigiGoldDetails() {
    this.api.get("digitalGold/oat/get-portfolio-balance", true).subscribe(resp => {
      console.log('digitalGold/oat/get-portfolio-balance', resp)
      if (resp.response.n == 1) {
        this.DiGiGoldDetails = resp.data;
      }
    })
  }

  GetPortfolioDetails() {
    this.api.get("digitalGold/oat/get-customer-detail", true).subscribe(resp => {
      console.log('digitalGold/oat/get-customer-detail', resp)
      if (resp.response.n == 1) {
        this.ListDetails = resp.data;
      }
    })
  }



}
