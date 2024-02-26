const Dashboard = () => import("./components/Dashboard.vue")
const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
]
export default routes.map((route) => ({
  ...route,
  meta: { ...route.meta, onlyWhenLoggedOut: false, public: false, title: 'Dashboard' },
}))
