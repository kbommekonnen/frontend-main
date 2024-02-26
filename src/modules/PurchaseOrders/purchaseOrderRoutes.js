const PurchaseOrders = () => import("./components/PurchaseOrders.vue")
const PurchaseOrdersList = () => import("./components/PurchaseOrdersList.vue")
const NewPurchaseOrderForm = () => import("./components/NewPurchaseOrderForm.vue")
const PurchaseOrderDetail = () => import("./components/PurchaseOrderDetail.vue")
const routes = [
  {
    path: "orders",
    name: "PurchaseOrders",
    component: PurchaseOrders,
    children: [
      {
        path: "",
        name: "PurchaseOrdersList",
        component: PurchaseOrdersList,
      },
      {
        path: "new",
        name: "NewPurchaseOrderForm",
        component: NewPurchaseOrderForm,
      },
      {
        path: ":id",
        name: "PurchaseOrderDetail",
        component: PurchaseOrderDetail,
      },
    ],
  },
]
export default routes.map((route) => ({
  ...route,
  meta: { ...route.meta, onlyWhenLoggedOut: false, public: false, title: 'PurchaseOrder' },
}))
