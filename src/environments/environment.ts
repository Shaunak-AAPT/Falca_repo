// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // ServerUrl: "https://findev.aaptfin.com/api/",


  // duplicate/local version by shaunak
  // ServerUrl: "http://127.0.0.1:8000/api/",

  // dev url
  ServerUrl: "http://65.1.237.83/api/",
  // ServerUrl: "http://13.127.4.232/api/",
  // ServerUrl: "https://dev.finizon.com/api/",
    // ServerUrl: "https://uatnw.finizon.com/api/",

  DGLoginEmail: "finizonuser@finizon.com",
  DGLoginPassword: "test2$",


  // uat url 
    // ServerUrl: "https://uatnw.finizon.com/api/",

  // ServerUrl: "https://dev.finizon.com/api/",
  // ServerUrl: "http://15.206.79.170:8080/api/",


  // prod url 
  // ServerUrl: "https://finizon.com/api/",




  // apiUrl: 'https://cctoolapi-dev.aaptfin.com',

  // --LOCAL--

  // ng serve --port 4200
  CommonUrl: "http://localhost:4200?TOKEN={TOKEN}&PATH={PATH}&TXN={TXN}&FROM={FROM}&LOGOUT={LOGOUT}",

  // ng serve --port 54775
  CreditUrl: "http://localhost:54775?TOKEN={TOKEN}&PATH={PATH}",

  // ng serve --port 50196
  // InsuranceUrl: "http://localhost:50196?TOKEN={TOKEN}&PATH={PATH}",


  // added by sw
  // InsuranceUrl: "https://ins.finizoninsurance.com/user/home",
  InsuranceUrl: "http://localhost:50196?PATH={PATH}",



  // taken from environment.prod.ts by sw
  // InsuranceUrl: "http://uat.finizoninsurance.com/?TOKEN={TOKEN}&PATH={PATH}",


  // ng serve --port 57617
  WealthUrl: "http://localhost:57617?TOKEN={TOKEN}&PATH={PATH}&DG={DG}",

  // // taken from environment.prod.ts by sw
  // WealthUrl: "https://uat.finizon.com/wealth/?TOKEN={TOKEN}&PATH={PATH}",



  WealthShareUrl: "http://localhost:57617/assisted-share-wealth?FID={FID}&TOKEN={TOKEN}&VIEWFUND={VIEWFUND}",

  // ng serve --port 50533
  AgentUrl: "http://localhost:50533?ATOKEN={ATOKEN}&PATH={PATH}",

  // ng serve --port 64833
  AgentCommonUrl: "http://localhost:64833?ATOKEN={ATOKEN}&PATH={PATH}",

  // ng serve --port 65099
  AgentInsuranceUrl: "http://localhost:65099?ATOKEN={ATOKEN}&PATH={PATH}",

  // AgentUrl: "http://localhost:50533?ATOKEN={ATOKEN}&PATH={PATH}",  
  // --LOCAL--
  InsuranceShare:'"http://agentinsurance.onerooftechnologies.com/pending-products?TOKEN={TOKEN}&PATH={PATH}&QUOTEID={QUOTEID}&PLANID={PLANID}',


  
  // --old UAT FINIZON--

  //CommonUrl:"https://uat.finizon.com?TOKEN={TOKEN}&PATH={PATH}",
  //CreditUrl:"https://uat.finizon.com/credit?TOKEN={TOKEN}&PATH={PATH}",  
  //InsuranceUrl:"http://uat.finizoninsurance.com?TOKEN={TOKEN}&PATH={PATH}",
  //WealthUrl:"https://uat.finizon.com/wealth?TOKEN={TOKEN}&PATH={PATH}",

  // --old UAT FINIZON--

  // --old UAT ONEROOFTECH--

  // CommonUrl:"http://finizon.onerooftechnologies.com?TOKEN={TOKEN}&PATH={PATH}",
  // CreditUrl:"http://finizon-credit.onerooftechnologies.com?TOKEN={TOKEN}&PATH={PATH}",
  // InsuranceUrl:"http://finizon-insurance.onerooftechnologies.com?TOKEN={TOKEN}&PATH={PATH}",
  // WealthUrl:"http://finizon-wealth.onerooftechnologies.com?TOKEN={TOKEN}&PATH={PATH}",

  // --old UAT ONEROOFTECH--
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
