const VehicleTypes = () => import("./components/VehicleTypes.vue")
const VehicleTypesList = () => import("./components/VehicleTypesList.vue")
const routes = [
  {
    path: "vehicle-types",
    name: "VehicleTypes",
    component: VehicleTypes,
    children: [
      {
        path: "",
        name: "VehicleTypesList",
        component: VehicleTypesList,
      },
    ],
  },
]
export default routes.map((route) => ({
  ...route,
  // path: "/vehicle-types/" + route.path,
  meta: { ...route.meta, onlyWhenLoggedOut: false, public: false },
}))
  