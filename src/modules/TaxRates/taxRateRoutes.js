const Taxs = () => import("./components/TaxRates.vue")
const TaxsList = () => import("./components/TaxRatesList.vue")
const routes = [
  {
    path: "",
    name: "Taxs",
    component: Taxs,
    children: [
      {
        path: "",
        name: "TaxsList",
        component: TaxsList,
      },
    ],
  },
]
export default routes.map((route) => ({
  ...route,
  path: "tax-rates/" + route.path,
  meta: { ...route.meta, onlyWhenLoggedOut: false, public: false },
}))
