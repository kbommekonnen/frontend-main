const Reports = () => import("./components/Reports.vue")
const InventoryReports = () =>
  import("./components/Inventory/InventoryReports.vue")

const InventorySummaryReport = () =>
  import("./components/Inventory/InventorySummaryReport.vue")

const InventoryValuationSummaryReport = () =>
  import("./components/Inventory/InventoryValuationSummaryReport.vue")
const InventoryAgingSummaryReport = () =>
  import("./components/Inventory/InventoryAgingSummaryReport.vue")
const InventorySalesReport = () =>
  import("./components/Inventory/InventorySalesReport.vue")
const InventoryWarehouseReport = () =>
  import("./components/Inventory/InventoryWarehouseReport.vue")
const InventoryStockSummaryReport = () =>
  import("./components/Inventory/InventoryStockSummaryReport.vue")
const InventoryAbcClassificationReport = () =>
  import("./components/Inventory/InventoryAbcClassificationReport.vue")

const SummaryReports = () => import("./components/SummaryReports.vue")
const routes = [
  {
    path: "/reports",
    name: "Reports",
    component: Reports,
    children: [
      {
        path: "",
        redirect: "/reports/inventory",
        name: "SummaryReports",
        component: SummaryReports,
      },
      {
        path: "inventory",
        name: "InventoryReports",
        component: InventoryReports,
      },
      {
        path: "inventory/inventory-summary",
        name: "InventorySummaryReport",
        component: InventorySummaryReport,
      },
      {
        path: "inventory/inventory-valuation-summary",
        name: "InventoryValuationSummaryReport",
        component: InventoryValuationSummaryReport,
      },
      {
        path: "inventory/inventory-aging-summary",
        name: "InventoryAgingSummaryReport",
        component: InventoryAgingSummaryReport,
      },
      {
        path: "inventory/inventory-sales-report",
        name: "InventorySalesReport",
        component: InventorySalesReport,
      },
      {
        path: "inventory/inventory-warehouse-report",
        name: "InventoryWarehouseReport",
        component: InventoryWarehouseReport,
      },
      {
        path: "inventory/inventory-stock-summary-report",
        name: "InventoryStockSummaryReport",
        component: InventoryStockSummaryReport,
      },
      {
        path: "inventory/inventory-abc-classication-report",
        name: "InventoryAbcClassificationReport",
        component: InventoryAbcClassificationReport,
      },
    ],
  },
]
export default routes.map((route) => ({
  ...route,
  meta: { ...route.meta, onlyWhenLoggedOut: false, public: false, title: 'Report' },
}))
