const Adjustments = () => import("./components/Adjustments.vue")
const AdjustmentsList = () => import("./components/AdjustmentsList.vue")
const NewAdjustmentForm = () => import("./components/NewAdjustmentForm.vue")
const routes = [
  {
    path: "",
    name: "Adjustments",
    component: Adjustments,
    children: [
      {
        path: "",
        name: "AdjustmentsList",
        component: AdjustmentsList,
      },
      {
        path: "new",
        name: "NewAdjustmentForm",
        component: NewAdjustmentForm,
      },
    ],
  },
]
export default routes.map((route) => ({
  ...route,
  path: "adjustments/" + route.path,
  meta: { ...route.meta, onlyWhenLoggedOut: false, public: false },
}))
