import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from '../services/api/api.service';
import { AESCryptoService } from '../services/cryptomanager/aescrypto.service';
import { environment } from 'src/environments/environment';
import { ValidateService } from '../services/validate/validate.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
declare var $: any;

declare var bootstrap: any;
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

  
  // sw code
  founders = [
    {
      id: 2, name: 'Sourabh Kumar', title: 'Cofounder', bio: 'Experienced Leader with a demonstrated track record of leading & scaling organizations in wealth management, Insurance & lending.',
      img: '../../assets/img/founding_team_member/founder-sourabh.svg',
      image: '../../assets/img/founding_team_member/Sourabh_profile.png',
      linkedinImg: '../../assets/img/linkedin-svgrepo-com.svg',
      linkedinLink: 'https://www.linkedin.com/in/sourabh-kumar-755574a3/'
    },
    {
      id: 1, name: 'Ashish Mehrotra',
      title: 'Investor & Director',
      bio: 'Business leader with 25 years of progressively senior experience across retail, commercial sectors banking, and Insurance sectors.',
      img: '../../assets/img/founding_team_member/founder-asish.svg',
      image: '../../assets/img/founding_team_member/Ashish.jpg',
      linkedinImg: '../../assets/img/linkedin-svgrepo-com.svg',
      linkedinLink: 'https://in.linkedin.com/in/ashish-mehrotra-9050406'
    },
    {
      id: 3, name: 'Suraj Gaydhane', title: 'COO', bio: 'An experienced professional with a demonstrated history of working in leadership roles across finance, analytics, product management, and business strategy for banking and life insurance businesses.',
      img: '../../assets/img/founding_team_member/team-suraj.svg',
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
      img: '../../assets/img/founding_team_member/team-tarun.svg',
      // image: '../../assets/img/founding_team_member/tarun-final.jpg',
      image: '../../assets/img/founding_team_member/TT.png',
      linkedinImg: '../../assets/img/linkedin-svgrepo-com.svg',
      linkedinLink: 'https://www.linkedin.com/in/tarun-taneja-264a3975/'
    },
    {
      id: 6, name: 'Chandramouli Pandya', title: 'CTO', bio: 'Chandramouli, 20+ yrs of work-ex, has managed globally disperse teams to develop, deploy and scale cutting edge Financial tech. Keen tech aficionado and expert in AI and Blockchain, he wears hats of Startup Mentor, CTO and Tech Evangelist.',
      img: '../../assets/img/founding_team_member/team-chandra.svg',
      image: '../../assets/img/founding_team_member/ChandraP_profile.png',
      linkedinImg: '../../assets/img/linkedin-svgrepo-com.svg',
      linkedinLink: 'https://www.linkedin.com/in/chandramoulipandya/'
    },
    {
      id: 4, name: 'Jaya Singh', title: 'Director, Wealth', bio: 'A leader with deep experience in wealth management across advisory, research, fund diligence, client engagement, and sales',
      img: '../../assets/img/founding_team_member/team-jaya.svg',
      image: '../../assets/img/founding_team_member/Jaya.jpg',
      linkedinImg: '../../assets/img/linkedin-svgrepo-com.svg',
      linkedinLink: 'https://www.linkedin.com/in/jaya-singh-63a48a193/'
    },
    {
      id: 7, name: 'Arnab Koley', title: 'COO', bio: 'Enterprising & resourceful professional with 16+ years of experience across Insurance & start-up sector. Comprehensive background in leading Insurance business operations, formulating strategic plans & initiatives for large Retail operations. Successful contributions in building B2B2C distribution model, Business Process Reengineering & building technology product from scratch.',
      img: '../../assets/img/Arnab.jpg',
      image: '../../assets/img/Arnab.jpg',
      linkedinImg: '../../assets/img/linkedin-svgrepo-com.svg',
      // linkedinLink: 'https://www.linkedin.com/in/jaya-singh-63a48a193/'
    },
   

  ];


  // sw code mobile
  foundersmob = [
    {
      id: 2, name: 'Sourabh Kumar', title: 'Cofounder', bio: 'Experienced Leader with a demonstrated track record of leading & scaling organizations in wealth management, Insurance & lending.',
      img: '../../assets/img/founding_team_member/founder-sourabh.svg',
      image: '../../assets/img/founding_team_member/Sourabh_profile.png',
      linkedinImg: '../../assets/img/linkedin-svgrepo-com.svg',
      linkedinLink: 'https://www.linkedin.com/in/sourabh-kumar-755574a3/'
    },
    {

      id: 5, name: 'Tarun Taneja', title: 'Cofounder & CEO', bio: 'A seasoned professional with 20 years of experience in building, scaling and leading new business streams in the General & Health Insurance space. He has deep expertise in New Product Development, Business Development, Bancassurance, Portfolio Management & Risk Management.',
      img: '../../assets/img/founding_team_member/team-tarun.svg',
      // image: '../../assets/img/founding_team_member/tarun-final.jpg',
      image: '../../assets/img/founding_team_member/TT.png',
      linkedinImg: '../../assets/img/linkedin-svgrepo-com.svg',
      linkedinLink: 'https://www.linkedin.com/in/tarun-taneja-264a3975/'
    },
    {
      id: 1, name: 'Ashish Mehrotra',
      title: 'Investor & Director',
      bio: 'Business leader with 25 years of progressively senior experience across retail, commercial sectors banking, and Insurance sectors.',
      img: '../../assets/img/founding_team_member/founder-asish.svg',
      image: '../../assets/img/founding_team_member/Ashish.jpg',
      linkedinImg: '../../assets/img/linkedin-svgrepo-com.svg',
      linkedinLink: 'https://in.linkedin.com/in/ashish-mehrotra-9050406'
    },
    {

      id: 6, name: 'Chandramouli Pandya', title: 'CTO', bio: 'Chandramouli, 20+ yrs of work-ex, has managed globally disperse teams to develop, deploy and scale cutting edge Financial tech. Keen tech aficionado and expert in AI and Blockchain, he wears hats of Startup Mentor, CTO and Tech Evangelist.',
      img: '../../assets/img/founding_team_member/team-chandra.svg',
      image: '../../assets/img/founding_team_member/ChandraP_profile.png',
      linkedinImg: '../../assets/img/linkedin-svgrepo-com.svg',
      linkedinLink: 'https://www.linkedin.com/in/chandramoulipandya/'
    },
    {

      id: 3, name: 'Suraj Gaydhane', title: 'COO', bio: 'An experienced professional with a demonstrated history of working in leadership roles across finance, analytics, product management, and business strategy for banking and life insurance businesses.',
      img: '../../assets/img/founding_team_member/team-suraj.svg',
      image: '../../assets/img/founding_team_member/Suraj-Finizon-Pic.png',
      linkedinImg: '../../assets/img/linkedin-svgrepo-com.svg',
      linkedinLink: 'https://www.linkedin.com/in/surajgaydhane/'
    },
    {

      id: 4, name: 'Jaya Singh', title: 'Director, Wealth', bio: 'A leader with deep experience in wealth management across advisory, research, fund diligence, client engagement, and sales',
      img: '../../assets/img/founding_team_member/team-jaya.svg',
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
      img: '../../assets/img/Arnab.jpg',
      image: '../../assets/img/Arnab.jpg',
      linkedinImg: '../../assets/img/linkedin-svgrepo-com.svg',
      // linkedinLink: 'https://www.linkedin.com/in/jaya-singh-63a48a193/'
    },


  ];

  // pd code desktop **********************
  // founders = [
  //   {
  //     id: 1, name: 'Ashish Mehrotra',
  //     title: 'Investor & Director',
  //     bio: 'Business leader with 25 years of progressively senior experience across retail, commercial sectors banking, and Insurance sectors.',
  //     img: '../../assets/img/founding_team_member/founder-asish.svg',
  //     image: '../../assets/img/founding_team_member/Ashish.jpg',
  //     linkedinImg: '../../assets/img/linkedin-svgrepo-com.svg',
  //     linkedinLink: 'https://in.linkedin.com/in/ashish-mehrotra-9050406'
  //   },
  //   {
  //     id: 5, name: 'Tarun Taneja', title: 'Cofounder & CEO', bio: 'A seasoned professional with 20 years of experience in building, scaling and leading new business streams in the General & Health Insurance space. He has deep expertise in New Product Development, Business Development, Bancassurance, Portfolio Management & Risk Management.',
  //     img: '../../assets/img/founding_team_member/team-tarun.svg',
  //     image: '../../assets/img/founding_team_member/tarun-final.jpg',
  //     linkedinImg: '../../assets/img/linkedin-svgrepo-com.svg',
  //     linkedinLink: 'https://www.linkedin.com/in/tarun-taneja-264a3975/'
  //   },

  //   {

  //     id: 6, name: 'Chandramouli Pandya', title: 'CTO', bio: 'Chandramouli, 20+ yrs of work-ex, has managed globally disperse teams to develop, deploy and scale cutting edge Financial tech. Keen tech aficionado and expert in AI and Blockchain, he wears hats of Startup Mentor, CTO and Tech Evangelist.',
  //     img: '../../assets/img/founding_team_member/team-chandra.svg',
  //     image: '../../assets/img/founding_team_member/ChandraP_profile.png',
  //     linkedinImg: '../../assets/img/linkedin-svgrepo-com.svg',
  //     linkedinLink: 'https://www.linkedin.com/in/chandramoulipandya/'
  //   },
  //   {
  //     id: 2, name: 'Sourabh Kumar', title: 'Cofounder', bio: 'Experienced Leader with a demonstrated track record of leading & scaling organizations in wealth management, Insurance & lending.',
  //     img: '../../assets/img/founding_team_member/founder-sourabh.svg',
  //     image: '../../assets/img/founding_team_member/Sourabh_profile.png',
  //     linkedinImg: '../../assets/img/linkedin-svgrepo-com.svg',
  //     linkedinLink: 'https://www.linkedin.com/in/sourabh-kumar-755574a3/'
  //   },
  //   {

  //     id: 4, name: 'Jaya Singh', title: 'Director, Wealth', bio: 'A leader with deep experience in wealth management across advisory, research, fund diligence, client engagement, and sales',
  //     img: '../../assets/img/founding_team_member/team-jaya.svg',
  //     image: '../../assets/img/founding_team_member/Jaya.jpg',
  //     linkedinImg: '../../assets/img/linkedin-svgrepo-com.svg',
  //     linkedinLink: 'https://www.linkedin.com/in/jaya-singh-63a48a193/'
  //   },
  //   {
  //     id: 3, name: 'Suraj Gaydhane', title: 'COO', bio: 'An experienced professional with a demonstrated history of working in leadership roles across finance, analytics, product management, and business strategy for banking and life insurance businesses.',
  //     img: '../../assets/img/founding_team_member/team-suraj.svg',
  //     image: '../../assets/img/founding_team_member/Suraj-Finizon-Pic.png',
  //     linkedinImg: '../../assets/img/linkedin-svgrepo-com.svg',
  //     linkedinLink: 'https://www.linkedin.com/in/surajgaydhane/'
  //   },
  // ];


  // pd code mobile **********************
  // foundersmob = [
  //   {
  //     id: 1, name: 'Ashish Mehrotra',
  //     title: 'Investor & Director',
  //     bio: 'Business leader with 25 years of progressively senior experience across retail, commercial sectors banking, and Insurance sectors.',
  //     img: '../../assets/img/founding_team_member/founder-asish.svg',
  //     image: '../../assets/img/founding_team_member/Ashish.jpg',
  //     linkedinImg: '../../assets/img/linkedin-svgrepo-com.svg',
  //     linkedinLink: 'https://in.linkedin.com/in/ashish-mehrotra-9050406'
  //   },
  //   {
  //     id: 2, name: 'Sourabh Kumar', title: 'Cofounder', bio: 'Experienced Leader with a demonstrated track record of leading & scaling organizations in wealth management, Insurance & lending.',

  //     img: '../../assets/img/founding_team_member/founder-sourabh.svg',
  //     image: '../../assets/img/founding_team_member/Sourabh_profile.png',
  //     linkedinImg: '../../assets/img/linkedin-svgrepo-com.svg',
  //     linkedinLink: 'https://www.linkedin.com/in/sourabh-kumar-755574a3/'
  //   },

  //   {

  //     id: 5, name: 'Tarun Taneja', title: 'Cofounder & CEO', bio: 'A seasoned professional with 20 years of experience in building, scaling and leading new business streams in the General & Health Insurance space. He has deep expertise in New Product Development, Business Development, Bancassurance, Portfolio Management & Risk Management.',
  //     img: '../../assets/img/founding_team_member/team-tarun.svg',
  //     image: '../../assets/img/founding_team_member/tarun-final.jpg',
  //     linkedinImg: '../../assets/img/linkedin-svgrepo-com.svg',
  //     linkedinLink: 'https://www.linkedin.com/in/tarun-taneja-264a3975/'
  //   },

  //   {

  //     id: 4, name: 'Jaya Singh', title: 'Director, Wealth', bio: 'A leader with deep experience in wealth management across advisory, research, fund diligence, client engagement, and sales',
  //     img: '../../assets/img/founding_team_member/team-jaya.svg',
  //     image: '../../assets/img/founding_team_member/Jaya.jpg',
  //     linkedinImg: '../../assets/img/linkedin-svgrepo-com.svg',
  //     linkedinLink: 'https://www.linkedin.com/in/jaya-singh-63a48a193/'
  //   },
  //   {

  //     id: 3, name: 'Suraj Gaydhane', title: 'COO', bio: 'An experienced professional with a demonstrated history of working in leadership roles across finance, analytics, product management, and business strategy for banking and life insurance businesses.',
  //     img: '../../assets/img/founding_team_member/team-suraj.svg',
  //     image: '../../assets/img/founding_team_member/Suraj-Finizon-Pic.png',
  //     linkedinImg: '../../assets/img/linkedin-svgrepo-com.svg',
  //     linkedinLink: 'https://www.linkedin.com/in/surajgaydhane/'
  //   },

  //   {

  //     id: 6, name: 'Chandramouli Pandya', title: 'CTO', bio: 'Chandramouli, 20+ yrs of work-ex, has managed globally disperse teams to develop, deploy and scale cutting edge Financial tech. Keen tech aficionado and expert in AI and Blockchain, he wears hats of Startup Mentor, CTO and Tech Evangelist.',
  //     img: '../../assets/img/founding_team_member/team-chandra.svg',
  //     image: '../../assets/img/founding_team_member/ChandraP_profile.png',
  //     linkedinImg: '../../assets/img/linkedin-svgrepo-com.svg',
  //     linkedinLink: 'https://www.linkedin.com/in/chandramoulipandya/'
  //   },


  // ];

  selectedFounder = this.founders[0];

  isSelected(founder: any) {
    return this.selectedFounder === founder;
  }
  showDetails(founder: any) {
    this.selectedFounder = founder;
  }

  // selectedFoundermob = this.foundersmob[0];

  // isSelectedmob(founder: any) {
  //   return this.selectedFoundermob === founder;
  // }
  // showDetailsmob(founder: any) {
  //   this.selectedFoundermob = founder;
  // }
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
    // navText: ['Back','Next'],
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
    items: 5,
    margin: 3,
    loop: true,
    responsive: {
      0: { items: 3 },
      480: { items: 3 },
      600: { items: 4 },
      1000: { items: 5 },
      1200: { items: 5 }
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
  // lead modal 
  // myForm!: FormGroup;
  // isSubmitted = false;
  // // namePattern = "^([a-zA-Z]{3,15})(\\s[a-zA-Z]{3,15})?(\\s[a-zA-Z]{3,15})?$";

  // namePattern = "^([a-zA-Z]{3,15})(\\s[a-zA-Z]{3,15}){1,2}$";

  // emailPattern = "^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
  // successMessage: boolean = false;
  constructor(public activeRoute: ActivatedRoute, public validation: ValidateService, private api: ApiService, private route: Router, private crypto: AESCryptoService, private fb: FormBuilder , private elementRef: ElementRef,private renderer: Renderer2) {

    // lead modal 
    // this.myForm = new FormGroup({
    //   category: new FormControl("INSURANCE", Validators.required),
    //   Name: new FormControl('', [Validators.required, Validators.pattern(this.namePattern)]),
    //   Email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    //   mobileNumber: new FormControl('', [Validators.required, Validators.pattern("^[6-9]{1}[0-9]{9}$")]),
    //   Comments: new FormControl('', Validators.required)
    // });
  }



  ngOnInit(): void {

    this._paramSub = this.activeRoute.queryParams.subscribe(async params => {
      // debugger
      this.QueryToken = params.TOKEN;
      this.Path = params.PATH;
      this.Transaction = params.TXN;
      this.FromPath = params.FROM;
      this.LOGOUT = params.LOGOUT;
    });

    this._paramSub.unsubscribe();

    if ((!this.validation.isNullEmptyUndefined(this.LOGOUT) && this.LOGOUT != "null" && this.LOGOUT != "{LOGOUT}") && (this.LOGOUT == "true")) {
      console.log(this.LOGOUT)
      localStorage.clear();
      window.location.href = '/';
      // this.route.navigate(['/']);
    }
    else {

      if (!this.validation.isNullEmptyUndefined(this.Path) && this.Path != "null" && this.Path != "{PATH}") {
        this.ShowLoader = true;
      }

      if (!this.validation.isNullEmptyUndefined(this.QueryToken) && this.QueryToken != 'null' && this.QueryToken != "{TOKEN}") {
        this.QueryToken = decodeURIComponent(this.QueryToken);
        localStorage.setItem("CustToken", this.QueryToken);
        this.api.get("auth/customer/user", true).subscribe(async response => {
          // debugger
          localStorage.setItem("ApplicantData", this.crypto.Encrypt(response.data));
        })
      }

      if (!this.validation.isNullEmptyUndefined(this.Transaction) && this.Transaction != 'null' && this.Transaction != "{TXN}") {
        this.Transaction = decodeURIComponent(this.Transaction);
        // console.log('txn',this.Transaction);
        if (this.Transaction == 1) {
          localStorage.setItem('Transaction', this.crypto.Encrypt(this.Transaction))
        }
      }

      if (!this.validation.isNullEmptyUndefined(this.FromPath) && this.FromPath != 'null' && this.FromPath != "{FROM}") {
        this.FromPath = decodeURIComponent(this.FromPath);
        console.log('FromPath', this.FromPath);
        localStorage.setItem('FromPath', this.crypto.Encrypt(this.FromPath))
      }

      setTimeout(() => {
        if (!this.validation.isNullEmptyUndefined(this.Path) && this.Path != "null" && this.Path != "{PATH}") {
          // debugger
          this.route.navigate([this.Path]);
          this.ShowLoader = false;
        }
        else {
          this.route.navigate(['']);
          this.ShowLoader = false;
        }
      }, 1000);

    }



    this.getCommonBanner();
    this.CommonTestimonial();
    this.InsuranceProduct();
    this.creditProduct();

    // not in use
    this.wealthProduct();

    this.GetBlogList();
    this.getpartnersbanner();

    // this.initCarousel();
  }
  // handleOpenCloseNav(){
  //   if (document.getElementById("site-wrapper-menu")!.classList.contains("show-nav")) {
  //     document.getElementById("site-wrapper-menu")!.classList.remove("show-nav");
  //   }else{
  //     document.getElementById("site-wrapper-menu")!.classList.add("show-nav");
  //   }
  // }
  getCommonBanner() {
    this.api.get("banner?vertical=0").subscribe((resp) => {
      this.CommonBannerlist = resp.data;
      console.log("banner data", resp.data);
    });
  }


  // sw version

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


  // ***************org code*************




  // pd
  // customermodal(banners:any){
  //   console.log("cust bnrs:- ",banners);


  //   console.log("",banners.sortOrder);
  //   if(banners.sortOrder == 1 ){
  //     $("#bannercustomerModal").modal("show");
  //     console.log("")
  //   }

  // }

  // partnermodal(banners:any){
  //   console.log("part bnrs:- ",banners);

  //   console.log("",banners.sortOrder);
  //   if(banners.sortOrder == 2){
  //     $("#bannerpartnerModal").modal("show");
  //     console.log("btnid:",banners.button);
  //     const element = document.getElementById("partner");
  //     console.log("element:",element);
  //   }
  // }


  //   customermodal(buttonId: string) {
  //     console.log("Showing customer modal for button: ", buttonId);
  //     $("#" + buttonId + "customerModal").modal("show");
  // }

  // partnermodal(buttonId: string) {
  //     console.log("Showing partner modal for button: ", buttonId);
  //     $("#" + buttonId + "partnerModal").modal("show");
  // }







  hidebannerModal() {
    $(".modal").modal("hide");
  }

  //   hidebannerModal(banners:any) {
  //   if(banners.sortOrder == 1){
  //     $("#bannerpartnerModal").modal("hide");
  //   } 
  //   else if(banners.sortOrder == 2){
  //     $("#bannercustomerModal").modal("hide");
  //   }
  // }

  hidebannercustomerrModal() {
    $("#bannercustomerModal").modal("hide");
  }

  getpartnersbanner() {
    this.api.get("banner/get-carousel?vertical=0").subscribe((resp) => {
      this.meetpartnerslist = resp.data;
    })
  }

  // *****ORG*****
  // CommonTestimonial() {
  //   this.api.get("testimonial?vertical=0").subscribe((resp) => {
  //     this.CommonrTestimonialdata = resp.data;

  //   });
  // }


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
    return testimonial?.profileReview?.length > 222;
  }

  getReviewContent(testimonial: any): string {
    if (testimonial.expanded) {
      return testimonial?.profileReview;
    } else if (testimonial?.profileReview?.length > 222) {
      return testimonial?.profileReview?.slice(0, 222) + '...';
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
    // this.Token = localStorage.getItem("CustToken");
    // this.CreditUrl = environment.CreditUrl.replace("{TOKEN}", encodeURIComponent(this.Token));
    // this.CreditUrl = this.CreditUrl.replace("{PATH}", encodeURIComponent(Path));
    // window.location.href = this.CreditUrl;
    // window.open(credit.path, '_blank');


    console.log("name", credit)
    if (credit.name === "Savings & Insurance") {
      console.log("begin");
      $("#leadModal").modal("show");
      console.log("after");
    }
    else {
      console.log('credit', credit.path)
      // this.route.navigate([insurence.path]);
      $("#leadModal").modal("hide");
      // window.location.href = credit.path;
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
      // this.route.navigate([insurence.path]);
      $("#leadModal").modal("hide");
      // window.location.href = insurence.path;
      window.open(insurence.path, '_blank');
    }
  }

  wealthtRouterUrl(wealth: any) {
    // this.Token = localStorage.getItem("CustToken");
    // this.WealthUrl = environment.WealthUrl.replace("{TOKEN}", encodeURIComponent(this.Token));
    // this.WealthUrl = this.WealthUrl.replace("{PATH}", encodeURIComponent(Path));
    // window.location.href = this.WealthUrl;

    console.log("name", wealth)
    if (wealth.name === "Savings & Insurance") {
      console.log("begin");
      $("#leadModal").modal("show");
      console.log("after");
    }
    else {
      console.log('credit', wealth.path)
      // this.route.navigate([insurence.path]);
      $("#leadModal").modal("hide");
      // window.location.href = credit.path;
      window.open(wealth.path, '_blank');

    }
  }

  GetApplicantData() {
    // debugger
    this.api.get("auth/customer/user", true).subscribe(response => {
      localStorage.setItem("ApplicantData", this.crypto.Encrypt(response.data));
    })
  }

  GetBlogList() {
    this.api.get("banner/get-blog").subscribe(response => {
      // console.log('get-blog', response);
      this.BlogList = response.items;
      console.log('list of blogs', this.BlogList);

      for (let i = 0; i < this.BlogList.length; i++) {
        if (this.BlogList[i].content.indexOf('src=\"') > 0) {
          this.blogimage = this.BlogList[i].content.split('src=\"');
          this.blogimage = this.blogimage[1].split('" width');
          this.blogimage = this.blogimage[0].replace('"', '');
          this.BlogList[i].blogimage = this.blogimage;
        }
        else {
          this.BlogList[i].blogimage = 'assets/img/no-blog.png';
        }
      }
      // console.log('updated list', this.BlogList);
    })
  }

  GoToInsureRight() {
    window.location.href = 'https://uat.finizoninsurance.com/covercalc';
  }


  // modal part for phydigital section

  showPartnerModal() {
    console.log("hello")
    $("#partnerModal").modal("show");
    // console.log("partnerModal:", this.showModal);
  }

  hidePartnerModal() {
    $("#partnerModal").modal("hide");
  }

  cancleModal() {

    $("#headerotp-screen").modal("hide");
  }



 


  // scrollToTop() {
  //   const headerElement = this.elementRef.nativeElement.querySelector('top');
  //   if (headerElement) {
  //     headerElement.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }

  //  scrollToTop() {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth'
  //   });
  // }

  // scrollToTop() {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth' // Smooth scrolling animation
  //   });
  // }
  // scrollToTop() {
  //   const scrollContainerEl = this.scrollContainer.nativeElement;
  //   this.renderer.setProperty(scrollContainerEl, 'scrollTop', 0);
  // }

}
