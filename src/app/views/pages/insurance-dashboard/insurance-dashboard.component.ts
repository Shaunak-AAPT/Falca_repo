import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';
import { AESCryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-insurance-dashboard',
  templateUrl: './insurance-dashboard.component.html',
  styleUrls: ['./insurance-dashboard.component.css']
})
export class InsuranceDashboardComponent implements OnInit {

  customOptions3: OwlOptions = {
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
  customOptions4: OwlOptions = {
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
  customOptions: OwlOptions = {
    items: 3,
    margin: 3,
    loop: false,
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
    autoplay: false,
    autoplaySpeed: 500,
    navSpeed: 500,
    autoplayTimeout: 5000,
    autoplayHoverPause: true
  }
  customOptions2: OwlOptions = {
    items: 3,
    margin: 3,
    loop: true,
    // stagePadding: 64,
    responsive: {
      0: { items: 1 },
      480: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 },
      1200: { items: 3 }
    },
    nav: false,
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
      0: { items: 1, stagePadding: 10 },
      480: { items: 1, stagePadding: 30 },
      600: { items: 2, stagePadding: 30 },
      1000: { items: 3 },
      1200: { items: 3 }
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
    margin: 10,
    loop: false,
    responsive: {
      0: { items: 2 },
      100: { items: 2 },
      600: { items: 3 },
      700: { items: 4 }
    },
    nav: false,
    //  navText: ["<img src='assets/img/arrow_left.svg'>","<img src='assets/img/arrow_right.svg'>"],
    dots: false,
    dotsEach: true,
    lazyLoad: false,
    autoplay: false,
    // autoplaySpeed: 500,
    navSpeed: 500,
    // autoplayTimeout: 5000,
    // autoplayHoverPause: true
  }
  SelectedTab: any = 1;
  ShowContent: boolean = true;
  clicked: any = '';

  CreditUrl = environment.CreditUrl;
  WealthUrl = environment.WealthUrl;
  InsuranceUrl = environment.InsuranceUrl;
  LiabilitiesCount: any;
  InsuranceCount: any;
  InvestmentsCount: any;
  InsurancePolicies: any;
  MyInsurance: boolean = true;
  ApplicantData: any;
  actionslideno: any = 1;
  InsurancePendingProductsList: any;
  InsuranceType: any = '';
  pendingRedirection: any = '/health-nominee-applicant-details';
  pendingList: any;
  generetedUrl: any = "/health-application-summary";
  discard: any;
  // pendingRedirection: any = "uat.finizoninsurance.com/health-nominee-applicant-details";
  // generetedUrl: any = "uat.finizoninsurance.com/health-application-summary";
  Token: any;
  insurencUrl: any;
  Quoteid: any;
  palneId: any;

  constructor(private api: ApiService, private route: Router, private crypto: AESCryptoService, public tostar: ToastrService) { }

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
    this.insuranceProcucts();
    this.GetInsurancePendingProducts();

    this.GetInsuranceList();
    // this.GetPendingProducts();
  }

  GetCounts() {
    debugger;
    this.api.get('dashboard/get-dashboard', true).subscribe(async (response: any) => {
      if (response.response.n == 1) {
        debugger;
        this.LiabilitiesCount = response.liabilities;
        this.InsuranceCount = response.Insurances;
        this.InvestmentsCount = response.Investment;
        console.log("get-insurance-dashboard", response.Insurances);
      }
    })
  }

  handleOpenCloseNotif() {
    if (document.getElementById("notification-bar")!.classList.contains("show-notif-nav")) {
      document.getElementById("notification-bar")!.classList.remove("show-notif-nav");
    } else {
      document.getElementById("notification-bar")!.classList.add("show-notif-nav");
    }
  }

  ShowContentDiv() {
    this.ShowContent = false;
    setTimeout(() => {
      this.ShowContent = true;
    }, 100);
  }

  insuranceProcucts() {
    this.api.get("vertical/product?vertical=1").subscribe((resp) => {
      this.InsurancePolicies = resp.data;
    });
  }


  GetInsurancePendingProducts() {
    debugger;
    this.api.get("insurance/common/get-pending-products-insurance", true).subscribe(response => {
      if (response.response.n == 1) {
        this.InsurancePendingProductsList = response.data;
        console.log('GetInsurancePendingProducts', this.InsurancePendingProductsList);
      }
    })
  }
  GotoInsurancePendingProducts(para: any) {
    debugger;
    // this.Quoteid=this.InsurancePendingProductsList?.InsuranceUniqueQuoteId;
    // this.palneId = this.InsurancePendingProductsList?.plan_id;
    this.Token =localStorage.getItem("CustToken");
    // this.insurencUrl = environment.InsuranceShare.replace("{TOKEN}", encodeURIComponent(this.Token));
    this.insurencUrl = this.insurencUrl.replace("{PATH}", encodeURIComponent(para));

    window.location.href = this.insurencUrl;
    console.log("this.insurencUrl",this.insurencUrl);
  }
  discardPendingProduct(applicationId: any, i: any) {
    debugger;
    let data = new FormData();
    data.append("applicationId", applicationId)
    this.api.post("insurance/common/discard-pending-applications", data, true).subscribe(response => {
      this.InsurancePendingProductsList.splice(i, 1);
      this.discard = response;
      console.log('this.discard', this.discard);
      if (response.response.n == 1) {
        this.tostar.success(response.response.Msg)
      }
    })
  }
  InsuranceList: any;

  GetInsuranceList() {
    debugger;
    this.InsuranceList = [];
    let Data = new FormData();
    Data.append('insurance_product', this.InsuranceType);
    this.api.post("insurance/common/get-active-products-insurance", Data, true).subscribe(response => {
      debugger;
      // console.log('GetInsuranceList', response);
      if (response.response.n == 1) {
        this.InsuranceList = response.data;
        this.MyInsurance = true;
        console.log("this.InsuranceList", this.InsuranceList)
      }
      else {
        this.MyInsurance = false;
      }
    })
  }
  // GetPendingProducts(){
  //   this.api.get("insurance/common/get-pending-products-insurance", true).subscribe(response => {
  // this.pendingList=response.data;
  // console.log("this.pendingList",this.pendingList);
  //   })
  // }
}
