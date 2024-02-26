export default {
  getAll: { method: "get", url: "/transaction/sell" },

  getVerified: { method: "get", url: "/transaction/sell/verified" },

  create: { method: "post", url: "/transaction/sell" },

  get: { method: "get", url: "/transaction/sell/detail/:id" },

  getItemSales: { method: "get", url: "/transaction/sell/item/:id" },
  
  getItemSalesSummaryReport: { method: "get", url: "/transaction/sell/item-summary-report/:id" },

  edit: { method: "put", url: "/transaction/sell/:id" },

  changeStatus: {
    method: "put",
    url: "/transaction/sell/changestatus/:id",
  },
  verify: { method: "put", url: "/transaction/sell/verify/:id" },

  delete: { method: "delete", url: "/transaction/sell/:id" },
}
