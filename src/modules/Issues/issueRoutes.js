const Index = () => import("./components/Index.vue")
const IssuesList = () => import("./components/IssuesList.vue")
const NewIssueForm = () => import("./components/NewIssueForm.vue")
const IssueDetail = () => import("./components/IssueDetail.vue")
const routes = [
  {
    path: "issue",
    name: "Issues",
    component: Index,
    children: [
      {
        path: "",
        redirect: "/sell/issue/list"
      },
      {
        path: "list",
        name: "IssuesList",
        component: IssuesList,
      },
      {
        path: "new",
        name: "NewIssueForm",
        component: NewIssueForm,
      },
      {
        path: ":id",
        name: "IssueDetail",
        component: IssueDetail,
      },
    ],
  },
]
export default routes.map((route) => ({
  ...route,
  meta: { ...route.meta, onlyWhenLoggedOut: false, public: false, title: 'Issue' },
}))
