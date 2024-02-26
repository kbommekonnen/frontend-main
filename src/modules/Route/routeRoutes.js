const Route = () => import("./components/Route.vue")
const RouteList = () => import("./components/RouteList.vue")
const routes = [
  {
    path: "routes",
    name: "Route",
    component: Route,
    children: [
      {
        path: "",
        name: "RouteList",
        component: RouteList,
      },
    ],
  },
]
export default routes.map((route) => ({
  ...route,
  meta: { ...route.meta, onlyWhenLoggedOut: false, public: false },
}))
  