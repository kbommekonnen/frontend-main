export default {
  getAll: { method: "get", url: "/transaction/purchase-order" },

  getVerified: { method: "get", url: "/transaction/purchase-order/verified" },

  purchaseItems: { method: "get", url: "/transaction/purchase-order/items" },

  create: { method: "post", url: "/transaction/purchase-order" },
  addPurchaseOrderItem: {
    method: "post",
    url: "/transaction/purchase-order-item",
  },

  get: { method: "get", url: "/transaction/purchase-order/detail/:id" },

  getItemPurchases: {
    method: "get",
    url: "/transaction/purchase-order-item/:id",
  },
  getPurchaseItems: {
    method: "get",
    url: "/transaction/purchase-order-item/purchase-order/:id",
  },
  orderedItemsSummaryReport: {
    method: "get",
    url: "/analytics/overall/ordered-summary",
  },

  getItemPurchaseSummaryReport: {
    method: "get",
    url: "/transaction/purchase-order-item/summary-report/:id",
  },

  edit: { method: "put", url: "/transaction/purchase-order/:id" },
  editPurchaseOrderItem: {
    method: "put",
    url: "/transaction/purchase-order-item/:id",
  },

  changeStatus: {
    method: "put",
    url: "/transaction/purchase-order/changestatus/:id",
  },
  changeToPurchase: {
    method: "put",
    url: "/transaction/purchase-order/completed/:id",
  },
  changeConfirmed: {
    method: "put",
    url: "/transaction/purchase-order/confirmed/:id",
  },
  changeIntransit: {
    method: "put",
    url: "/transaction/purchase-order/intransit/:id",
  },
  verify: { method: "put", url: "/transaction/purchase-order/verify/:id" },

  delete: { method: "delete", url: "/transaction/purchase-order/:id" },
  deletePurchaseOrderItem: {
    method: "delete",
    url: "/transaction/purchase-order-item/:id",
  },
}
