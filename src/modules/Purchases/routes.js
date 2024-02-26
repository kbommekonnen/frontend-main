const Purchases = () => import("./components/Purchases.vue")
const PurchasesList = () => import("./components/PurchasesList.vue")
const NewPurchaseForm = () => import("./components/NewPurchaseForm.vue")
const PurchaseDetail = () => import("./components/PurchaseDetail.vue")
const Overview = () => import("./components/Overview.vue")
import purchaseOrderRoutes from "../PurchaseOrders/purchaseOrderRoutes.js"
import supplierRoutes from "../Suppliers//supplierRoutes.js"
const routes = [
  {
    path: "/purchase",
    name: "Purchases",
    component: Purchases,
    children: [
      {
        path: "",
        name: "PurchaseOverview",
        component: Overview,
      },
      {
        path: "list",
        name: "PurchasesList",
        component: PurchasesList,
      },
      {
        path: "new",
        name: "NewPurchaseForm",
        component: NewPurchaseForm,
      },
      ...supplierRoutes,
      ...purchaseOrderRoutes,
      {
        path: "detail/:id",
        name: "PurchaseDetail",
        component: PurchaseDetail,
      },
    ],
  },
]
export default routes.map((route) => ({
  ...route,
  meta: { ...route.meta, onlyWhenLoggedOut: false, public: false, title: 'Purchase' },
}))
