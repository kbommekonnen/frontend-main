const Vehicles = () => import("./components/Vehicles.vue")
const VehiclesList = () => import("./components/VehiclesList.vue")
const routes = [
  {
    path: "vehicles",
    name: "Vehicles",
    component: Vehicles,
    children: [
      {
        path: "",
        name: "VehiclesList",
        component: VehiclesList,
      },
    ],
  },
]
export default routes.map((route) => ({
  ...route,
  meta: { ...route.meta, onlyWhenLoggedOut: false, public: false },
}))
  