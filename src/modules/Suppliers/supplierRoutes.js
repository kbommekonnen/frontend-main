const Suppliers = () => import("./components/Suppliers.vue")
const SuppliersList = () => import("./components/SuppliersList.vue")
const NewSupplierForm = () => import("./components/NewSupplierForm.vue")
const EditSupplierForm = () => import("./components/EditSupplierForm.vue")
const routes = [
  {
    path: "supplier",
    name: "Suppliers",
    component: Suppliers,
    children: [
      {
        path: "",
        name: "SuppliersList",
        component: SuppliersList,
      },
      {
        path: "new",
        name: "NewSupplierForm",
        component: NewSupplierForm,
      },
      {
        path: "edit/:id",
        name: "EditSupplierForm",
        component: EditSupplierForm,
      },
    ],
  },
]
export default routes.map((route) => ({
  ...route,
  meta: { ...route.meta, onlyWhenLoggedOut: false, public: false },
}))
  