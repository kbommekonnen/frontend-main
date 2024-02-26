export const issuesHeaders = [
  {
    label: "issue no",
    key: "issueNumber",
  },
  {
    label: "items",
    key: "items",
  },
  {
    label: "warehouse",
    key: "store.name",
  },
  // {
  //   label: "quantity",
  //   type: "number",
  //   key: "items.0.quantity",
  // },
  {
    label: "date",
    type: "date",
    formate: "MMM DD YYYY hh:mm:ss",
    key: "createdAt",
  },
  {
    label: "status",
    key: "status",
  },
  {
    label: "",
    key: "__actions",
  },
]
export const itemIssuesHeaders = [
  {
    label: "issue no",
    key: "issueNumber",
  },
  // {
  //   label: "warehouse",
  //   key: "store.name",
  // },
  {
    label: "quantity",
    type: "number",
    key: "items.quantity",
  },
  {
    label: "date",
    type: "date",
    formate: "MMM DD YYYY hh:mm:ss",
    key: "createdAt",
  },
  {
    label: "status",
    key: "status",
  },
  // {
  //   label: "",
  //   key: "__actions",
  // },
]
export const issueItemsFormHeaders = [
  {
    label: "item",
    key: "_id",
  },
  {
    label: "quantity",
    type: "number",
    key: "quantity",
  },
  {
    label: "",
    key: "actions",
  },
]
export const issueDetailHeaders = [
  {
    label: "item",
    key: "item",
  },
  {
    label: "quantity",
    type: "number",
    key: "quantity",
  },
]
export const emptyIssueItemsHeaders = [
  {
    label: "item",
    key: "item.name",
  },
  {
    label: "quantity",
    type: "number",
    key: "quantity",
  },
  {
    label: "unit price",
    type: "number",
    key: "rate",
  },
  {
    label: "amount",
    type: "number",
    key: "amount",
  },
]
