const Accounts = () => import("./components/Accounts.vue")
const AccountsList = () => import("./components/AccountsList.vue")
const AccountDetailOverview = () => import("./components/AccountDetailOverview.vue")
const AccountDetail = () => import("./components/AccountDetail.vue")
const ImportAccounts = () => import("./components/ImportAccounts.vue")
const AccountsDashboard = () => import("./components/AccountsDashboard.vue")
const Deposites = () => import("./components/Deposites.vue")
const Withdrows = () => import("./components/Withdrows.vue")
const Preferences = () => import("./components/Preferences.vue")
const TrialBalance = () => import("./components/reports/TrialBalance.vue")
const BalanceSheet = () => import("./components/reports/BalanceSheet.vue")

const routes = [
  {
    path: "/account",
    name: "Accounts",
    component: Accounts,
    children: [
      // {
      //   path: "",
      //   redirect: "/account/dashboard",
      // },
      {
        path: "",
        name: "Dashboard",
        component: AccountsDashboard,
      },
      {
        path: "coa",
        name: "AccountsList",
        component: AccountsList,
      },
      {
        path: "deposites",
        name: "Deposites",
        component: Deposites,
      },
      {
        path: "withdrows",
        name: "Withdrows",
        component: Withdrows,
      },
      {
        path: "preference",
        component: Preferences,
      },
      // report
      {
        path: "report/trial-balance",
        name: "TrialBalance",
        component: TrialBalance,
      },
      {
        path: "report/balance-sheet",
        name: "BalanceSheet",
        component: BalanceSheet,
      },
      {
        path: "bulk-import",
        name: "ImportAccounts",
        component: ImportAccounts,
      },
      {
        path: "detail/:id",
        name: "AccountDetail",
        component: AccountDetail,
        children: [
          {
            path: "",
            name: "AccountDetailOverview",
            component: AccountDetailOverview,
          },
        ],
      },
    ],
  },

]
export default routes.map((route) => ({
  ...route,
  // path: "/account/"+route.path,
  meta: { ...route.meta, onlyWhenLoggedOut: false, public: false, title: 'Account' },
}))
