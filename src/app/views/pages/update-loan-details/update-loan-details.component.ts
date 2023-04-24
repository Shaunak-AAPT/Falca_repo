import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';
import { AESCryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
declare var $: any;
@Component({
  selector: 'app-update-loan-details',
  templateUrl: './update-loan-details.component.html',
  styleUrls: ['./update-loan-details.component.css']
})
export class UpdateLoanDetailsComponent implements OnInit {
  private routeSub: any;
  id: any;
  uploadStatement: boolean = false;
  tenure: any;
  roi: any;
  emi_month: any;
  currentyear: any;
  currentmonth: any;
  EMIStartyear: any;
  EMIStartmonth: any;
  OfflineLoanData: any;
  EMIYear: any;
  array: any = [];
  SubmitMonthArray: any = [];
  filteredArraytovalidate: any = [];
  MissingfromArray: any = [];
  MonthArray: any = [
    { "year": '', "month": 1, "Active": 0, "monthText": 'January', "disabled": 0 },
    { "year": '', "month": 2, "Active": 0, "monthText": 'February', "disabled": 0 },
    { "year": '', "month": 3, "Active": 0, "monthText": 'March', "disabled": 0 },
    { "year": '', "month": 4, "Active": 0, "monthText": 'April', "disabled": 0 },
    { "year": '', "month": 5, "Active": 0, "monthText": 'May', "disabled": 0 },
    { "year": '', "month": 6, "Active": 0, "monthText": 'June', "disabled": 0 },
    { "year": '', "month": 7, "Active": 0, "monthText": 'July', "disabled": 0 },
    { "year": '', "month": 8, "Active": 0, "monthText": 'August', "disabled": 0 },
    { "year": '', "month": 9, "Active": 0, "monthText": 'September', "disabled": 0 },
    { "year": '', "month": 10, "Active": 0, "monthText": 'October', "disabled": 0 },
    { "year": '', "month": 11, "Active": 0, "monthText": 'November', "disabled": 0 },
    { "year": '', "month": 12, "Active": 0, "monthText": 'December', "disabled": 0 }
  ];

  constructor(public validate: ValidateService, private toastr: ToastrService, private api: ApiService, private route: Router, private crypto: AESCryptoService, private router: ActivatedRoute) { }


  ngOnInit(): void {
    this.routeSub = this.router.params.subscribe(params => {
      this.id = params['id'];
    });

    this.GetLoanByID();

    $('#demo').carousel({
      interval: false,
      wrap: false
    })
  }

  GetLoanByID() {
    const data = new FormData();
    data.append("loan_id", this.id);
    this.api.post('dashboard/getloan-by-id', data, true).subscribe(response => {
      // console.log('GetLoanByID', response)
      if (response.response.n == 1) {
        this.OfflineLoanData = response.data[0];
        this.tenure = this.OfflineLoanData.tenure;
        this.roi = this.OfflineLoanData.roi;
        this.emi_month = this.OfflineLoanData.emi_month;
        this.getYearList();
      }
    })
  }

  getYearList() {
    this.currentyear = new Date().getFullYear();
    this.currentmonth = new Date().getMonth() + 1;
    this.EMIStartyear = new Date(this.OfflineLoanData.emi_start_date).getFullYear();
    this.EMIStartmonth = new Date(this.OfflineLoanData.emi_start_date).getMonth() + 1;
    // console.log('current year', this.currentyear, 'emistartyear', this.EMIStartyear, 'EMIStartmonth', this.EMIStartmonth, 'currentmonth', this.currentmonth);
    this.EMIYear = this.EMIStartyear;
    this.GetEmiMonthsByYear();
    // console.log(this.EMIYear)
  }

  UpdateEMIAmount() {
    if (this.validate.isNullEmptyUndefined(this.roi)) {
      this.toastr.error('Rate of interest is mandatory');
    }
    else if (this.validate.isNullEmptyUndefined(this.emi_month)) {
      this.toastr.error('Emi amount is mandatory');
    }
    else {
      const data = new FormData();
      data.append("roi", this.roi);
      data.append("emi_month", this.emi_month);
      this.api.post('dashboard/update-emi/' + this.id, data, true).subscribe(response => {
        // console.log(response)
        if (response.response.n == 1) {
          this.OfflineLoanData.roi = this.roi;
          this.OfflineLoanData.emi_month = this.emi_month;
          $("#emiamount-modal").modal("hide");
          this.toastr.success(response.response.Msg);
        }
        else {
          this.toastr.error(response.response.Msg);
        }
      })
    }
  }

  UpdateTenure() {
    if (this.validate.isNullEmptyUndefined(this.tenure)) {
      this.toastr.error('Tenure is mandatory');
    }
    else {
      const data = new FormData();
      data.append("tenure", this.tenure);
      this.api.post('dashboard/update-tenure/' + this.id, data, true).subscribe(response => {
        // console.log(response)
        if (response.response.n == 1) {
          this.OfflineLoanData.tenure = this.tenure;
          $("#loantenure-modal").modal("hide");
          this.toastr.success(response.response.Msg);
        }
        else {
          this.toastr.error(response.response.Msg);
        }
      })
    }
  }

  IncrementYear() {
    if (this.EMIYear < this.currentyear) {
      this.EMIYear++;
      this.ResetMonthArray();
      this.GetEmiMonthsByYear();
    }
  }

  DecrementYear() {
    if (this.EMIYear > this.EMIStartyear) {
      this.EMIYear--;
      this.ResetMonthArray();
      this.GetEmiMonthsByYear();
    }
  }

  ResetMonthArray() {
    this.MonthArray = [
      { "year": this.EMIYear, "month": 1, "Active": 0, "monthText": 'January', "disabled": 0 },
      { "year": this.EMIYear, "month": 2, "Active": 0, "monthText": 'February', "disabled": 0 },
      { "year": this.EMIYear, "month": 3, "Active": 0, "monthText": 'March', "disabled": 0 },
      { "year": this.EMIYear, "month": 4, "Active": 0, "monthText": 'April', "disabled": 0 },
      { "year": this.EMIYear, "month": 5, "Active": 0, "monthText": 'May', "disabled": 0 },
      { "year": this.EMIYear, "month": 6, "Active": 0, "monthText": 'June', "disabled": 0 },
      { "year": this.EMIYear, "month": 7, "Active": 0, "monthText": 'July', "disabled": 0 },
      { "year": this.EMIYear, "month": 8, "Active": 0, "monthText": 'August', "disabled": 0 },
      { "year": this.EMIYear, "month": 9, "Active": 0, "monthText": 'September', "disabled": 0 },
      { "year": this.EMIYear, "month": 10, "Active": 0, "monthText": 'October', "disabled": 0 },
      { "year": this.EMIYear, "month": 11, "Active": 0, "monthText": 'November', "disabled": 0 },
      { "year": this.EMIYear, "month": 12, "Active": 0, "monthText": 'December', "disabled": 0 }
    ];
  }

  GetEmiMonthsByYear() {
    // debugger
    const data = new FormData();
    data.append("creditLoanId", this.id);
    data.append("year", this.EMIYear)
    // console.log('emi year', this.EMIYear)
    this.api.post('dashboard/loan-by-id', data, true).subscribe(response => {
      // console.log('GetEmiMonthsByYear', response)
      if (response.response.n == 1) {
        this.array = response.data;       
      }
      this.GetsortEMIStatus();
    })
  }

  GetsortEMIStatus() {
    // debugger
    for (let i = 0; i < this.MonthArray.length; i++) {
      this.MonthArray[i].year = this.EMIYear;
      if ((this.MonthArray[i].month < this.EMIStartmonth) && (this.EMIYear == this.EMIStartyear)) {
        this.MonthArray[i].disabled = 1;
      }
      if ((this.MonthArray[i].month > this.currentmonth) && (this.EMIYear == this.currentyear)) {
        this.MonthArray[i].disabled = 1;
      }
      for (let j = 0; j < this.array.length; j++) {
        if (this.array[j].year == this.MonthArray[i].year && this.array[j].month == this.MonthArray[i].month) {
          this.MonthArray[i].Active = 1;
        }
      }
    }
  }  

  FindMissingMonth() {
    for (let i = 0; i < this.MonthArray.length; i++) {
      if (this.MonthArray[i].Active == 1) {
        this.filteredArraytovalidate.push(this.MonthArray[i].month)
      }
    }
    // console.log('this.filteredArraytovalidate', this.filteredArraytovalidate)
    var count = this.filteredArraytovalidate[this.filteredArraytovalidate.length - 1];
    for (var i = 1; i <= count; i++) {
      if (this.filteredArraytovalidate.indexOf(i) == -1) {
        this.MissingfromArray.push(i);
      }
    }
    // console.log('missing array', this.MissingfromArray)
  }

  ActiveMonth(month: any) {
    if (month.disabled == 0) {
      if (month.Active == 1) {
        month.Active = 0;
      }
      else {
        month.Active = 1;
      }
    }
  }

  UpdateEMIStatus() {
    // debugger
    this.SubmitMonthArray = this.MonthArray.filter(function (month: any) {
      return month.Active == 1;
    });
    this.SubmitEMIStatus();
  }

  SubmitEMIStatus() {
    if (this.SubmitMonthArray.length == 0) {
      this.toastr.error('Please select months');
    }
    else {
      this.FindMissingMonth();
      // debugger
      if (this.MissingfromArray.length == 0) {
        const data = {
          "creditLoanId": this.id,
          "status": this.SubmitMonthArray,
        }
        this.api.post('dashboard/emi-status', data).subscribe(response => {
          // console.log('SubmitEMIStatus', response)
          if (response.response.n == 1) {
            this.toastr.success(response.response.Msg);
            this.filteredArraytovalidate = [];
            this.MissingfromArray = [];
          }
          else {
            this.toastr.error(response.response.Msg);
          }
        })
      }
      else {
        this.toastr.error('Please select month in sequentially')
        this.filteredArraytovalidate = [];
        this.MissingfromArray = [];
      }
    }
  }
}
