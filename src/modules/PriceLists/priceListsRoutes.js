const PriceLists = () => import("./components/PriceLists.vue")
const PriceListsList = () => import("./components/PriceListsList.vue")
const routes = [
  {
    path: "",
    name: "PriceLists",
    component: PriceLists,
    children: [
      {
        path: "",
        name: "PriceListsList",
        component: PriceListsList,
      },
    ],
  },
]
export default routes.map((route) => ({
  ...route,
  path: "price-lists/" + route.path,
  meta: { ...route.meta, onlyWhenLoggedOut: false, public: false },
}))
