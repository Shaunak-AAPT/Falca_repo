import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/services/api/api.service';
import { AESCryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
import { environment } from 'src/environments/environment';

declare var $: any;

@Component({
  selector: 'app-wealth-home',
  templateUrl: './wealth-home.component.html',
  styleUrls: ['./wealth-home.component.css']
})
export class WealthHomeComponent implements OnInit {
  wealthbannerList: any;
  tesimonialwealthdata: any;
  productwealthdata: any;
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
    dots: false,
    dotsEach: true,
    lazyLoad: false,
    autoplay: true,
    autoplaySpeed: 500,
    navSpeed: 500,
    autoplayTimeout: 5000,
    autoplayHoverPause: true
  }

  showGrid: boolean = false;

  private routeSub: any;
  QueryToken: any;
  Path: any;
  DG:any;
  _paramSub: any;
  BlogList: any;
  blogimage: any;
  ShowLoader: any = false;
  DGLoginEmail = environment.DGLoginEmail;
  DGLoginPassword = environment.DGLoginPassword;

  constructor(private api: ApiService, private route: Router, public activeRoute: ActivatedRoute, public validation: ValidateService, private crypto: AESCryptoService,) { }

  ngOnInit(): void {


    this._paramSub = this.activeRoute.queryParams.subscribe(async params => {
      // console.log(params);
      this.QueryToken = params.TOKEN;
      this.Path = params.PATH;
      this.DG = params.DG;
      // console.log("QueryToken", this.QueryToken);
      // console.log("Path", this.Path);
    });

    this._paramSub.unsubscribe();

    if (!this.validation.isNullEmptyUndefined(this.Path) && this.Path != "null" && this.Path != "{PATH}") {
      this.ShowLoader = true;
    }

    if (!this.validation.isNullEmptyUndefined(this.QueryToken) && this.QueryToken != 'null' && this.QueryToken != "{TOKEN}") {
      // debugger;
      this.QueryToken = decodeURIComponent(this.QueryToken);
      localStorage.setItem("CustToken", this.QueryToken);
      this.api.get("auth/customer/user", true).subscribe(async response => {
        // console.log('ApplicantData',response)
        localStorage.setItem("ApplicantData", this.crypto.Encrypt(response.data));
      })
    }
    setTimeout(() => {
      if (!this.validation.isNullEmptyUndefined(this.Path) && this.Path != 'null' && this.Path != "{PATH}") {

        if ((!this.validation.isNullEmptyUndefined(this.DG) && this.DG != "null" && this.DG != "{DG}") && (this.DG == "true")) {
          localStorage.setItem('DGProceed','1');
        }

        // if(this.Path == '/digital-gold-product-details'){
        //   localStorage.setItem('DGProceed','1');
        // }
        this.route.navigate([this.Path]);
        this.ShowLoader = false;
      }
      else {
        // commmented by sw as while merging the code it was refreshing the /wealth route and redirecting to commonui home/landing page  
        // this.route.navigate(['']);
        this.ShowLoader = false;
      }
    }, 1000);

    this.getwealthBanner();
    this.TestimonialWealth();
    this.ProductsWealth();
    this.GetBlogList();

  }
  getwealthBanner() {
    this.api.get("banner?vertical=3").subscribe((resp) => {
      this.wealthbannerList = resp.data;
      console.log("banner data", this.wealthbannerList);
    });
  }


  partnerWealth(banners: any) {
    if (banners.sortOrder === 1) {
      window.open("https://forms.gle/t4D9wrpJWNiFVpDS8", "_blank");
    }
  }

  customerWealth(banners: any) {
    if (banners.sortOrder === 2) {
      window.open("https://forms.gle/J1WexoLfsLAoMrAp7", "_blank");
    }
  }


  // TestimonialWealth() {
  //   this.api.get("testimonial?vertical=3").subscribe((resp) => {
  //     this.tesimonialwealthdata = resp.data;
  //     // console.log("Testimonial data", this.tesimonialwealthdata);
  //   });
  // }

  TestimonialWealth() {
    this.api.get("testimonial?vertical=3").subscribe((resp) => {
      this.tesimonialwealthdata = resp.data.map((testimonial: any) => ({
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
    } 
    else {
      return testimonial?.profileReview;
    }
  }

  ProductsWealth() {
    this.api.get("vertical/product?vertical=4").subscribe((resp) => {
      this.productwealthdata = resp.data;
      // console.log("product data", this.productwealthdata);
    });
  }
  GotoRecommendedOffers(Product: any) {
    // this.route.navigate([Product.path.trim()]);

    window.open(Product.path, '_blank');
  }

  GetApplicantData() {
    this.api.get("auth/customer/user", true).subscribe(response => {
      localStorage.setItem("ApplicantData", this.crypto.Encrypt(response.data));
    })
  }

  GetBlogList() {

    this.api.get("banner/get-blog?labels=Wealth").subscribe(response => {
      // console.log('get-blog', response);
      this.BlogList = response.items;
      // console.log('list', this.BlogList);
      for (let i = 0; i < this.BlogList.length; i++) {
        if (this.BlogList[i].content.indexOf('src=\"') > 0) {
          this.blogimage = this.BlogList[i].content.split('src=\"');
          this.blogimage = this.blogimage[1].split('" width');
          this.blogimage = this.blogimage[0].replace('"', '');
          this.BlogList[i].blogimage = this.blogimage;
        }
        else {
          // this.BlogList[i].blogimage = 'assets/img/blog_thumnail_1.png';
          this.BlogList[i].blogimage = 'assets/img/no-blog.png';

        }
      }
      // console.log('updated list', this.BlogList);
    })

  }

  // modal part for phydigital section
  showPartnerModal() {

    $("#partnerModal").modal("show");
    // console.log("partnerModal:", this.showModal);
  }

  hidePartnerModal() {
    $("#partnerModal").modal("hide");
  }

}
