const UserVehicleMaps = () => import("./components/UserVehicleMaps.vue")
const UserVehicleMapsList = () => import("./components/UserVehicleMapsList.vue")
const routes = [
  {
    path: "",
    name: "UserVehicleMaps",
    component: UserVehicleMaps,
    children: [
      {
        path: "",
        name: "UserVehicleMapsList",
        component: UserVehicleMapsList,
      },
    ],
  },
]
export default routes.map((route) => ({
  ...route,
  path: "/uservehiclemap/" + route.path,
  meta: { ...route.meta, onlyWhenLoggedOut: false, public: false },
}))
  