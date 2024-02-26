const routes = [
  {
    path: "",
    name: "ItemCategories",
    component: () => import("./components/ItemCategories.vue"),
    children: [
      {
        path: "",
        name: "ItemCategoriesList",
        component: () => import("./components/ItemCategoriesList.vue"),
      },
    ],
  },
]
export default routes.map((route) => ({
  ...route,
  path: "item-categories/" + route.path,
  meta: { ...route.meta, onlyWhenLoggedOut: false, public: false },
}))
