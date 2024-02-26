export default {
  getItemCounts: { method: "get", url: "/analytics/overall" },

  getSell: { method: "get", url: "/analytics/sell" },

  getTopSellingItems: {
    method: "get",
    url: "/analytics/sell/top-selling-items",
  },

  getPurchase: { method: "get", url: "/analytics/purchase" },
  getPurchaseSummaryReport: {
    method: "get",
    url: "/analytics/purchase/summary-report",
  },
  getSellSummaryReport: {
    method: "get",
    url: "/analytics/sell/summary-report",
  },
  getOrganizationStockOnHand: {
    method: "get",
    url: "/item/stock",
  },
  getStoreStockOnHand: {
    method: "get",
    url: "/item/stock/store",
  },
}
