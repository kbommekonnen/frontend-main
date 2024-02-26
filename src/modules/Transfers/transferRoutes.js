const Transfers = () => import("./components/Transfers.vue")
const TransfersList = () => import("./components/TransfersList.vue")
const NewTransferForm = () => import("./components/NewTransferForm.vue")
const TransferDetail = () => import("./components/TransferDetail.vue")
const routes = [
  {
    path: "",
    name: "Transfers",
    component: Transfers,
    children: [
      {
        path: "",
        name: "TransfersList",
        component: TransfersList,
      },
      {
        path: "new",
        name: "NewTransferForm",
        component: NewTransferForm,
      },
      {
        path: ":id",
        name: "TransferDetail",
        component: TransferDetail,
      },
    ],
  },
]
export default routes.map((route) => ({
  ...route,
  path: "transfers/" + route.path,
  meta: { ...route.meta, onlyWhenLoggedOut: false, public: false },
}))
