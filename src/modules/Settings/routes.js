const settings = () => import("./components/Settings.vue")
const Organization = () => import("./components/Organization.vue")
const Preferences = () => import("./components/Preferences.vue")
import locationsRoute from "../Locations/locationsRoutes"
import warehousesRoute from "../Warehouses/warehousesRoutes"
import taxRateRoutes from "../TaxRates/taxRateRoutes"
import priceListRoutes from "../PriceLists/priceListsRoutes"
import measurementUnitRoutes from "../MeasurementUnits/measurementUnitsRoutes"
import paymentModeRoutes from "../PaymentModes/paymentModeRoutes"
import customerTypeRoutes from "../CustomerTypes/customerTypeRoutes"
import frequencyRoutes from "../Frequency/frequencyRoutes"
import localizationRoutes from "../Localization/localizationRoutes"
import authRoutes from "../Auth/authRoutes"
const routes = [
  {
    path: "/settings",
    name: "Settings",
    component: settings,
    children: [
      {
        path: "",
        redirect: "/settings/organization",
      },
      {
        path: "organization",
        name: "Organization",
        component: Organization,
      },
      ...locationsRoute,
      ...warehousesRoute,
      ...taxRateRoutes,
      ...priceListRoutes,
      ...measurementUnitRoutes,
      ...paymentModeRoutes,
      ...customerTypeRoutes,
      ...frequencyRoutes,
      ...localizationRoutes,
      ...authRoutes,
      // {
      //     path: 'locations',
      //     name: 'Locations',
      //     component: Locations,
      // },
      {
        path: "preferences",
        name: "Preferences",
        component: Preferences,
      },
      {
        path: "tax-rates",
        name: "Taxrates",
        component: Organization,
      },
    ],
  },
]
export default routes.map((route) => ({
  ...route,
  meta: { ...route.meta, onlyWhenLoggedOut: false, public: false, title: 'Settings' },
}))
