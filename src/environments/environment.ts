export const environment = {
  production: false,
  // ServerUrl: "https://findev.aaptfin.com/api/",

  ServerUrl: "http://65.1.237.83/api/",

  FalcaServerUrl: "http://65.1.237.83:5800/api/",


  // ServerUrl: "https://uatnw.finizon.com/api/",


  // ServerUrl: "https://finizon.com/api/",

  DGLoginEmail: "finizonuser@finizon.com",
  DGLoginPassword: "test2$",


  // ServerUrl: "https://dev.finizon.com/api/",

  // prod url 
  // ServerUrl: "https://finizon.com/api/",

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


  // ng serve --port 57617
  WealthUrl: "http://localhost:57617?TOKEN={TOKEN}&PATH={PATH}&DG={DG}",

  WealthShareUrl: "http://localhost:57617/assisted-share-wealth?FID={FID}&TOKEN={TOKEN}&VIEWFUND={VIEWFUND}",

  // ng serve --port 50533
  AgentUrl: "http://localhost:50533?ATOKEN={ATOKEN}&PATH={PATH}",

  // ng serve --port 64833
  AgentCommonUrl: "http://localhost:64833?ATOKEN={ATOKEN}&PATH={PATH}",

  // ng serve --port 65099
  AgentInsuranceUrl: "http://localhost:65099?ATOKEN={ATOKEN}&PATH={PATH}",

  // AgentUrl: "http://localhost:50533?ATOKEN={ATOKEN}&PATH={PATH}",  
  // --LOCAL--
  InsuranceShare:'"https://agentinsurance.onerooftechnologies.com/pending-products?TOKEN={TOKEN}&PATH={PATH}&QUOTEID={QUOTEID}&PLANID={PLANID}',

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
