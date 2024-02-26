import Actions from "./components/Actions.vue"
import ActionsList from "./components/ActionsList.vue"
const routes = [
  {
    path: "",
    name: "Actions",
    component: Actions,
    children: [
      {
        path: "",
        name: "ActionsList",
        component: ActionsList,
      },
    ],
  },
]
export default routes.map((route) => ({
  ...route,
  path: "actions/" + route.path,
  meta: { ...route.meta, onlyWhenLoggedOut: false, public: false },
}))
