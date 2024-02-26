const Index = () => import("./components/Index.vue")
const SalesList = () => import("./components/SalesList.vue")
const NewSellForm = () => import("./components/NewSellForm.vue")
const SellDetail = () => import("./components/SellDetail.vue")
import customerRoutes from "../Customers/customerRoutes.js"
import issueRoutes from "../Issues/issueRoutes.js"
const routes = [
  {
    path: "/sell",
    name: "Sales",
    component: Index,
    children: [
      {
        path: "",
        redirect: "/sell/list"
      },
      {
        path: "list",
        name: "SalesList",
        component: SalesList,
      },
      {
        path: "new",
        name: "NewSellForm",
        component: NewSellForm,
      },
      ...customerRoutes,
      ...issueRoutes,
      {
        path: ":id",
        name: "SellDetail",
        component: SellDetail,
      },
    ],
  },
]
export default routes.map((route) => ({
  ...route,
  meta: { ...route.meta, onlyWhenLoggedOut: false, public: false, title: 'Sell' },
}))
