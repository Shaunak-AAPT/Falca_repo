import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-account-risk-profiling',
  templateUrl: './account-risk-profiling.component.html',
  styleUrls: ['./account-risk-profiling.component.css']
})
export class AccountRiskProfilingComponent implements OnInit {

  constructor(private api:ApiService, public validation: ValidateService) { }

  Token: any;
  WealthUrl = environment.WealthUrl;
  RiskProfileAlreadyTaken: boolean = false;

  ngOnInit(): void {
    this.getRiskProfileStatus();
  }

  GotoWealth(Path: any) {
    this.Token = localStorage.getItem("CustToken");
    this.WealthUrl = environment.WealthUrl.replace("{TOKEN}", encodeURIComponent(this.Token));
    if (!this.validation.isNullEmptyUndefined(Path)) {
      this.WealthUrl = this.WealthUrl.replace("{PATH}", encodeURIComponent(Path));
    }
    window.location.href = this.WealthUrl;
  }

  getRiskProfileStatus(){
    this.api.get('riskProfiling/submit-risk-profile-questions',true).subscribe(response=>{
      // console.log('risk profile',response)
      if(response.response.n==1){
        this.RiskProfileAlreadyTaken=true;
      }
      else{
        this.RiskProfileAlreadyTaken=false;
      }
    })
  }



}
