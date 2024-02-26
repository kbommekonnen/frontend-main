export default {
  getAll: { method: "get", url: "/account" },
  
  getVerified: { method: "get", url: "/account/verified" },
  
  create: { method: "post", url: "/account" },
  
  search: { method: "get", url: "/account/stock/search" },
  
  get: { method: "get", url: "/account/detail/:id" },
  
  edit: { method: "put", url: "/account/:id" },
  changeStatus: { method: "put", url: "/account/changestatus/:id" },
  
  verify: { method: "put", url: "/account/verify/:id" },
  
  deleteApi: { method: "delete", url: "/account/:id" },
  
  
  
  // accounts
  changeCashOnHandAccount: {method: "put", url: "/config/preference/changeCashOnHandAccount"},
  changeDefaultSellAccount: {method: "put", url: "/config/preference/changeDefaultSellAccount"},
  changeDefaultPurchaseAccount: {method: "put", url: "/config/preference/changeDefaultPurchaseAccount"},
  
  // transactions
  deposite: { method: "post", url: "/accountTransaction/deposite" },
  updateDeposite: { method: "put", url: "/accountTransaction/deposite/:id" },
  withdrow: { method: "post", url: "/accountTransaction/withdrow" },
  updateWithdrow: { method: "put", url: "/accountTransaction/withdrow/:id" },

  // transactions
  getDeposites: { method: "get", url: "/accountTransaction/deposites" },
  getWithdrows: { method: "get", url: "/accountTransaction/withdrows" },
  getAccountTransactions: { method: "get", url: "/accountTransaction/:id" },
  getAllTransactions: { method: "get", url: "/accountTransaction" },
  
  // report
  
  getTotalDebitsAndCredits: {method: "get", url: "/account/report/total-debits-and-credits/:store"},
  getTrialBalance: {method: "get", url: "/account/report/trial-balance/:store"},
  getAccountTodayDebitAndCreditReport: {method: "get", url: "/account/report/today-debit-and-credit/:id"},
  getAccountThisWeekDebitAndCreditReport: {method: "get", url: "/account/report/thisweek-debit-and-credit/:id"},
  getAccountThisMonthDebitAndCreditReport: {method: "get", url: "/account/report/thismonth-debit-and-credit/:id"},
  getAccountThisYearDebitAndCreditReport: {method: "get", url: "/account/report/thisyear-debit-and-credit/:id"},

}
