const PaymentModes = () => import("./components/PaymentModes.vue")
const PaymentModesList = () => import("./components/PaymentModesList.vue")
const routes = [
  {
    path: "",
    name: "PaymentModes",
    component: PaymentModes,
    children: [
      {
        path: "",
        name: "PaymentModesList",
        component: PaymentModesList,
      },
    ],
  },
]
export default routes.map((route) => ({
  ...route,
  path: "payment-modes/" + route.path,
  meta: { ...route.meta, onlyWhenLoggedOut: false, public: false },
}))
