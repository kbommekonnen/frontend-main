const Roles = () => import("./components/Roles.vue")
const RolesList = () => import("./components/RolesList.vue")
const NewRoleForm = () => import("./components/NewRoleForm.vue")
const EditRoleForm = () => import("./components/EditRoleForm.vue")
const routes = [
  {
    path: "",
    name: "Roles",
    component: Roles,
    children: [
      {
        path: "",
        name: "RolesList",
        component: RolesList,
      },
      {
        path: "new-role",
        name: "NewRoleForm",
        component: NewRoleForm,
      },
      {
        path: "edit-role/:id",
        name: "EditRoleForm",
        component: EditRoleForm,
      },
    ],
  },
]
export default routes.map((route) => ({
  ...route,
  path: "roles/" + route.path,
  meta: { ...route.meta, onlyWhenLoggedOut: false, public: false },
}))
