export default {
  // inventory
  getInventorySummaryReport: {
    method: "get",
    url: "/analytics/overall/summaryreport",
  },
  getInventoryValuationSummaryReport: {
    method: "get",
    url: "/analytics/overall/valuationsummary",
  },
  getInventoryAgingSummaryReport: {
    method: "get",
    url: "/analytics/overall/agingsummary",
  },
  getInventorySalesReport: {
    method: "get",
    url: "/analytics/overall/sales",
  },
  getInventoryWarehouseReport: {
    method: "get",
    url: "/analytics/overall/warehouseinventory",
  },
  getInventoryStockSummaryReport: {
    method: "get",
    url: "/analytics/overall/inventorystocksummary",
  },
  getInventoryAbcClassificationReport: {
    method: "get",
    url: "/analytics/overall/classification",
  },
}
