const MeasurementUnits = () => import("./components/MeasurementUnits.vue")
const MeasurementUnitsList = () => import("./components/MeasurementUnitsList.vue")
const routes = [
  {
    path: "",
    name: "MeasurementUnits",
    component: MeasurementUnits,
    children: [
      {
        path: "",
        name: "MeasurementUnitsList",
        component: MeasurementUnitsList,
      },
    ],
  },
]
export default routes.map((route) => ({
  ...route,
  path: "measurement-units/" + route.path,
  meta: { ...route.meta, onlyWhenLoggedOut: false, public: false },
}))
