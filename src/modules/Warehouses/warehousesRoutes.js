const Warehouses = () => import("./components/Warehouses.vue")
const WarehousesList = () => import("./components/WarehousesList.vue")
const routes = [
  {
    path: "",
    name: "Warehouses",
    component: Warehouses,
    children: [
      {
        path: "",
        name: "WarehousesList",
        component: WarehousesList,
      },
    ],
  },
]
export default routes.map((route) => ({
  ...route,
  path: "warehouses/" + route.path,
  meta: { ...route.meta, onlyWhenLoggedOut: false, public: false },
}))
