export default {
  getAll: { method: "get", url: "/transaction/issue" },

  getVerified: { method: "get", url: "/transaction/issue/verified" },

  create: { method: "post", url: "/transaction/issue" },

  get: { method: "get", url: "/transaction/issue/detail/:id" },

  getItemSales: { method: "get", url: "/transaction/issue/item/:id" },
  getEmptyItemsIssue: {method: "get", url: "/transaction/issue/items"},
  getItemSalesSummaryReport: {
    method: "get",
    url: "/transaction/issue/item-summary-report/:id",
  },

  edit: { method: "put", url: "/transaction/issue/:id" },

  changeStatus: {
    method: "put",
    url: "/transaction/issue/changestatus/:id",
  },
  verify: { method: "put", url: "/transaction/issue/verify/:id" },

  delete: { method: "delete", url: "/transaction/issue/:id" },
}
