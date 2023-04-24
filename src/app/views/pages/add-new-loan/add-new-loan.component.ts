import { Options } from '@angular-slider/ngx-slider';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';
import { AESCryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
declare var $: any;

@Component({
  selector: 'app-add-new-loan',
  templateUrl: './add-new-loan.component.html',
  styleUrls: ['./add-new-loan.component.css'],
  animations: [
    trigger('fadeinout', [
      state('hide', style({ 'height': '0%', 'opacity': '0', 'display': 'none' })),
      state('visible', style({ 'height': '4%', 'opacity': '1' })),
      transition('hide => visible', [
        style({ 'display': 'block' }), animate('1000ms ease-in')
      ]),
      transition('visible => hide', [animate('10ms ease-out')])
    ])
  ]
})
export class AddNewLoanComponent implements OnInit {

  Steps: number = 1;
  step3: any = 20000;
  step4: any = 150;
  StepsWidth: number = 0;
  ShowEligibility: boolean = false;
  selectedItem: any;
  selectedType: any;
  options21: Options = {
    floor: 20000,  
    ceil: 5000000,
    step:5000,
    hidePointerLabels: true,
    translate: (step3: number, label: any): string => {
      switch (label) {
        // case label.Low:
        //   return "<b>Min 1 Lakh</b> ₹" + step3;
        // case label.High:
        //   return "<b>Max 50 Lakh</b> ₹" + step3;
        default:
          return "₹" + step3;
      }
    }    

  };
  options22: Options = {
    floor: 12,
    ceil: 420,
    hidePointerLabels: true,
    translate: (step4: number, label: any): string => {
      switch (label) {
        case label.Low:
          return "<b>Min 12 </b> " + step4;
        case label.High:
          return "<b>Max 420 </b> " + step4;
        default:
          return step4 + "Months";
      }
    }

  };

  lenderList: any;
  DueDateArray: any = [];


  OfflineLoanData: any = {
    "loan_type": "",
    "product_name": "",
    "loan_amount": "20000",
    "tenure": "150",
    "roi": "",
    "emi_start_date": "",
    "emi_end_date": "",
    "emi_due_date": "",
    "application_status": "Approved",
    "emi_month": "",
    "outstanding_loan_amount": "",
    "offline":1,
  }


  constructor(public validate: ValidateService, private toastr: ToastrService, private api: ApiService, private route: Router, private crypto: AESCryptoService) { }

  ngOnInit(): void {

    // for (let i = this.Steps + 1; i <= 9; i++) {
    //   $("#step" + i).addClass("active");
    // }

    this.getLenders();
    this.getDueDateArray();
    this.maxdate();

    $(".body-color").scroll(function () {
      if ($(".body-color").scrollTop() > 150) {
        $('#sidebar').css('position', 'fixed');
        $('#sidebar').css('top', '5%');
        $('#sidebar').css('width', $("#sidebar-main").width() + 'px');
        $('#sidebar').css('height', '430px');
        $('#sidebar .btn-div').css('padding', "0px");
      }
      else if ($(".body-color").scrollTop() <= 150) {
        $('#sidebar').css('position', '');
        $('#sidebar').css('top', '');
        $('#sidebar').css('width', '');
        $('#sidebar .btn-div').css('padding', "");
      }
      if ($('#sidebar').offset().top + $("#sidebar").height() > $("#footer").offset().top - 100) {
        $('#sidebar').css('top', -($("#sidebar").offset().top + $("#sidebar").height() - $("#footer").offset().top + 100));
      }
    });   

    // console.log('options',this.options21.floor, this.options21.ceil)
  }


  updateLoanvalues(){
    // debugger
    if(this.OfflineLoanData.loan_type==1){
      this.options21={ floor: 20000, ceil: 5000000, step: 5000 };
    }
    if(this.OfflineLoanData.loan_type==2){
      this.options21={ floor: 20000, ceil: 50000000, step: 5000 };
    }
    if(this.OfflineLoanData.loan_type==3){
      this.options21={ floor: 20000, ceil: 5000000, step: 5000 };
    }
    if(this.OfflineLoanData.loan_type==4){
      this.options21={ floor: 20000, ceil: 10000000, step: 5000 };
    }
    if(this.OfflineLoanData.loan_type==5){
      this.options21={ floor: 20000, ceil: 50000000, step: 5000 };
    }

    // this.options21

    // console.log('options21',this.options21.ceil)
  }

  getDueDateArray() {
    for (let i = 0 + 1; i <= 31; i++) {
      this.DueDateArray.push(i);
    }
  }

  getLenders() {
    this.api.get("common/lender").subscribe((resp) => {
      this.lenderList = resp.data;
    });
  }

  maxdate(){
    var dtToday = new Date();
    var month = (dtToday.getMonth() + 1).toString();
    var day = (dtToday.getDate()).toString();
    var year = dtToday.getFullYear();
    if(parseInt(month) < 10){
     month = '0' + month.toString();
    }
    if(parseInt(day) < 10){
     day = '0' + day.toString();
    }
    var maxDate = year + '-' + month + '-' + day;
    $('#emistartdate').attr('max', maxDate);
  }

  Getemienddate(){
    var dtToday = new Date(this.OfflineLoanData.emi_start_date);
    dtToday.setDate(dtToday.getDate() + 30);
    var month = (dtToday.getMonth() + 1).toString();
    var day = (dtToday.getDate()).toString();
    var year = dtToday.getFullYear();
    if(parseInt(month) < 10){
      month = '0' + month.toString();
    }
    if(parseInt(day) < 10){
        day = '0' + day.toString();
      }
      var maxDate = year + '-' + month + '-' + day;
      $('#emienddate').attr('min', maxDate);
  }

  UpdateBalanceAmount(){
    
  }

  NextStep(numtoadd: number = 1) {
    if (this.validate.isNullEmptyUndefined(this.OfflineLoanData.product_name) && this.Steps == 1) {
      this.toastr.error("Product Name is mandatory");
      return false;
    }
    if (this.validate.isNullEmptyUndefined(this.OfflineLoanData.loan_type) && this.Steps == 2) {
      this.toastr.error("Loan Type is mandatory");
      return false;
    }
    if (this.OfflineLoanData.loan_amount < 20000 && this.Steps == 3) {
      this.toastr.error("Loan amount is mandatory and should be greater than 20,000");
      return false;
    }
    if (this.OfflineLoanData.tenure < 1 && this.Steps == 4) {
      this.toastr.error("Tenure is mandatory and should not be zero");
      return false;
    }
    if (this.validate.isNullEmptyUndefined(this.OfflineLoanData.emi_start_date) && this.Steps == 5) {
      this.toastr.error("Emi Start Date is mandatory");
      return false;
    }
    if (this.validate.isNullEmptyUndefined(this.OfflineLoanData.emi_end_date) && this.Steps == 5) {
      this.toastr.error("Emi End Date is mandatory");
      return false;
    }
    if (this.validate.isNullEmptyUndefined(this.OfflineLoanData.emi_due_date) && this.Steps == 6) {
      this.toastr.error("Emi Due Date is mandatory");
      return false;
    }
    if (this.validate.isNullEmptyUndefined(this.OfflineLoanData.roi) && this.Steps == 7) {
      this.toastr.error("Current rate of interest is mandatory");
      return false;
    }
    if (this.OfflineLoanData.roi > 20 && this.Steps == 7) {
      this.toastr.error("Rate of interest must be between 0 and 20");
      return false;
    }
    if (this.validate.isNullEmptyUndefined(this.OfflineLoanData.emi_month) && this.Steps == 8) {
      this.toastr.error("Current monthly EMI is mandatory");
      return false;
    }
    if (this.validate.isNullEmptyUndefined(this.OfflineLoanData.outstanding_loan_amount) && this.Steps == 9) {
      this.toastr.error("Balance Loan Amount is mandatory");
      return false;
    }

    this.ShowEligibility = false;
    for (let i = this.Steps + 1; i <= 9; i++) {
      $("#step" + i).removeClass("active");
    }
    this.Steps = this.Steps + numtoadd;
    this.StepsWidth = this.StepsWidth + 10;
    if (this.StepsWidth > 100) {
      this.StepsWidth = 100;
    }
    if (this.Steps == 9) {
      this.ShowEligibility = true;
    }
    var $parentDiv = $('.process-div');
    var $innerListItem = $("#step" + this.Steps);
    $innerListItem.addClass("active");
    // $parentDiv.animate({ scrollTop: ($innerListItem.position().top - 50) }, 1000);   
    $parentDiv.animate({ scrollTop: ($parentDiv.scrollTop() + $innerListItem.position().top - $parentDiv.height() / 2 + $innerListItem.height() / 2) }, 1000);

    return true;
  }

  SubmitLoan() {
    var selectedemistartdate= new Date(this.OfflineLoanData.emi_start_date);
    var selectedemienddate= new Date(this.OfflineLoanData.emi_end_date);

    if (this.validate.isNullEmptyUndefined(this.OfflineLoanData.product_name)) {
      this.toastr.error("Product Name is mandatory");
    }
    else if (this.validate.isNullEmptyUndefined(this.OfflineLoanData.loan_type)) {
      this.toastr.error("Loan Type is mandatory");
    }
    else if (this.OfflineLoanData.loan_amount < 20000) {
      this.toastr.error("Loan amount is mandatory and should be greater than 20,000");
    }
    else if (this.OfflineLoanData.tenure < 1) {
      this.toastr.error("Tenure is mandatory and should not be zero");
    }
    else if (this.validate.isNullEmptyUndefined(this.OfflineLoanData.emi_start_date)) {
      this.toastr.error("Emi Start Date is mandatory");
    }
    else if (this.validate.isNullEmptyUndefined(this.OfflineLoanData.emi_end_date)) {
      this.toastr.error("Emi End Date is mandatory");
    }
    else if(selectedemistartdate > selectedemienddate){
      this.toastr.error("Select valid emi end date ");
    }  
    else if (this.validate.isNullEmptyUndefined(this.OfflineLoanData.emi_due_date)) {
      this.toastr.error("Emi Due Date is mandatory");
    }  
    else if (this.validate.isNullEmptyUndefined(this.OfflineLoanData.roi)) {
      this.toastr.error("Current rate of interest is mandatory");
    }
    else if (this.OfflineLoanData.roi > 20) {
      this.toastr.error("Rate of interest must be between 0 and 20");
    }
    else if (this.validate.isNullEmptyUndefined(this.OfflineLoanData.emi_month)) {
      this.toastr.error("Current monthly EMI is mandatory");
    }
    else if (this.validate.isNullEmptyUndefined(this.OfflineLoanData.outstanding_loan_amount)) {
      this.toastr.error("Balance Loan Amount is mandatory");
    }
    else {
      let Data = new FormData();
      Data.append('loan_type',this.OfflineLoanData.loan_type);
      Data.append('product_name',this.OfflineLoanData.product_name);
      Data.append('loan_amount',this.OfflineLoanData.loan_amount);
      Data.append('tenure',this.OfflineLoanData.tenure);
      Data.append('roi',this.OfflineLoanData.roi);
      Data.append('emi_start_date',this.OfflineLoanData.emi_start_date);
      Data.append('emi_end_date',this.OfflineLoanData.emi_end_date);
      Data.append('emi_due_date',this.OfflineLoanData.emi_due_date);
      Data.append('emi_month',this.OfflineLoanData.emi_month);
      Data.append('application_status',this.OfflineLoanData.application_status);
      Data.append('outstanding_loan_amount',this.OfflineLoanData.outstanding_loan_amount);
      Data.append('offline',this.OfflineLoanData.offline);
      this.api.post('dashboard/get-credit-products', Data, true).subscribe(response=>{
        // console.log(response)
        if(response.response.n==1){
          this.route.navigate(['/account-details']);
        }
        else{
          this.toastr.error(response.response.Msg);
        }        
      })
    }
  }

}
