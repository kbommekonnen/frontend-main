const Organization = () => import("./components/Organization.vue")
const Organizations = () => import("./components/Organizations.vue")
const OrganizationsList = () => import("./components/OrganizationsList.vue")
const routes = [
  {
    path: "/organization",
    name: "Organizations",
    component: Organizations,
  },
  // children: [
  {
    path: "/organizations",
    name: "OrganizationsList",
    component: OrganizationsList,
    onlyWhenLoggedOut: false,
    public: false,
  },
  {
    path: "/organizations/:id",
    name: "Organization",
    component: Organization,
    onlyWhenLoggedOut: false,
    public: false,
  },
  // ],
  // },
]
export default routes.map((route) => ({
  ...route,
  meta: { ...route.meta, onlyWhenLoggedOut: false, public: false },
}))
