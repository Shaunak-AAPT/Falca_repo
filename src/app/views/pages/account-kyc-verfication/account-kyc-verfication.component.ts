import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';
import { AESCryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/validate/validate.service';

@Component({
  selector: 'app-account-kyc-verfication',
  templateUrl: './account-kyc-verfication.component.html',
  styleUrls: ['./account-kyc-verfication.component.css']
})
export class AccountKycVerficationComponent implements OnInit {

  ApplicantData: any;
  username :any;

  constructor(public validation: ValidateService, public toastr: ToastrService,private api: ApiService, private route: Router, private crypto: AESCryptoService) { }

  ngOnInit(): void {
    if (localStorage.getItem("ApplicantData") != null) {
      this.ApplicantData = this.crypto.Decrypt(localStorage.getItem("ApplicantData"));
      // console.log("ApplicantData", this.ApplicantData);
      // var newdata = this.ApplicantData.mobileNumber.toString().substr(this.ApplicantData.mobileNumber.toString().length - 4)
      var number = Math.floor(Math.random()*90000) + 10000;
      this.username = (this.ApplicantData.firstName+this.ApplicantData.lastName+'_'+number+'_finizon').toLowerCase();
    }
  }

  CreateSignZyOnboardInvestor() {
    const data = {
      "email": this.ApplicantData.email,
      "username": this.username,
      "phone": this.ApplicantData.mobileNumber.toString(),
      "name": this.ApplicantData.firstName,
      // "ttl": '30 mins',
    } 
    // console.log(data);
    this.api.post("signzy/onboard-investor",data).subscribe(response=>{
      if(response.response.n==1){
        this.route.navigate(['/kyc-pan-verification']);
      }
      else{
        this.toastr.error(response.response.Msg);
      }
    })   
  }



}
