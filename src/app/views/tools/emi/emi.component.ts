import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
declare var $:any;
@Component({
  selector: 'app-emi',
  templateUrl: './emi.component.html',
  styleUrls: ['./emi.component.css']
})
export class EmiComponent implements OnInit {


  LoanAmountArray=[{"min":100000,"max":5000000},{"min":500000,"max":50000000},{"min":100000,"max":10000000}]
  yearsArray=[{"min":1,"max":5},{"min":1,"max":30},{"min":1,"max":5}]
  InterestRateArray=[{"min":5,"max":25},{"min":5,"max":20},{"min":5,"max":25}]
  value1: number = 3000000;
  Slidervalue1: number = 3000000;
  options1: Options ={};
  value2: number = 10;
  options2: Options ={}; 
  value3: number = 20;
  Slidervalue3: number = 20;
  options3: Options ={};
  category="1";
  EmiResponse:any;
  
  constructor(private api:ApiService,public validation:ValidateService,private route:Router) { }

  ngOnInit(): void {
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
    this.resetFields();

  }
  getEMICalculation(){
    let data=new FormData();
    data.append("roi",this.value3.toString());
    data.append("loanAmount",this.value1.toString());
    data.append("tenure",(this.value2*12).toString());
    data.append("fullName","");
    data.append("mobileNumber","");
    data.append("email","");
    data.append("dob","");
    data.append("isSubmit","0");
    data.append("category",this.category);
    this.api.post('emi/calculate-emi',data).subscribe(response=>{
      if(response.response.n=1){
        this.EmiResponse=response.data.offers;
      }else{
        alert(response.response.Msg)
      }
    })
  }
  returnAmountInText(value:number){
      
    if(isNaN(+value)){
      return 0;
    }
    let GivenValue=value.toString();
    if(GivenValue.length>5 && GivenValue.length<8){
      return (parseFloat(GivenValue)/100000).toFixed(2)+' Lakh';
    }else if(GivenValue.length>7){
      return (parseFloat(GivenValue)/10000000).toFixed(2)+' Cr';
    }
    else{
      return GivenValue;
    }
  }

  getOptionForSilderAmount(){
    this.options1={};
    if(this.category=="1"){
      this.options1 = {
          floor: this.getTheFieldMinValue(1,0),
          ceil: this.getTheFieldMaxValue(1,0),
          translate: (Slidervalue1: number, label: any): string => {  
                    if(isNaN(+Slidervalue1)){
                      this.value1=0;
                      this.Slidervalue1=0;
                    }
                    this.value1=Slidervalue1;
                    switch (label) {  
                        case label.Low:  
                            return "<b>Min "+this.returnAmountInText(this.getTheFieldMinValue(1,0))+"</b> ₹" + Slidervalue1; 
                        case label.High:  
                            return "<b>Max "+this.returnAmountInText(this.getTheFieldMaxValue(1,0))+"</b> ₹" + Slidervalue1;  
                        default:  
                        return "₹" + this.returnAmountInText(Slidervalue1);  
                    }  
          }  
          
        };
    }else if(this.category=="2"){
      this.options1 = {
        floor: this.getTheFieldMinValue(1,1),
        ceil: this.getTheFieldMaxValue(1,1),
        translate: (Slidervalue1: number, label: any): string => {  
          if(isNaN(+Slidervalue1)){
            this.value1=0;
            this.Slidervalue1=0;
          }
          this.value1=Slidervalue1;
                  switch (label) {  
                      case label.Low:  
                          return "<b>Min "+this.returnAmountInText(this.getTheFieldMinValue(1,1))+"</b> ₹" + Slidervalue1; 
                      case label.High:  
                          return "<b>Max "+this.returnAmountInText(this.getTheFieldMaxValue(1,1))+"</b> ₹" + Slidervalue1;  
                      default:  
                      return "₹" + this.returnAmountInText(Slidervalue1);  
                  }  
        }  
        
      };
    }else if(this.category=="3"){
      this.options1 = {
        floor: this.getTheFieldMinValue(1,2),
        ceil: this.getTheFieldMaxValue(1,2),
        translate: (Slidervalue1: number, label: any): string => {  
          if(isNaN(+Slidervalue1)){
            this.value1=0;
            this.Slidervalue1=0;
          }
          this.value1=Slidervalue1;
                  switch (label) {  
                      case label.Low:  
                          return "<b>Min "+this.returnAmountInText(this.getTheFieldMinValue(1,2))+"</b> ₹" + Slidervalue1; 
                      case label.High:  
                          return "<b>Max "+this.returnAmountInText(this.getTheFieldMaxValue(1,2))+"</b> ₹" + Slidervalue1;  
                      default:  
                      return "₹" + this.returnAmountInText(Slidervalue1);  
                  }  
        }  
        
      };
    }
  }
  getOptionForSilderyears(){
    this.options2={};
    if(this.category=="1"){
      this.options2 = {
          floor: this.getTheFieldMinValue(2,0),
          ceil: this.getTheFieldMaxValue(2,0),
          translate: (value2: number, label: any): string => {  
                    switch (label) {  
                        case label.Low:  
                            return "<b>Min "+this.getTheFieldMinValue(2,0)+" Years</b> ₹" + value2; 
                        case label.High:  
                            return "<b>Max "+this.getTheFieldMaxValue(2,0)+" Years</b> ₹" + value2;  
                        default:  
                        return value2+" Years";  
                    }  
          }  
          
        };
    }else if(this.category=="2"){
      this.options2 = {
        floor: this.getTheFieldMinValue(2,1),
        ceil: this.getTheFieldMaxValue(2,1),
        translate: (value2: number, label: any): string => {  
                  switch (label) {  
                      case label.Low:  
                          return "<b>Min "+this.getTheFieldMinValue(2,1)+" Years</b> ₹" + value2; 
                      case label.High:  
                          return "<b>Max "+this.getTheFieldMaxValue(2,1)+" Years</b> ₹" + value2;  
                      default:  
                      return  value2+" Years";  
                  }  
        }  
        
      };
    }else if(this.category=="3"){
      this.options2 = {
        floor: this.getTheFieldMinValue(2,2),
        ceil: this.getTheFieldMaxValue(2,2),
        translate: (value2: number, label: any): string => {  
                  switch (label) {  
                      case label.Low:  
                          return "<b>Min "+this.getTheFieldMinValue(2,2)+" Years</b> ₹" + value2; 
                      case label.High:  
                          return "<b>Max "+this.getTheFieldMaxValue(2,2)+" Years</b> ₹" + value2;  
                      default:  
                      return  value2+" Years";  
                  }  
        }  
        
      };
    }
  }

  getOptionForSilderInterestRate(){
    this.options3={};
    if(this.category=="1"){
      this.options3 = {
          floor: this.getTheFieldMinValue(3,0),
          ceil: this.getTheFieldMaxValue(3,0),
          step:0.01,
          translate: (Slidervalue3: number, label: any): string => {
                    if(isNaN(+Slidervalue3)){
                      this.value3=0;
                      this.Slidervalue3=0;
                    }  
                    this.value3=this.Slidervalue3;
                    switch (label) {  
                        case label.Low:  
                            return "<b>Min "+this.getTheFieldMinValue(3,0)+" %</b> ₹" + Slidervalue3; 
                        case label.High:  
                            return "<b>Max "+this.getTheFieldMaxValue(3,0)+" %</b> ₹" + Slidervalue3;  
                        default:  
                        return Slidervalue3+" %";  
                    }  
          }  
          
        };
    }else if(this.category=="2"){
      this.options3 = {
        floor: this.getTheFieldMinValue(3,1),
        ceil: this.getTheFieldMaxValue(3,1),
        step:0.01,
        translate: (Slidervalue3: number, label: any): string => {  
          if(isNaN(+Slidervalue3)){
            this.value3=0;
            this.Slidervalue3=0;
          }  
          this.value3=this.Slidervalue3;
                  switch (label) {  
                      case label.Low:  
                          return "<b>Min "+this.getTheFieldMinValue(3,1)+" %</b> ₹" + Slidervalue3; 
                      case label.High:  
                          return "<b>Max "+this.getTheFieldMaxValue(3,1)+" %</b> ₹" + Slidervalue3;  
                      default:  
                      return  Slidervalue3+" %";  
                  }  
        }  
        
      };
    }else if(this.category=="3"){
      this.options3 = {
        floor: this.getTheFieldMinValue(3,2),
        ceil: this.getTheFieldMaxValue(3,2),
        step:0.01,
        translate: (Slidervalue3: number, label: any): string => {  
          if(isNaN(+Slidervalue3)){
            this.value3=0;
            this.Slidervalue3=0;
          }  
          this.value3=this.Slidervalue3;
                  switch (label) {  
                      case label.Low:  
                          return "<b>Min "+this.getTheFieldMinValue(3,2)+" %</b> ₹" + Slidervalue3; 
                      case label.High:  
                          return "<b>Max "+this.getTheFieldMaxValue(3,2)+" %</b> ₹" + Slidervalue3;  
                      default:  
                      return  Slidervalue3+" %";  
                  }  
        }  
        
      };
    }
  }

  getTheFieldMinValue(type:number,index:number){
    let returnValue=0
    if(type==1){
      returnValue=this.LoanAmountArray[index].min;
    }else if(type==2){
      returnValue=this.yearsArray[index].min;
    }else if(type==3){
      returnValue=this.InterestRateArray[index].min;
    }
    return returnValue;
  }
  getTheFieldMaxValue(type:number,index:number){
    let returnValue=0
    if(type==1){
      returnValue=this.LoanAmountArray[index].max;
    }else if(type==2){
      returnValue=this.yearsArray[index].max;
    }else if(type==3){
      returnValue=this.InterestRateArray[index].max;
    }
    return returnValue;
  }
  changeCategory(categoryId:string){
    this.category=categoryId;
    this.resetFields();
  }
  resetFields(){
    if(sessionStorage.getItem("loanData")){
      let loanData=JSON.parse(sessionStorage.getItem("loanData")||'{}');
      this.value1=loanData.value1;
      this.Slidervalue1=loanData.value1;
      this.value2=loanData.value2;
      this.value3=loanData.value3;
      this.Slidervalue3=loanData.value3;
      this.category=loanData.category;
      sessionStorage.clear();
    }else{
      if(this.category=='1'){
        this.value1=3000000;
        this.Slidervalue1=3000000;
        this.value2=2;
        this.value3=12;
        this.Slidervalue3=12;
      }else if(this.category=='2'){
        this.value1=8000000;
        this.Slidervalue1=8000000;
        this.value2=20;
        this.value3=12;
        this.Slidervalue3=12;
      }else if(this.category=='3'){
        this.value1=8000000;
        this.Slidervalue1=8000000;
        this.value2=3;
        this.value3=12;
        this.Slidervalue3=12;
      }
    }
    this.getEMICalculation();
    this.getOptionForSilderAmount();
    this.getOptionForSilderyears();
    this.getOptionForSilderInterestRate();
  }
  returnvaluewithcomma(value:any){
    let returnValue="0";
    if(!this.validation.isNullEmptyUndefined(value)){
      returnValue=this.validation.amountWithLakhComma(value);
    }
    return returnValue;
  }
  getThePrinciplePercent(){
      return Math.round(((this.EmiResponse?.principleAndAmt-this.EmiResponse?.interestAmt)/this.EmiResponse?.principleAndAmt)*100);
  }
  getTheInterestPercent(){
    return Math.round((this.EmiResponse?.interestAmt/this.EmiResponse?.principleAndAmt)*100);
  }

  applyForLoan(){
    let loanData={"value1":this.value1,"value2":this.value2,"value3":this.value3,"category":this.category};
    localStorage.setItem("loanData",JSON.stringify(loanData));
    this.route.navigate(['apply-for-loan']);
  }

}
