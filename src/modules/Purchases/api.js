export default {
  getAll: { method: "get", url: "/transaction/purchase" },

  getVerified: { method: "get", url: "/transaction/purchase/verified" },

  purchaseItems: { method: "get", url: "/transaction/purchase/items" },

  create: { method: "post", url: "/transaction/purchase" },

  get: { method: "get", url: "/transaction/purchase/detail/:id" },

  getItemPurchases: { method: "get", url: "/transaction/purchase-item/:id" },
  getPurchaseItems: {
    method: "get",
    url: "/transaction/purchase-item/purchase/:id",
  },
  orderedItemsSummaryReport: {
    method: "get",
    url: "/analytics/overall/ordered-summary",
  },

  getItemPurchaseSummaryReport: {
    method: "get",
    url: "/transaction/purchase-item/summary-report/:id",
  },

  edit: { method: "put", url: "/transaction/purchase/:id" },

  changeStatus: {
    method: "put",
    url: "/transaction/purchase/changestatus/:id",
  },
  verify: { method: "put", url: "/transaction/purchase/verify/:id" },

  delete: { method: "delete", url: "/transaction/purchase/:id" },
}
