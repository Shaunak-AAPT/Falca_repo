import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
declare var $:any;
@Component({
  selector: 'app-sip',
  templateUrl: './sip.component.html',
  styleUrls: ['./sip.component.css']
})
export class SipComponent implements OnInit {

  value11: number = 10;
  options11: Options = {
    floor: 1,
    ceil: 25,
    translate: (value11: number, label: any): string => {
      if (isNaN(+value11)) {
        this.value11 = 0;
      }
      switch (label) {
        case label.Low:
          return "<b>Min 1 Year</b> ₹" + value11;
        case label.High:
          return "<b>Max 25 Year</b> ₹" + value11;
        default:
          return value11 + " Year";
      }
    }

  };

  value12: number = 500;
  slidervalue12: number = 500
  options12: Options = {
    floor: 500,
    ceil: 500000,
    translate: (slidervalue12: number, label: any): string => {
      if (isNaN(+slidervalue12)) {
        this.value12 = 0;
        this.slidervalue12 = 0;
      }
      this.value12 = this.slidervalue12;
      switch (label) {
        case label.Low:
          return "<b>Min 500 </b> ₹" + slidervalue12;
        case label.High:
          return "<b>Max 5 Lakh</b> ₹" + slidervalue12;
        default:
          return "₹" + this.returnAmountInText(slidervalue12);
      }
    }

  };


  value13: number = 8;
  Slidervalue13: number = 8;
  options13: Options = {
    floor: 0,
    ceil: 20,
    step: 0.01,
    translate: (Slidervalue13: number, label: any): string => {
      if (isNaN(+Slidervalue13)) {
        this.value13 = 0;
        this.Slidervalue13 = 0;
      }
      this.value13 = this.Slidervalue13;
      switch (label) {
        case label.Low:
          return "<b>Min 1%</b> " + Slidervalue13;
        case label.High:
          return "<b>Max 20%</b> " + Slidervalue13;
        default:
          return Slidervalue13 + "%";
      }
    }
  };


  value14: number = 5;
  Slidervalue14: number = 5;
  options14: Options = {
    floor: 0,
    ceil: 15,
    step: 0.01,
    translate: (Slidervalue14: number, label: any): string => {
      if (isNaN(+Slidervalue14)) {
        this.value14 = 0;
        this.Slidervalue14 = 0;
      }
      this.value14 = this.Slidervalue14;
      switch (label) {
        case label.Low:
          return "<b>Min 1%</b> " + Slidervalue14;
        case label.High:
          return "<b>Max 15%</b> " + Slidervalue14;
        default:
          return Slidervalue14 + "%";
      }
    }
  };
  investmentMode: string = "1";
  ResponseData = { "futureValueOfInvestment": 0, "inflatedInvestmentAmount": 0 }

  constructor(public validation: ValidateService, private api: ApiService) { }

  ngOnInit(): void {
    this.GetSIP();
    $(".body-color").scroll(function () {   
      if($(".body-color").scrollTop() > 150) {
         $('#sidebar').css('position','fixed');
         $('#sidebar').css('top','3%'); 
         $('#sidebar').css('width',$("#sidebar-main").width()+'px'); 
      }   
      else if ($(".body-color").scrollTop() <= 150) {
         $('#sidebar').css('position','');
         $('#sidebar').css('top','');
         $('#sidebar').css('width',''); 
      }   
         if ($('#sidebar').offset().top + $("#sidebar").height() > $("#footer").offset().top-100) {
             $('#sidebar').css('top',-($("#sidebar").offset().top + $("#sidebar").height() - $("#footer").offset().top+100));
         }
     });
  }

  returnAmountInText(value: number) {
    let GivenValue = value.toString();
    if (GivenValue.length > 5 && GivenValue.length < 8) {
      return (parseFloat(GivenValue) / 100000).toFixed(2) + ' Lakh';
    } else if (GivenValue.length > 7) {
      return (parseFloat(GivenValue) / 10000000).toFixed(2) + ' Cr';
    }
    else {
      return GivenValue;
    }
  }

  GetSIP() {
    let data = new FormData();
    data.append("currentAmount", this.value12.toString());
    data.append("tenureInMonths", (this.value11 * 12).toString());
    data.append("investmentMode", this.investmentMode.toString());
    data.append("rateReturn", this.value13.toString());
    data.append("rateInflation", this.value14.toString());
    this.api.post('sipCalculator/sip-tools', data).subscribe(response => {
      if (response.response.n == 1) {
        response.data.futureValueOfInvestment = response.data.futureValueOfInvestment.toFixed(2);
        response.data.inflatedInvestmentAmount = response.data.inflatedInvestmentAmount.toFixed(2);
        this.ResponseData = response.data;
      } else {
        alert(response.response.Msg);
      }
    })
  }

}
