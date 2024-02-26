export default {
  getAll: { method: "get", url: "/item" },

  getVerified: { method: "get", url: "/item/verified" },
  
  getComplete: { method: "get", url: "/item/complete" },

  create: { method: "post", url: "/item" },

  search: { method: "get", url: "/item/stock/search" },

  get: { method: "get", url: "/item/detail/:id" },

  edit: { method: "put", url: "/item/:id" },

  changeStatus: { method: "put", url: "/item/changestatus/:id" },
  verify: { method: "put", url: "/item/verify/:id" },

  delete: { method: "delete", url: "/item/:id" },

  getItemSummaryReport: {
    method: "get",
    url: "/analytics/overall/itemSummaryReport/:id",
  },

  // stock
  getItemOrganizationStockOnHand: {
    method: "get",
    url: "/item/stock/:id",
  },
  getItemStoreStockOnHand: {
    method: "get",
    url: "/item/stock/store/:id",
  },
  searchStocks: { method: "get", url: "/item/stock/search" },
  getStockDetail: { method: "get", url: "/item/stock/detail/:id" },
  editStock: { method: "put", url: "/item/stock/:id" },
}
