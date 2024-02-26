export const AccountsHeaders = [
  {
    label: "name",
    key: "name",
  },
  {
    label: "code",
    key: "code",
  },
  {
    label: "side",
    key: "side",
  },
  {
    label: "status",
    key: "status",
  },
  {
    label: "actions",
    key: "__actions",
  },
]

export const DepositeHeaders = [
  {
    label: "Account",
    key: "gl",
  },
  {
    label: "amount",
    type: "number",
    key: "credit",
  },
  {
    label: "description",
    key: "reason",
  },
  {
    label: "date",
    type: "date",
    formate: "MMM DD YYYY hh:mm",
    key: "createdAt",
  },
  // user profile card
  // {
  //   label: "suer",
  //   key: "registeredBy",
  // },
  {
    label: "status",
    key: "status",
  },
  {
    label: "actions",
    key: "__actions",
  },
]

export const WithdrowHeaders = [
  {
    label: "Account",
    key: "gl",
  },
  {
    label: "amount",
    type: "number",
    key: "debit",
  },
  {
    label: "description",
    key: "reason",
  },
  {
    label: "date",
    type: "date",
    formate: "MMM DD YYYY hh:mm",
    key: "createdAt",
  },
  // user profile card
  // {
  //   label: "suer",
  //   key: "registeredBy",
  // },
  {
    label: "status",
    key: "status",
  },
  {
    label: "actions",
    key: "__actions",
  },
]
export const importAccountsHeaders = [
  {
    label: "name",
    key: "name",
  },
  {
    label: "code",
    key: "code",
  },
  {
    label: "side",
    key: "side",
  },
  {
    label: "parent",
    key: "parent",
  },
  {
    label: "actions",
    key: "__actions",
  },
]

export const TrialBalanceHeaders = [
  {
    label: "Account",
    key: "gl",
  },
  {
    label: "debit",
    type: "number",
    key: "debit",
  },
  {
    label: "credit",
    type: "number",
    key: "credit",
  },
]

export const AccountTransactionsHeaders = [
  {
    label: "type",
    key: "transactionType",
  },
  {
    label: "debit",
    type: "number",
    key: "debit",
  },
  {
    label: "credit",
    type: "number",
    key: "credit",
  },
  {
    label: "reason",
    key: "reason",
  },
  {
    label: "date",
    type: "date",
    formate: "MMM DD YYYY hh:mm",
    key: "createdAt",
  },
  {
    label: "status",
    key: "status",
  },
]
