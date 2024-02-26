const Composites = () => import("./components/CompositeItems.vue")
const CompositesList = () => import("./components/CompositeItemsList.vue")
const NewCompositeForm = () => import("./components/NewCompositeItemForm.vue")
const CompositeDetailOverview = () => import("./components/CompositeItemDetailOverview.vue")
const CompositeDetail = () => import("./components/CompositeItemDetail.vue")

// composite detail components
const CompositePurchases = () => import("../Purchases/components/ItemPurchasesList.vue")
const CompositeSales = () => import("../Sales/components/ItemSalesList.vue")
const CompositeTransfers = () => import("../Transfers/components/ItemTransfersList.vue")
const routes = [
  {
    path: "",
    name: "Composites",
    component: Composites,
    children: [
      {
        path: "",
        name: "CompositesList",
        component: CompositesList,
      },
      {
        path: "add-new",
        name: "AddNewComposite",
        component: NewCompositeForm,
      },
      {
        path: ":id",
        name: "CompositeDetail",
        component: CompositeDetail,
        children: [
          {
            path: "",
            name: "CompositeDetailOverview",
            component: CompositeDetailOverview,
          },
          {
            path: "purchase",
            name: "CompositePurchases",
            component: CompositePurchases,
          },
          {
            path: "sell",
            name: "CompositeSales",
            component: CompositeSales,
          },
          {
            path: "transfer",
            name: "CompositeTransfers",
            component: CompositeTransfers,
          },
        ],
      },
    ],
  },
]
export default routes.map((route) => ({
  ...route,
  path: "composites/" + route.path,
  meta: { ...route.meta, onlyWhenLoggedOut: false, public: false },
}))
