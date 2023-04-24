import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { AESCryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { EligibilityService } from 'src/app/services/eligibility/eligibility.service';
import { ValidateService } from 'src/app/services/validate/validate.service';

@Component({
  selector: 'app-active-insurance',
  templateUrl: './active-insurance.component.html',
  styleUrls: ['./active-insurance.component.css']
})
export class ActiveInsuranceComponent implements OnInit {
nomineelist:any;
activePraposerNumber:any;
age:any;
memberlist:any;
policyDetailsList:any;
praposerDetails:any;
  constructor(public validation: ValidateService, private eligibility:EligibilityService, private api: ApiService, private route: Router, private crypto: AESCryptoService) { }

  ngOnInit(){
    debugger;
this.activePraposerNumber = JSON.parse(this.eligibility.getSessionParams("ActivePraposer"));
console.log("number",this.activePraposerNumber);
    this.accountDetails();
    this.ActivePrposerDetails();
    this.policyDetails();
 }
accountDetails(){
 
  this.api.get("insurance/nominee-details?proposal_no="+this.activePraposerNumber.proposal_no.toString(),true).subscribe(async (resp)=>{
    console.log(resp);
    this.nomineelist = resp.data;
    const bdate = new Date(this.nomineelist?.dob);
    const timeDiff = Math.abs(Date.now() - bdate.getTime() );
    this.age  = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
  })

}

ActivePrposerDetails(){
  debugger;
  this.api.get("insurance/add-member-details?proposal_no="+this.activePraposerNumber.proposal_no.toString(),true).subscribe(async (resp)=>{
  
    this.memberlist=resp.memberDetails;
    this.praposerDetails = resp.proposerDetails;
    console.log("this.memberlist",this.memberlist);
    console.log("this.praposerDetails ",this.praposerDetails);
  })
}

policyDetails(){
  this.api.get("motor/get-policy-status?proposal_no="+this.activePraposerNumber.proposal_no.toString(),true).subscribe(async (resp)=>{  
    this.policyDetailsList=resp.data;
    console.log("this.policyDetailsList",this.policyDetailsList);
  })
}
}
