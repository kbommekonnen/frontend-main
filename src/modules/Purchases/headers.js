export const purchasesHeaders = [
  {
    label: "invoice no",
    key: "invoiceNumber",
    // key: "purchase_no",
  },
  {
    label: "items",
    key: "items",
  },
  {
    label: "warehouse",
    key: "store.name",
  },
  {
    label: "sub total",
    type: "number",
    key: "totalAmount",
  },
  {
    label: "date",
    type: "date",
    formate: "MMM DD YYYY",
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
export const itemPurchasesHeaders = [
  {
    label: "invoice no",
    key: "purchase.trId",
  },
  {
    label: "warehouse",
    key: "store.name",
  },
  {
    label: "price",
    type: "number",
    key: "rate",
  },
  {
    label: "quantity",
    type: "number",
    key: "quantity",
  },
  // {
  //   label: "sub total",
  //   type: "number",
  //   key: "totalAmount",
  // },
  {
    label: "date",
    type: "date",
    formate: "MMM DD YYYY hh:mm:ss",
    key: "createdAt",
  },
  {
    label: "status",
    key: "purchase.status",
  },
  // {
  //   label: "",
  //   key: "__actions",
  // },
]
export const purchaseItemsFormHeaders = [
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
    label: "unit price",
    type: "number",
    key: "price",
  },
  {
    label: "amount",
    type: "number",
    key: "amount",
  },
  {
    label: "",
    key: "actions",
  },
]
export const purchaseDetailHeaders = [
  {
    label: "item",
    key: "item",
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
