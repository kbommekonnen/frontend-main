const Registration = () => import("./components/Registration.vue")
const routes = [
  {
    path: "/registration",
    name: "Registration",
    component: Registration,
  },
]
export default routes.map((route) => ({
  ...route,
  meta: { ...route.meta, onlyWhenLoggedOut: false, public: true },
}))
