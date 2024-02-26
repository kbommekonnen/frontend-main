const ItemGroups = () => import("./components/ItemGroups.vue")
const ItemGroupsList = () => import("./components/ItemGroupsList.vue")
const NewItemGroupForm = () => import("./components/NewItemGroupForm.vue")
const routes = [
  {
    path: "",
    name: "ItemGroups",
    component: ItemGroups,
    children: [
      {
        path: "",
        name: "ItemGroupsList",
        component: ItemGroupsList,
      },
      {
        path: "add-new",
        name: "AddNewItemGroup",
        component: NewItemGroupForm,
      },
    ],
  },
]
export default routes.map((route) => ({
  ...route,
  path: "item-groups/" + route.path,
  meta: { ...route.meta, onlyWhenLoggedOut: false, public: false },
}))
