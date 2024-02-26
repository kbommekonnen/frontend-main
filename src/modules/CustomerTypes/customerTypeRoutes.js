const CustomerTypes = () => import("./components/CustomerTypes.vue")
const CustomerTypesList = () => import("./components/CustomerTypesList.vue")
const routes = [
  {
    path: "",
    name: "CustomerTypes",
    component: CustomerTypes,
    children: [
      {
        path: "",
        name: "CustomerTypesList",
        component: CustomerTypesList,
      },
    ],
  },
]
export default routes.map((route) => ({
  ...route,
  path: "customer-types/" + route.path,
  meta: { ...route.meta, onlyWhenLoggedOut: false, public: false },
}))
