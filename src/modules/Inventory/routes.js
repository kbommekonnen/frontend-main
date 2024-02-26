import Inventory from "./components/Inventory.vue"
import InventoryOverview from "./components/InventoryOverview.vue"
import itemsRoute from "../Items/itemsRoutes"
import compositesRoute from "../Composites/compositesRoutes"
import itemGroupsRoute from "../ItemGroups/itemGroupsRoutes"
import transferRoutes from "../Transfers/transferRoutes.js"
import adjustmentRoutes from "../Adjustments/adjustmentRoutes.js"
import itemCategoriesRoutes from "../ItemCategory/itemCategoriesRoutes"
const routes = [
  {
    path: "/inventory",
    name: "Inventory",
    component: Inventory,
    children: [
      {
        path: "",
        name: "InventoryOverview",
        component: InventoryOverview,
      },
      ...itemsRoute,
      ...compositesRoute,
      ...itemGroupsRoute,
      ...itemCategoriesRoutes,
      ...transferRoutes,
      ...adjustmentRoutes,
    ],
  },
]
export default routes.map((route) => ({
  ...route,
  meta: {
    ...route.meta,
    onlyWhenLoggedOut: false,
    public: false,
    title: "Inventory",
  },
}))
