const Customers = () => import("./components/Customers.vue")
const CustomersList = () => import("./components/CustomersList.vue")
const NewCustomerForm = () => import("./components/NewCustomerForm.vue")
const EditCustomerForm = () => import("./components/EditCustomerForm.vue")
const routes = [
  {
    path: "",
    name: "Customers",
    component: Customers,
    children: [
      {
        path: "",
        name: "CustomersList",
        component: CustomersList,
      },
      {
        path: "new",
        name: "NewCustomerForm",
        component: NewCustomerForm,
      },
      {
        path: "edit/:id",
        name: "EditCustomerForm",
        component: EditCustomerForm,
      },
    ],
  },
]
export default routes.map((route) => ({
  ...route,
  path: "customer/" + route.path,
  meta: { ...route.meta, onlyWhenLoggedOut: false, public: false },
}))
  