const UsersAndRoles = () => import("./components/UsersAndRoles.vue")
const UsersList = () => import("./components/UsersList.vue")
const NewUserForm = () => import("./components/NewUserForm.vue")
const EditUserForm = () => import("./components/EditUserForm.vue")
const AuthView = () => import("./components/AuthView.vue")
import roleRoutes from "../Roles/roleRoutes.js"
const routes = [
  {
    path: "",
    name: "Auth",
    component: AuthView,
    children: [
      {
        path: "",
        redirect: "/settings/auth/users-and-roles",
      },
      {
        path: "users-and-roles",
        name: "UsersAndRoles",
        component: UsersAndRoles,
      },
      {
        path: "users",
        name: "Users",
        component: UsersList,
      },
      {
        path: "new-user",
        name: "NewUserForm",
        component: NewUserForm,
      },
      {
        path: "edit-user/:id",
        name: "EditUserForm",
        component: EditUserForm,
      },
      ...roleRoutes,
    ],
  },
]
export default routes.map((route) => ({
  ...route,
  path: "auth/" + route.path,
  meta: { ...route.meta, onlyWhenLoggedOut: false, public: false },
}))
