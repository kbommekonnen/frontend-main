import Localizations from "./components/Localizations.vue"
import LocalizationsList from "./components/LocalizationsList.vue"
const routes = [
  {
    path: "",
    key: "Localizations",
    component: Localizations,
    children: [
      {
        path: "",
        key: "LocalizationsList",
        component: LocalizationsList,
      },
    ],
  },
]
export default routes.map((route) => ({
  ...route,
  path: "localization/" + route.path,
  meta: { ...route.meta, onlyWhenLoggedOut: false, public: false },
}))
