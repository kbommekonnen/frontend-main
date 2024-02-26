// const Locations = () => import("./components/Locations.vue")
const LocationsList = () => import("./components/LocationsList.vue")
const routes = [
  {
    path: "",
    name: "Locations",
    component: () => import("./components/Locations.vue"),
    children: [
      {
        path: "",
        name: "LocationsList",
        component: LocationsList,
      },
    ],
  },
]
export default routes.map((route) => ({
  ...route,
  path: "locations/" + route.path,
  meta: { ...route.meta, onlyWhenLoggedOut: false, public: false },
}))
