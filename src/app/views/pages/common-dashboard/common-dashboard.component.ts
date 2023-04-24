import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/services/api/api.service';
import { AESCryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-common-dashboard',
  templateUrl: './common-dashboard.component.html',
  styleUrls: ['./common-dashboard.component.css']
})
export class CommonDashboardComponent implements OnInit {

  customOptions: OwlOptions = {
    items: 3,
    margin: 3,
    loop: true,
    stagePadding: 64,
    responsive: {
      0: {
        items: 1,
        stagePadding: 10
      },
      480: {
        items: 1,
        stagePadding: 30
      },
      600: {
        items: 2,
        stagePadding: 30
      },
      1000: {
        items: 3,
        stagePadding: 0
      },
      1200: {
        items: 3
      }
    },
    nav: true,
    navText: ["<img src='assets/img/arrow_left.svg'>", "<img src='assets/img/arrow_right.svg'>"],
    dots: false,
    dotsEach: true,
    lazyLoad: false,
    autoplay: true,
    autoplaySpeed: 500,
    navSpeed: 500,
    autoplayTimeout: 5000,
    autoplayHoverPause: true
  }
  customOptions2: OwlOptions = {
    items: 3,
    margin: 3,
    loop: false,
    stagePadding: 10,
    responsive: {
      0: {
        items: 1,
        stagePadding: 10
      },
      480: {
        items: 1,
        stagePadding: 30
      },
      600: {
        items: 2,
        stagePadding: 30
      },
      1000: {
        items: 3
      },
      1200: {
        items: 3
      }
    },
    nav: true,
    navText: ["<img src='assets/img/arrow_left.svg'>", "<img src='assets/img/arrow_right.svg'>"],
    dots: false,
    dotsEach: true,
    lazyLoad: false,
    autoplay: false,
    autoplaySpeed: 500,
    navSpeed: 500,
    autoplayTimeout: 5000,
    autoplayHoverPause: true
  }
  customOptions3: OwlOptions = {
    items: 3,
    margin: 3,
    loop: false,
    stagePadding: 10,
    responsive: {
      0: {
        items: 1,
        stagePadding: 10
      },
      480: {
        items: 1,
        stagePadding: 10
      },
      600: {
        items: 2,
        stagePadding: 10
      },
      1000: {
        items: 3
      },
      1200: {
        items: 3
      }
    },
    nav: true,
    navText: ["<img src='assets/img/arrow_left.svg'>", "<img src='assets/img/arrow_right.svg'>"],
    dots: false,
    dotsEach: true,
    lazyLoad: false,
    autoplay: true,
    autoplaySpeed: 500,
    navSpeed: 500,
    autoplayTimeout: 5000,
    autoplayHoverPause: true
  }
  customOptions4: OwlOptions = {
    items: 3,
    margin: 3,
    loop: false,
    stagePadding: 64,
    responsive: {
      0: {
        items: 1,
        stagePadding: 10
      },
      480: {
        items: 1,
        stagePadding: 30
      },
      600: {
        items: 2,
        stagePadding: 30
      },
      1000: {
        items: 3
      },
      1200: {
        items: 3
      }
    },
    nav: true,
    navText: ["<img src='assets/img/arrow_left.svg'>", "<img src='assets/img/arrow_right.svg'>"],
    dots: false,
    dotsEach: true,
    lazyLoad: false,
    autoplay: true,
    autoplaySpeed: 500,
    navSpeed: 500,
    autoplayTimeout: 5000,
    autoplayHoverPause: true
  }
  customOptions5: OwlOptions = {
    items: 3,
    margin: 3,
    loop: false,
    stagePadding: 64,
    responsive: {
      0: {
        items: 1,
        stagePadding: 10
      },
      480: {
        items: 1,
        stagePadding: 30
      },
      600: {
        items: 2,
        stagePadding: 30
      },
      1000: {
        items: 3
      },
      1200: {
        items: 3
      }
    },
    nav: true,
    navText: ["<img src='assets/img/arrow_left.svg'>", "<img src='assets/img/arrow_right.svg'>"],
    dots: false,
    dotsEach: true,
    lazyLoad: false,
    autoplay: false,
    autoplaySpeed: 500,
    navSpeed: 500,
    autoplayTimeout: 5000,
    autoplayHoverPause: true
  }
  customOptions6: OwlOptions = {
    items: 3,
    margin: 3,
    loop: false,
    stagePadding: 64,
    responsive: {
      0: {
        items: 1,
        stagePadding: 10
      },
      480: {
        items: 1,
        stagePadding: 30
      },
      600: {
        items: 2,
        stagePadding: 30
      },
      1000: {
        items: 3
      },
      1200: {
        items: 3
      }
    },
    nav: true,
    navText: ["<img src='assets/img/arrow_left.svg'>", "<img src='assets/img/arrow_right.svg'>"],
    dots: false,
    dotsEach: true,
    lazyLoad: false,
    autoplay: false,
    autoplaySpeed: 500,
    navSpeed: 500,
    autoplayTimeout: 5000,
    autoplayHoverPause: true
  }

  customOptions7: OwlOptions = {
    items: 3,
    margin: 3,
    loop: false,
    stagePadding: 10,
    responsive: {
      0: {
        items: 1,
        stagePadding: 10
      },
      480: {
        items: 1,
        stagePadding: 10
      },
      600: {
        items: 2,
        stagePadding: 10
      },
      1000: {
        items: 3
      },
      1200: {
        items: 3
      }
    },
    nav: true,
    navText: ["<img src='assets/img/arrow_left.svg'>", "<img src='assets/img/arrow_right.svg'>"],
    dots: false,
    dotsEach: true,
    lazyLoad: false,
    autoplay: true,
    autoplaySpeed: 500,
    navSpeed: 500,
    autoplayTimeout: 5000,
    autoplayHoverPause: true
  }

  SelectedTab: any = 'MyInvestments';

  CreditUrl = environment.CreditUrl;
  WealthUrl = environment.WealthUrl;
  InsuranceUrl = environment.InsuranceUrl;

  MyFunds: boolean = false;
  MyPolicies: boolean = true;
  MyLoans: boolean = true;

  ApplicantData: any;
  Token: any;

  CreditOfferRecommendationList: any;
  LiabilitiesList: any = [];
  LiabilitiesForBinding: any;
  purpose_of_loan: any = "";
  AllLoanList: any;
  PersonalLoanList: any;
  HomeLoanList: any;
  EducationalLoanList: any;
  BusinesLoanList: any;
  LAPList: any;
  LiabilitiesCount: any;
  InsuranceCount: any;
  InvestmentsCount: any;
  actionslideno: any = 1;

  constructor(public validation: ValidateService, private api: ApiService, private route: Router, private crypto: AESCryptoService) { }

  ngDoCheck() {
    let slides = document.querySelectorAll('.caouselcard');
    for (let i = 0; i < slides.length; i++) {
      for (let j = 0; j < slides[i].parentElement?.classList.length!; j++) {
        if (slides[i].parentElement?.classList[j] == "active") {
            this.actionslideno = slides[i].id;
           }
      }
    }
  }

  // ngAfterViewInit(){
  //   let slides = document.querySelectorAll('.caouselcard');

  //   console.log(slides);
  //   for (let i = 0; i < slides.length; i++) {
  //     for (let j = 0; j < slides[i].parentElement?.classList.length!; j++) {
  //       if (slides[i].parentElement?.classList[j] == "active") {
  //           this.actionslideno = slides[i].id;
  //          }
  //     }
  //   }
  // }

  ngOnInit(): void {
    debugger;
    if (localStorage.getItem("ApplicantData") != null) {
      this.ApplicantData = this.crypto.Decrypt(localStorage.getItem("ApplicantData"));
    }
    this.GetOfferRecommendationsForLiablibities();
    this.GetCounts();
    this.GetLiabilities();
    this.GetInsuranceList();
  }

  GetCounts() {
    this.api.get('dashboard/get-dashboard', true).subscribe(response => {
      if (response.response.n == 1) {
        this.LiabilitiesCount = response.liabilities;
        this.InsuranceCount = response.Insurances;
        this.InvestmentsCount = response.Investment;
      }
    })
  }


  GotoCredit() {
    this.Token = localStorage.getItem("CustToken");
    this.CreditUrl = environment.CreditUrl.replace("{TOKEN}", encodeURIComponent(this.Token));
    window.location.href = this.CreditUrl;
  }

  GotoWealth() {
    this.Token = localStorage.getItem("CustToken");
    this.WealthUrl = environment.WealthUrl.replace("{TOKEN}", encodeURIComponent(this.Token));
    window.location.href = this.WealthUrl;
  }

  GotoInsurance(para:any) {
    this.Token = localStorage.getItem("CustToken");
    this.InsuranceUrl = environment.InsuranceUrl.replace("{TOKEN}", encodeURIComponent(this.Token));
    this.InsuranceUrl = this.InsuranceUrl.replace("{PATH}", encodeURIComponent(para));
    window.location.href = this.InsuranceUrl;
  }

  handleOpenCloseNotif() {
    if (document.getElementById("notification-bar")!.classList.contains("show-notif-nav")) {
      document.getElementById("notification-bar")!.classList.remove("show-notif-nav");
    } else {
      document.getElementById("notification-bar")!.classList.add("show-notif-nav");
    }
  }

  GetOfferRecommendationsForLiablibities() {
    this.api.get('dashboard/get-credit-products?application_status=&loan_type=', true).subscribe(response => {
      if (response.response.n == 1) {
        this.CreditOfferRecommendationList = response.data;
      }
    })
  }

  GetLiabilities() {
    this.api.get('dashboard/get-credit-products?application_status=&loan_type=', true).subscribe(response => {
      if (response.response.n == 1) {
        this.LiabilitiesList = response.data;
        this.GetFilteredLiabilitiesForCount();
        this.GetLiabilitiesForList('');
      }
    })
  }

  GetFilteredLiabilitiesForCount() {
    this.AllLoanList = this.LiabilitiesList.filter(function (liability: any) {
      return liability;
    });

    this.PersonalLoanList = this.LiabilitiesList.filter(function (liability: any) {
      return liability.loan_type == 1;
    });

    this.HomeLoanList = this.LiabilitiesList.filter(function (liability: any) {
      return liability.loan_type == 2;
    });

    this.EducationalLoanList = this.LiabilitiesList.filter(function (liability: any) {
      return liability.loan_type == 3;
    });

    this.BusinesLoanList = this.LiabilitiesList.filter(function (liability: any) {
      return liability.loan_type == 4;
    });

    this.LAPList = this.LiabilitiesList.filter(function (liability: any) {
      return liability.loan_type == 5;
    });
  }

  GetLiabilitiesForList(loanType: any) {
    this.LiabilitiesForBinding = [];
    this.LiabilitiesForBinding = this.LiabilitiesList.filter(function (liability: any) {
      if (loanType == '') {
        return liability;
      }
      else {
        return liability.loan_type == loanType;
      }
    });
    if (this.LiabilitiesForBinding.length > 0) {
      this.MyLoans = true;
    }
    else {
      this.MyLoans = false;
    }
  }

  InsuranceList: any;
  InsuranceType: any = '';

  GetInsuranceList() {
    this.InsuranceList = [];
    let Data = new FormData();
    Data.append('insurance_product', this.InsuranceType);
    this.api.post("insurance/common/get-active-products-insurance", Data, true).subscribe(response => {
      // console.log('GetInsuranceList', response);
      if (response.response.n == 1) {
        this.InsuranceList = response.data;
        this.MyPolicies = true;
      }
      else {
        this.MyPolicies = false;
      }
    })
  }

}
