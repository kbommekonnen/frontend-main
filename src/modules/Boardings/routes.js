const Boardings = () => import("./components/Boardings.vue")
const BoardingsList = () => import("./components/BoardingsList.vue")
const routes = [
  {
    path: "",
    name: "Boardings",
    component: Boardings,
    children: [
      {
        path: "",
        name: "BoardingsList",
        component: BoardingsList,
      },
    ],
  },
]
export default routes.map((route) => ({
  ...route,
  path: "/boarding/" + route.path,
  meta: { ...route.meta, onlyWhenLoggedOut: false, public: false },
}))
  