const Items = () => import("./components/Items.vue")
const ItemsList = () => import("./components/ItemsList.vue")
const NewItemForm = () => import("./components/NewItemForm.vue")
const EditItemForm = () => import("./components/EditItemForm.vue")
const ItemDetailOverview = () => import("./components/ItemDetailOverview.vue")
const ItemDetail = () => import("./components/ItemDetail.vue")
const ImportItems = () => import("./components/ImportItems.vue")

// item detail components
const ItemPurchases = () =>
  import("../Purchases/components/ItemPurchasesList.vue")
const ItemSales = () => import("../Sales/components/ItemSalesList.vue")
const ItemTransfers = () =>
  import("../Transfers/components/ItemTransfersList.vue")
const routes = [
  {
    path: "",
    name: "Items",
    component: Items,
    children: [
      {
        path: "",
        name: "ItemsList",
        component: ItemsList,
      },
      {
        path: "add-new",
        name: "AddNewItem",
        component: NewItemForm,
      },
      {
        path: "bulk-import",
        name: "ImportItems",
        component: ImportItems,
      },
      {
        path: "edit-new/:id",
        name: "EditNewItem",
        component: EditItemForm,
      },
      {
        path: ":id",
        name: "ItemDetail",
        component: ItemDetail,
        children: [
          {
            path: "",
            name: "ItemDetailOverview",
            component: ItemDetailOverview,
          },
          {
            path: "purchase",
            name: "ItemPurchases",
            component: ItemPurchases,
          },
          {
            path: "sell",
            name: "ItemSales",
            component: ItemSales,
          },
          {
            path: "transfer",
            name: "ItemTransfers",
            component: ItemTransfers,
          },
        ],
      },
    ],
  },
]
export default routes.map((route) => ({
  ...route,
  path: "items/" + route.path,
  meta: { ...route.meta, onlyWhenLoggedOut: false, public: false },
}))
