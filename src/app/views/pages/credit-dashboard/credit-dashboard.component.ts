import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/services/api/api.service';
import { AESCryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-credit-dashboard',
  templateUrl: './credit-dashboard.component.html',
  styleUrls: ['./credit-dashboard.component.css']
})
export class CreditDashboardComponent implements OnInit {

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
    loop: true,
    // stagePadding: 40,
    responsive: {
      0: { items: 1 },
      480: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 },
      1200: { items: 3 }
    },
    nav: true,
    // navText: ['Back','Next'],
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

  SelectedTab: any = 1;
  CreditUrl = environment.CreditUrl;
  WealthUrl = environment.WealthUrl;
  InsuranceUrl = environment.InsuranceUrl;
  ApplicantData: any;
  MyLoans: boolean = false;
  Token: any;
  CreditLoans: any;
  purpose_of_loan: any = "";
  CreditOfferRecommendationList: any;
  LiabilitiesList: any = [];
  PendingLiabilityList: any;
  AllLoanList: any;
  PersonalLoanList: any;
  HomeLoanList: any;
  EducationalLoanList: any;
  BusinesLoanList: any;
  LAPList: any;
  LiabilitiesForBinding: any;
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
    // let slides = document.querySelectorAll('.owl-item');
    // for (let i = 0; i < slides.length; i++) {
    //   for (let j = 0; j < slides[i].classList.length; j++) {
    //     if (slides[i].classList[j] == "active") {
    //       this.actionslideno = slides[i].children[0].id;
    //     }
    //   }
    // }
  }
  
  ngOnInit(): void {

    if (localStorage.getItem("ApplicantData") != null) {
      this.ApplicantData = this.crypto.Decrypt(localStorage.getItem("ApplicantData"));
    }
    this.GetCounts();
    this.CreditLoansProduct();
    this.GetOfferRecommendationsForLiablibities();
    this.GetLiabilities();
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

  CreditRouterUrl(Path: any) {
    this.Token = localStorage.getItem("CustToken");
    this.CreditUrl = environment.CreditUrl.replace("{TOKEN}", encodeURIComponent(this.Token));
    if (!this.validation.isNullEmptyUndefined(Path)) {
      this.CreditUrl = this.CreditUrl.replace("{PATH}", encodeURIComponent(Path));
    }
    window.location.href = this.CreditUrl;
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

  CreditLoansProduct() {
    this.api.get("vertical/product?vertical=2").subscribe((resp) => {
      this.CreditLoans = resp.data;
    });
  }

  GetOfferRecommendationsForLiablibities() {
    this.api.get('dashboard/get-credit-products?application_status=&loan_type=', true).subscribe(response => {
      if (response.response.n == 1) {
        this.CreditOfferRecommendationList = response.data;
      }
    })
  }

  GetLiabilities() {
    // debugger
    this.api.get('dashboard/get-credit-products?application_status=&loan_type=', true).subscribe(response => {
      if (response.response.n == 1) {
        this.LiabilitiesList = response.data;
        // console.log('liabilities list', this.LiabilitiesList)
        this.GetPendingLiabilities();
        this.GetFilteredLiabilitiesForCount();
        this.GetLiabilitiesForList('');
      }
    })
  }

  GetPendingLiabilities() {
    this.api.get('dashboard/get-pending-products', true).subscribe(response => {
      // console.log('pending products', response)
      this.PendingLiabilityList=response.data;
    })
    // this.PendingLiabilityList = this.LiabilitiesList.filter(function (liability: any) {
    //   return liability.application_status == 'Pending';
    // });
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

  // this.LiabilitiesList.forEach((element: any) => {
  //   console.log(element);
  //   if(element.purpose_of_loan == "business"){
  //     this.BusinesLoanList.push(element);
  //   }
  //   else if(element.purpose_of_loan == "home"){
  //     this.HomeLoanList.push(element);
  //   }
  //   else if(element.purpose_of_loan == "lap"){
  //     this.LAPList.push(element);
  //   }
  // });
  // console.log("business loan list",this.BusinesLoanList)
  // console.log("home loan list",this.HomeLoanList)
  // console.log("lap loan list",this.LAPList)



}
