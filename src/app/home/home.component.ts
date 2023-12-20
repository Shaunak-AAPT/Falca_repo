import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from '../services/api/api.service';
import { AESCryptoService } from '../services/cryptomanager/aescrypto.service';
import { environment } from 'src/environments/environment';
import { ValidateService } from '../services/validate/validate.service';
import { UntypedFormBuilder } from '@angular/forms';
declare let $: any;

declare let bootstrap: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  CommonBannerlist: any;
  meetpartnerslist: any;
  CommonrTestimonialdata: any;
  InsurencedataList: any;
  CreditdataList: any;
  wealthdataList: any;
  BlogList: any;
  blogimage: any;
  Token: any;
  private routeSub: any;
  QueryToken: any;
  Path: any;
  Transaction: any;
  FromPath: any;
  _paramSub: any;
  CreditUrl = environment.CreditUrl;
  InsuranceUrl = environment.InsuranceUrl;
  WealthUrl = environment.WealthUrl;
  ShowLoader: any = false;
  LOGOUT: any;
  // loginInit: boolean = false;

  founders = [
    {
      id: 2, name: 'Sourabh Kumar', title: 'Cofounder', bio: 'Experienced Leader with a demonstrated track record of leading & scaling organizations in wealth management, Insurance & lending.',
      // img: '../../assets/img/founding_team_member/founder-sourabh.svg',
      img: '../../assets/img/founding_team_member/Sourabh_profile.png',
      image: '../../assets/img/founding_team_member/Sourabh_profile.png',
      linkedinImg: '../../assets/img/linkedin-svgrepo-com.svg',
      linkedinLink: 'https://www.linkedin.com/in/sourabh-kumar-755574a3/'
    },
    {
      id: 1, name: 'Ashish Mehrotra',
      title: 'Investor & Director',
      bio: 'Business leader with 25 years of progressively senior experience across retail, commercial sectors banking, and Insurance sectors.',
      // img: '../../assets/img/founding_team_member/founder-asish.svg',
      img: '../../assets/img/founding_team_member/Ashish.jpg',
      image: '../../assets/img/founding_team_member/Ashish.jpg',
      linkedinImg: '../../assets/img/linkedin-svgrepo-com.svg',
      linkedinLink: 'https://in.linkedin.com/in/ashish-mehrotra-9050406'
    },
    {
      id: 3, name: 'Suraj Gaydhane', title: 'COO', bio: 'An experienced professional with a demonstrated history of working in leadership roles across finance, analytics, product management, and business strategy for banking and life insurance businesses.',
      // img: '../../assets/img/founding_team_member/team-suraj.svg',
      img: '../../assets/img/founding_team_member/Suraj-Finizon-Pic.png',
      image: '../../assets/img/founding_team_member/Suraj-Finizon-Pic.png',
      linkedinImg: '../../assets/img/linkedin-svgrepo-com.svg',
      linkedinLink: 'https://www.linkedin.com/in/surajgaydhane/'
    },
    {
      id: 8, name: 'Abhay Rathore', title: 'National Head-Sales', bio: 'Experiences Sales Professional with over 14 years of experience across Insurance sector and start up. Comprehensive background in leading all aspects of Insurance Business and formulate strategic plans & initiatives for large scale Retail and HNI business. Carrying rich experience across diverse areas with successful contributions in Building B2B2C Business distribution model',
      img: '../../assets/img/abhay.jpg',
      image: '../../assets/img/abhay.jpg',
      linkedinImg: '../../assets/img/linkedin-svgrepo-com.svg',
      // linkedinLink: 'https://www.linkedin.com/in/jaya-singh-63a48a193/'
    },
    {
      id: 5, name: 'Tarun Taneja', title: 'Cofounder & CEO', bio: 'A seasoned professional with 20 years of experience in building, scaling and leading new business streams in the General & Health Insurance space. He has deep expertise in New Product Development, Business Development, Bancassurance, Portfolio Management & Risk Management.',
      // img: '../../assets/img/founding_team_member/team-tarun.svg',
      // image: '../../assets/img/founding_team_member/tarun-final.jpg',
      img: '../../assets/img/founding_team_member/TT.png',
      image: '../../assets/img/founding_team_member/TT.png',
      linkedinImg: '../../assets/img/linkedin-svgrepo-com.svg',
      linkedinLink: 'https://www.linkedin.com/in/tarun-taneja-264a3975/'
    },
    {
      id: 6, name: 'Chandramouli Pandya', title: 'CTO', bio: 'Chandramouli, 20+ yrs of work-ex, has managed globally disperse teams to develop, deploy and scale cutting edge Financial tech. Keen tech aficionado and expert in AI and Blockchain, he wears hats of Startup Mentor, CTO and Tech Evangelist.',
      // img: '../../assets/img/founding_team_member/team-chandra.svg',
      img: '../../assets/img/founding_team_member/ChandraP_profile.png',
      image: '../../assets/img/founding_team_member/ChandraP_profile.png',
      linkedinImg: '../../assets/img/linkedin-svgrepo-com.svg',
      linkedinLink: 'https://www.linkedin.com/in/chandramoulipandya/'
    },
    {
      id: 4, name: 'Jaya Singh', title: 'Director, Wealth', bio: 'A leader with deep experience in wealth management across advisory, research, fund diligence, client engagement, and sales',
      // img: '../../assets/img/founding_team_member/team-jaya.svg',
      img: '../../assets/img/founding_team_member/Jaya.jpg',
      image: '../../assets/img/founding_team_member/Jaya.jpg',
      linkedinImg: '../../assets/img/linkedin-svgrepo-com.svg',
      linkedinLink: 'https://www.linkedin.com/in/jaya-singh-63a48a193/'
    },
    {
      id: 7, name: 'Arnab Koley', title: 'COO', bio: 'Enterprising & resourceful professional with 16+ years of experience across Insurance & start-up sector. Comprehensive background in leading Insurance business operations, formulating strategic plans & initiatives for large Retail operations. Successful contributions in building B2B2C distribution model, Business Process Reengineering & building technology product from scratch.',
      img: '../../assets/img/Arnab.jpg',

      image: '../../assets/img/Arnab2.jpg',
      linkedinImg: '../../assets/img/linkedin-svgrepo-com.svg',
      // linkedinLink: 'https://www.linkedin.com/in/jaya-singh-63a48a193/'
    },


  ];


  // sw code mobile
  foundersmob = [
    {
      id: 2, name: 'Sourabh Kumar', title: 'Cofounder', bio: 'Experienced Leader with a demonstrated track record of leading & scaling organizations in wealth management, Insurance & lending.',
      // img: '../../assets/img/founding_team_member/founder-sourabh.svg',
      img: '../../assets/img/founding_team_member/Sourabh_profile.png',
      image: '../../assets/img/founding_team_member/Sourabh_profile.png',
      linkedinImg: '../../assets/img/linkedin-svgrepo-com.svg',
      linkedinLink: 'https://www.linkedin.com/in/sourabh-kumar-755574a3/'
    },
    {

      id: 5, name: 'Tarun Taneja', title: 'Cofounder & CEO', bio: 'A seasoned professional with 20 years of experience in building, scaling and leading new business streams in the General & Health Insurance space. He has deep expertise in New Product Development, Business Development, Bancassurance, Portfolio Management & Risk Management.',
      // img: '../../assets/img/founding_team_member/team-tarun.svg',
      // image: '../../assets/img/founding_team_member/tarun-final.jpg',
      img: '../../assets/img/founding_team_member/TT.png',
      image: '../../assets/img/founding_team_member/TT.png',
      linkedinImg: '../../assets/img/linkedin-svgrepo-com.svg',
      linkedinLink: 'https://www.linkedin.com/in/tarun-taneja-264a3975/'
    },
    {
      id: 1, name: 'Ashish Mehrotra',
      title: 'Investor & Director',
      bio: 'Business leader with 25 years of progressively senior experience across retail, commercial sectors banking, and Insurance sectors.',
      // img: '../../assets/img/founding_team_member/founder-asish.svg',
      img: '../../assets/img/founding_team_member/Ashish.jpg',
      image: '../../assets/img/founding_team_member/Ashish.jpg',
      linkedinImg: '../../assets/img/linkedin-svgrepo-com.svg',
      linkedinLink: 'https://in.linkedin.com/in/ashish-mehrotra-9050406'
    },
    {

      id: 6, name: 'Chandramouli Pandya', title: 'CTO', bio: 'Chandramouli, 20+ yrs of work-ex, has managed globally disperse teams to develop, deploy and scale cutting edge Financial tech. Keen tech aficionado and expert in AI and Blockchain, he wears hats of Startup Mentor, CTO and Tech Evangelist.',
      // img: '../../assets/img/founding_team_member/team-chandra.svg',
      img: '../../assets/img/founding_team_member/ChandraP_profile.png',
      image: '../../assets/img/founding_team_member/ChandraP_profile.png',
      linkedinImg: '../../assets/img/linkedin-svgrepo-com.svg',
      linkedinLink: 'https://www.linkedin.com/in/chandramoulipandya/'
    },
    {

      id: 3, name: 'Suraj Gaydhane', title: 'COO', bio: 'An experienced professional with a demonstrated history of working in leadership roles across finance, analytics, product management, and business strategy for banking and life insurance businesses.',
      // img: '../../assets/img/founding_team_member/team-suraj.svg',
      img: '../../assets/img/founding_team_member/Suraj-Finizon-Pic.png',
      image: '../../assets/img/founding_team_member/Suraj-Finizon-Pic.png',
      linkedinImg: '../../assets/img/linkedin-svgrepo-com.svg',
      linkedinLink: 'https://www.linkedin.com/in/surajgaydhane/'
    },
    {

      id: 4, name: 'Jaya Singh', title: 'Director, Wealth', bio: 'A leader with deep experience in wealth management across advisory, research, fund diligence, client engagement, and sales',
      // img: '../../assets/img/founding_team_member/team-jaya.svg',
      img: '../../assets/img/founding_team_member/Jaya.jpg',
      image: '../../assets/img/founding_team_member/Jaya.jpg',
      linkedinImg: '../../assets/img/linkedin-svgrepo-com.svg',
      linkedinLink: 'https://www.linkedin.com/in/jaya-singh-63a48a193/'
    },

    {
      id: 7, name: 'Abhay Rathore', title: 'National Head-Sales', bio: 'Experiences Sales Professional with over 14 years of experience across Insurance sector and start up. Comprehensive background in leading all aspects of Insurance Business and formulate strategic plans & initiatives for large scale Retail and HNI business. Carrying rich experience across diverse areas with successful contributions in Building B2B2C Business distribution model',
      img: '../../assets/img/abhay.jpg',
      image: '../../assets/img/abhay.jpg',
      linkedinImg: '../../assets/img/linkedin-svgrepo-com.svg',
      // linkedinLink: 'https://www.linkedin.com/in/jaya-singh-63a48a193/'
    },
    {
      id: 8, name: 'Arnab Koley', title: 'COO', bio: 'Enterprising & resourceful professional with 16+ years of experience across Insurance & start-up sector. Comprehensive background in leading Insurance business operations, formulating strategic plans & initiatives for large Retail operations. Successful contributions in building B2B2C distribution model, Business Process Reengineering & building technology product from scratch.',

      img: '../../assets/img/Arnab2.jpg',
      image: '../../assets/img/Arnab2.jpg',
      linkedinImg: '../../assets/img/linkedin-svgrepo-com.svg',
      // linkedinLink: 'https://www.linkedin.com/in/jaya-singh-63a48a193/'
    },


  ];



  selectedFounder = this.founders[0];

  isSelected(founder: any) {
    return this.selectedFounder === founder;
  }
  showDetails(founder: any) {
    this.selectedFounder = founder;
  }



  customOptions: OwlOptions = {
    items: 3,
    margin: 3,
    loop: true,
    stagePadding: 64,
    responsive: {
      0: { items: 1, stagePadding: 30 },
      480: { items: 1, stagePadding: 30 },
      600: { items: 2, stagePadding: 30 },
      1000: { items: 3 },
      1200: { items: 3 }
    },
    nav: true,
    navText: ["<img src='assets/img/arrow_left.svg'>", "<img src='assets/img/arrow_right.svg'>"],
    dots: true,
    dotsEach: true,
    lazyLoad: false,
    autoplay: true,
    autoplaySpeed: 500,
    navSpeed: 500,
    autoplayTimeout: 5000,
    autoplayHoverPause: true
  }

  customOptions2: OwlOptions = {
    items: 1,
    margin: 0,
    loop: true,
    nav: true,
    navText: ["<img src='assets/img/arrow_left.svg'>", "<img src='assets/img/arrow_right.svg'>"],
    dots: false,
    dotsEach: true,
    lazyLoad: false,
    autoplay: true,
    autoplaySpeed: 750,
    navSpeed: 750,
    autoplayTimeout: 5000,
    autoplayHoverPause: true
  }

  customOptions3: OwlOptions = {
    items: 1,
    margin: 0,
    loop: true,
    nav: true,
    navText: ["<img src='assets/img/arrow_left.svg'>", "<img src='assets/img/arrow_right.svg'>"],
    dots: true,
    dotsEach: true,
    lazyLoad: false,
    autoplay: true,
    autoplaySpeed: 750,
    navSpeed: 750,
    autoplayTimeout: 5000,
    autoplayHoverPause: true
  }

  customOptions4: OwlOptions = {
    items: 1,
    loop: true,
    nav: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true
  };

  constructor(public activeRoute: ActivatedRoute, public validation: ValidateService, private api: ApiService, private route: Router, private crypto: AESCryptoService, private fb: UntypedFormBuilder, private elementRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.getCommonBanner();
    this.CommonTestimonial();
    this.InsuranceProduct();
    this.creditProduct();
    // not in use
    this.wealthProduct();
    this.GetBlogList();
    this.getpartnersbanner();

  }
  
  getCommonBanner() {
    this.api.get("banner?vertical=0").subscribe((resp) => {
      this.CommonBannerlist = resp.data;
      console.log("banner data", resp.data);
    });
  }

  // ***************org code*************
  partnermodal(banners: any) {
    console.log("part bnrs:- ", banners);

    console.log("", banners.sortOrder);
    if (banners.sortOrder == 1) {
      $("#bannerpartnerModal").modal("show");
      console.log("btnid:", banners.button);
      const element = document.getElementById("partner");
      console.log("element:", element);
    }
  }

  customermodal(banners: any) {
    console.log("cust bnrs:- ", banners);
    console.log("", banners.sortOrder);
    if (banners.sortOrder == 2) {
      $("#bannercustomerModal").modal("show");
      console.log("")
    }

  }

  hidebannerModal() {
    $(".modal").modal("hide");
  }


  hidebannercustomerrModal() {
    $("#bannercustomerModal").modal("hide");
  }

  getpartnersbanner() {
    this.api.get("banner/get-carousel?vertical=0").subscribe((resp) => {
      this.meetpartnerslist = resp.data;
    })
  }

  CommonTestimonial() {
    this.api.get("testimonial?vertical=0").subscribe((resp) => {
      this.CommonrTestimonialdata = resp.data.map((testimonial: any) => ({
        ...testimonial,
        expanded: false
      }));
    });
  }


  toggleExpanded(testimonial: any) {
    testimonial.expanded = !testimonial.expanded;
  }

  shouldShowReadMore(testimonial: any): boolean {
    return testimonial?.profileReview?.length > 150;
  }

  getReviewContent(testimonial: any): string {
    if (testimonial.expanded) {
      return testimonial?.profileReview;
    } else if (testimonial?.profileReview?.length > 150) {
      return testimonial?.profileReview?.slice(0, 150) + '...';
    } else {
      return testimonial?.profileReview;
    }
  }

  InsuranceProduct() {
    this.api.get("vertical/product?vertical=1").subscribe((resp) => {
      this.InsurencedataList = resp.data;
      console.log('InsurencedataList', this.InsurencedataList)
    });
  }
  creditProduct() {
    this.api.get("vertical/product?vertical=2").subscribe((resp) => {
      this.CreditdataList = resp.data;
      console.log('CreditdataList', this.CreditdataList)
    });
  }

  // not in use
  wealthProduct() {
    this.api.get("vertical/product?vertical=5").subscribe((resp) => {
      this.wealthdataList = resp.data;
      console.log(this.wealthdataList)
    });
  }
  CreditRouterUrl(credit: any) {



    console.log("name", credit)
    if (credit.name === "Savings & Insurance") {
      console.log("begin");
      $("#leadModal").modal("show");
      console.log("after");
    }
    else if (credit.name === "Mutual Funds") {
      console.log('credit', credit.path)
      $("#mutualFundModal").modal("show");


    }
    else {
      console.log('credit', credit.path)
      $("#leadModal").modal("hide");
      $("#mutualFundModal").modal("hide");

      window.open(credit.path, '_blank');

    }
  }

  InsurancetRouterUrl(insurence: any) {
    console.log("name", insurence)
    if (insurence.name === "Life Insurance") {
      console.log("begin");
      $("#leadModal").modal("show");
      console.log("after");
    }
    else {
      console.log('insurence', insurence.path)
      $("#leadModal").modal("hide");
      window.open(insurence.path, '_blank');
    }
  }

  wealthtRouterUrl(wealth: any) {
    console.log("name", wealth)
    if (wealth.name === "Savings & Insurance") {
      console.log("begin");
      $("#leadModal").modal("show");
      console.log("after");
    }
    else {
      console.log('credit', wealth.path)
      $("#leadModal").modal("hide");
      window.open(wealth.path, '_blank');

    }
  }

  GetApplicantData() {
    this.api.get("auth/customer/user", true).subscribe(response => {
      localStorage.setItem("ApplicantData", this.crypto.Encrypt(response.data));
    })
  }

  GetBlogList() {
    this.api.get("banner/get-blog").subscribe(response => {
      this.BlogList = response.items;
      console.log('list of blogs', this.BlogList);

      for (const element of this.BlogList) {
        if (element.content.indexOf('src=\"') > 0) {
          this.blogimage = element.content.split('src=\"');
          this.blogimage = this.blogimage[1].split('" width');
          this.blogimage = this.blogimage[0].replace('"', '');
          element.blogimage = this.blogimage;
        }
        else {
          element.blogimage = 'assets/img/no-blog.png';
        }
      }
    })
  }

  GoToInsureRight() {
    window.location.href = 'https://uat.finizoninsurance.com/covercalc';
  }

  showPartnerModal() {
    console.log("hello")
    $("#partnerModal").modal("show");
  }

  hidePartnerModal() {
    $("#partnerModal").modal("hide");
  }

  cancleModal() {
    $("#headerotp-screen").modal("hide");
  }

}