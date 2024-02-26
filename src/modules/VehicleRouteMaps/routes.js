const VehicleRouteMaps = () => import("./components/VehicleRouteMaps.vue")
const VehicleRouteMapsList = () => import("./components/VehicleRouteMapsList.vue")
const routes = [
  {
    path: "",
    name: "VehicleRouteMaps",
    component: VehicleRouteMaps,
    children: [
      {
        path: "",
        name: "VehicleRouteMapsList",
        component: VehicleRouteMapsList,
      },
    ],
  },
]
export default routes.map((route) => ({
  ...route,
  path: "/vehicleroutemap/" + route.path,
  meta: { ...route.meta, onlyWhenLoggedOut: false, public: false },
}))
  