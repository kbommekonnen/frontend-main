import Modules from "./components/Modules.vue"
import ModulesList from "./components/ModulesList.vue"
const routes = [
  {
    path: "",
    name: "Modules",
    component: Modules,
    children: [
      {
        path: "",
        name: "ModulesList",
        component: ModulesList,
      },
    ],
  },
]
export default routes.map((route) => ({
  ...route,
  path: "modules/" + route.path,
  meta: { ...route.meta, onlyWhenLoggedOut: false, public: false },
}))
