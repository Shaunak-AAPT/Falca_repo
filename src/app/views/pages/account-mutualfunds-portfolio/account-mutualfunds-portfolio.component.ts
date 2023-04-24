import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { AESCryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
import { environment } from 'src/environments/environment';
import { ApexAnnotations, ApexAxisChartSeries, ApexDataLabels, ApexGrid, ApexTitleSubtitle, ApexXAxis, ApexYAxis, ChartComponent } from "ng-apexcharts";
import { ApexNonAxisChartSeries, ApexPlotOptions, ApexChart, ApexFill, ApexStroke, ApexLegend } from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-account-mutualfunds-portfolio',
  templateUrl: './account-mutualfunds-portfolio.component.html',
  styleUrls: ['./account-mutualfunds-portfolio.component.css']
})
export class AccountMutualfundsPortfolioComponent implements OnInit {

  Token: any;
  WealthShareUrl = environment.WealthShareUrl;
  SummaryDetails: any;
  PendingOrder: any;
  MyHoldings: any;
  EquityExposureType: string = "Sector";
  EquitySectorExposure: any;
  EquitySecuirtyExposure: any;
  DebtExposureType: string = "Sector";
  DebtSectorExposure: any;
  DebtSecuirtyExposure: any;
  EquitySector: any = [];
  EquitySecuirty: any = [];
  DebtRating: any = [];
  DebtSecuirty: any = [];
  EquitySectorPageIndex: number = 1;
  EquitySecuirtyPageIndex: number = 1;
  DebtRatingPageIndex: number = 1;
  DebtSecuirtyPageIndex: number = 1;
  PendingOrderPageIndex: number = 1;
  MyHoldingsPageIndex: number = 1;


  chartOptions1: ChartOptions = {
    series: [],
    chart: {
      height: 200,
      type: "donut",
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      pie: {
        startAngle: 0,
        expandOnClick: true,

        offsetX: 0,
        offsetY: 0,
        customScale: 1,
        dataLabels: {
          offset: 200,
          minAngleToShowLabel: 0,
        },
        donut: {
          size: '80%',
          background: '#fff',

          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '22px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              color: undefined,
              offsetY: -0,
              formatter: function (val) {
                return val;
              }
            },
            value: {
              show: true,
              fontSize: '24px',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 800,
              color: "#000",
              offsetY: 15,
              formatter: function (val) {
                return val;
              }
            },
            total: {
              show: true,
              showAlways: true,
              label: 'Customer Durables',
              fontSize: '12px',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 400,
              color: '#b4b4b4',
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a: any, b: any) => {
                  return a + b;
                }, 0);
              }
            }
          }
        },

      }
    },
    legend: {
      show: false
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#ABE5A1"],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: "round"
    },
    labels: []

  };

  chartOptions2: ChartOptions = {
    series: [],
    chart: {
      height: 200,
      type: "donut",
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      pie: {
        startAngle: 0,
        expandOnClick: true,

        offsetX: 0,
        offsetY: 0,
        customScale: 1,
        dataLabels: {
          offset: 200,
          minAngleToShowLabel: 0,
        },
        donut: {
          size: '80%',
          background: '#fff',

          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '22px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              color: undefined,
              offsetY: -0,
              formatter: function (val) {
                return val;
              }
            },
            value: {
              show: true,
              fontSize: '24px',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 800,
              color: "#000",
              offsetY: 15,
              formatter: function (val) {
                return val;
              }
            },
            total: {
              show: true,
              showAlways: true,
              label: 'Customer Durables',
              fontSize: '12px',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 400,
              color: '#b4b4b4',
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a: any, b: any) => {
                  return a + b;
                }, 0);
              }
            }
          }
        },

      }
    },
    legend: {
      show: false
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#ABE5A1"],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: "round"
    },
    labels: []

  };

  chartOptions3: ChartOptions = {
    series: [],
    chart: {
      height: 200,
      type: "donut",
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      pie: {
        startAngle: 0,
        expandOnClick: true,

        offsetX: 0,
        offsetY: 0,
        customScale: 1,
        dataLabels: {
          offset: 200,
          minAngleToShowLabel: 0,
        },
        donut: {
          size: '80%',
          background: '#fff',

          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '22px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              color: undefined,
              offsetY: -0,
              formatter: function (val) {
                return val;
              }
            },
            value: {
              show: true,
              fontSize: '24px',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 800,
              color: "#000",
              offsetY: 15,
              formatter: function (val) {
                return val;
              }
            },
            total: {
              show: true,
              showAlways: true,
              label: 'Customer Durables',
              fontSize: '12px',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 400,
              color: '#b4b4b4',
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a: any, b: any) => {
                  return a + b;
                }, 0);
              }
            }
          }
        },

      }
    },
    legend: {
      show: false
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#ABE5A1"],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: "round"
    },
    labels: []

  };

  chartOptions4: ChartOptions = {
    series: [],
    chart: {
      height: 200,
      type: "donut",
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      pie: {
        startAngle: 0,
        expandOnClick: true,

        offsetX: 0,
        offsetY: 0,
        customScale: 1,
        dataLabels: {
          offset: 200,
          minAngleToShowLabel: 0,
        },
        donut: {
          size: '80%',
          background: '#fff',

          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '22px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              color: undefined,
              offsetY: -0,
              formatter: function (val) {
                return val;
              }
            },
            value: {
              show: true,
              fontSize: '24px',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 800,
              color: "#000",
              offsetY: 15,
              formatter: function (val) {
                return val;
              }
            },
            total: {
              show: true,
              showAlways: true,
              label: 'Customer Durables',
              fontSize: '12px',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 400,
              color: '#b4b4b4',
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a: any, b: any) => {
                  return a + b;
                }, 0);
              }
            }
          }
        },

      }
    },
    legend: {
      show: false
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#ABE5A1"],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: "round"
    },
    labels: []

  };

  constructor(public validation: ValidateService, private api: ApiService, private route: Router, private crypto: AESCryptoService) { }

  ngOnInit(): void {
    this.GetSummaryDetails();
    this.GetMyHoldings();
    this.GetPendingOrders();
    this.GetEquitySectorExposure();
    this.GetEquitySecuirtyExposure();
    this.GetDebtSectorExposure();
    this.GetDebtSecuirtyExposure();
  }

  GetSummaryDetails() {
    this.api.get("wealthfy/client-summary", true).subscribe(response => {
      // console.log('wealthfy/client-summary', response)
      if (response.response.n == 1) {
        this.SummaryDetails = response.data;
      }
    })
  }

  GetMyHoldings() {
    this.api.get("switchRedeemFunds/myholdings", true).subscribe(response => {
      console.log('switchRedeemFunds/myholdings', response)
      if (response.response.n == 1) {
        this.MyHoldings = response.data;
        console.log('MyHoldings', this.MyHoldings)
      }
    })
  }

  GetPendingOrders() {
    var postData = new FormData();
    postData.append("limit", '20');
    postData.append("offset", '0');
    this.api.post('wealthfy/pending-transaction', postData, true).subscribe(response => {      
      console.log('wealthfy/pending-transaction', response)
      if (response.response.n == 1) {
        this.PendingOrder = response.data;
      }
    })
  }

  GoToFund(list: any, ViewFund: any) {
    debugger
    ViewFund = Number(ViewFund);
    this.Token = localStorage.getItem("CustToken");
    this.WealthShareUrl = this.WealthShareUrl.replace("{FID}", encodeURIComponent(list.instrumentId));
    this.WealthShareUrl = this.WealthShareUrl.replace("{TOKEN}", encodeURIComponent(this.Token));
    // if (ViewFund == '1') {
    this.WealthShareUrl = this.WealthShareUrl.replace("{VIEWFUND}", ViewFund);
    // }
    // console.log('WealthShareUrl', this.WealthShareUrl)
    window.location.href = this.WealthShareUrl;
  }

  GetEquitySectorExposure() {
    this.api.get('wealthfy/equaity-sector-exposure', true).subscribe(response => {
      if (response.response.n == 1) {
        this.EquitySectorExposure = response.data;
        this.GetChartOfEquitySector();
      }
    })
  }

  GetChartOfEquitySector() {
    this.chartOptions1.series = [];
    this.chartOptions1.labels = [];
    this.EquitySector = [];
    for (var i = 0; i < this.EquitySectorExposure.length; i++) {
      this.chartOptions1.series.push(this.EquitySectorExposure[i].weight);
      this.chartOptions1.labels.push(this.EquitySectorExposure[i].sectorName);
      let data = {
        name: this.EquitySectorExposure[i].sectorName,
        weight: this.EquitySectorExposure[i].weight,
      }
      this.EquitySector.push(data)
    }
  }

  GetEquitySecuirtyExposure() {
    this.api.get('wealthfy/equaity-security-exposure', true).subscribe(response => {
      if (response.response.n == 1) {
        this.EquitySecuirtyExposure = response.data;
        this.GetChartOfEquitySecuirty();
      }
    })
  }

  GetChartOfEquitySecuirty() {
    this.chartOptions2.series = [];
    this.chartOptions2.labels = [];
    this.EquitySecuirty = [];
    for (var i = 0; i < this.EquitySecuirtyExposure.length; i++) {
      this.chartOptions2.series.push(this.EquitySecuirtyExposure[i].weight);
      this.chartOptions2.labels.push(this.EquitySecuirtyExposure[i].securityName);
      let data = {
        name: this.EquitySecuirtyExposure[i].securityName,
        weight: this.EquitySecuirtyExposure[i].weight,
      }
      this.EquitySecuirty.push(data)
    }
  }

  GetDebtSectorExposure() {
    this.api.get('wealthfy/debt-sector-exposure', true).subscribe(response => {
      if (response.response.n == 1) {
        this.DebtSectorExposure = response.data;
        this.GetChartOfDebtSector();
      }
    })
  }

  GetChartOfDebtSector() {
    this.chartOptions3.series = [];
    this.chartOptions3.labels = [];
    this.DebtRating = [];
    for (var i = 0; i < this.DebtSectorExposure.length; i++) {
      this.chartOptions3.series.push(this.DebtSectorExposure[i].weight);
      this.chartOptions3.labels.push(this.DebtSectorExposure[i].rating);
      let data = {
        name: this.DebtSectorExposure[i].rating,
        weight: this.DebtSectorExposure[i].weight,
      }
      this.DebtRating.push(data)
    }
  }

  GetDebtSecuirtyExposure() {
    this.api.get('wealthfy/debt-security-exposure', true).subscribe(response => {
      if (response.response.n == 1) {
        this.DebtSecuirtyExposure = response.data;
        this.GetChartOfDebtSecuirty();
      }
    })
  }

  GetChartOfDebtSecuirty() {
    this.chartOptions4.series = [];
    this.chartOptions4.labels = [];
    this.DebtSecuirty = [];
    for (var i = 0; i < this.DebtSecuirtyExposure.length; i++) {
      this.chartOptions4.series.push(this.DebtSecuirtyExposure[i].weight);
      this.chartOptions4.labels.push(this.DebtSecuirtyExposure[i].securityName);
      let data = {
        name: this.DebtSecuirtyExposure[i].securityName,
        weight: this.DebtSecuirtyExposure[i].weight,
      }
      this.DebtSecuirty.push(data)
    }
  }




}
