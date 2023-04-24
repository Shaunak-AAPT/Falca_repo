import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/services/api/api.service';
import { AESCryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
  selector: 'app-wealth-dashboard',
  templateUrl: './wealth-dashboard.component.html',
  styleUrls: ['./wealth-dashboard.component.css']
})
export class WealthDashboardComponent implements OnInit {

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
    navText: ["<img class='img1' src='assets/img/arrow_left.svg' (click)='incrementDecrement()'> ", "<img class='img2' src='assets/img/arrow_right.svg' onclick='incrementDecrement()'>"],
    dots: false,
    dotsEach: true,
    lazyLoad: false,
    autoplay: false,
    autoplaySpeed: 500,
    navSpeed: 500,
    autoplayTimeout: 5000,
    autoplayHoverPause: true
  }

  SelectedTab: any = 1;
  CreditUrl = environment.CreditUrl;
  WealthUrl = environment.WealthUrl;
  InsuranceUrl = environment.InsuranceUrl;
  MyFunds: boolean = false;
  MyPolicies: boolean = true;
  MyLoans: boolean = true;
  WealthFunds: any;
  Token: any;
  LiabilitiesCount: any;
  InsuranceCount: any;
  InvestmentsCount: any;
  ApplicantData: any;
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
    this.wealthFunds();
    $('.img1').click(function () {
      // debugger
      // console.log('dfsdfd')
    });
  }


  incrementDecrement() {
    // debugger
    this.actionslideno++
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

  GotoWealth(Path: any) {
    this.Token = localStorage.getItem("CustToken");
    this.WealthUrl = environment.WealthUrl.replace("{TOKEN}", encodeURIComponent(this.Token));
    if (!this.validation.isNullEmptyUndefined(Path)) {
      this.WealthUrl = this.WealthUrl.replace("{PATH}", encodeURIComponent(Path));
    }
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

  wealthFunds() {
    this.api.get("vertical/product?vertical=3").subscribe((resp) => {
      this.WealthFunds = resp.data;
    });
  }

}
