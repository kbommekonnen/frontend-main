const Distribution = () => import("./components/Distribution.vue")
import vehicleRoutes from '../Vehicles/vehicleRoutes'
import vehicleTypeRoutes from '../VehicleTypes/vehicleRoutes'
import routeRoutes from '../Route/routeRoutes'
const routes = [
  {
    path: "/distribution",
    name: "Distribution",
    component: Distribution,
    children: [...vehicleTypeRoutes, ...vehicleRoutes, ...routeRoutes],
  },
]
export default routes.map((route) => ({
  ...route,
  meta: { ...route.meta, onlyWhenLoggedOut: false, public: false },
}))
