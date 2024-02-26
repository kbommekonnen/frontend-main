const Frequencies = () => import("./components/Frequencies.vue")
const FrequencyList = () => import("./components/FrequencyList.vue")
const routes = [
  {
    path: "",
    name: "Frequencies",
    component: Frequencies,
    children: [
      {
        path: "",
        name: "FrequencyList",
        component: FrequencyList,
      },
    ],
  },
]
export default routes.map((route) => ({
  ...route,
  path: "frequency/" + route.path,
  meta: { ...route.meta, onlyWhenLoggedOut: false, public: false },
}))
