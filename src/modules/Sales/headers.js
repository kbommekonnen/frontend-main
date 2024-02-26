export const sellsHeaders = [
  {
    label: "invoice no",
    key: "trId",
    // key: "sell_no",
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
    label: "sub total",
    type: "number",
    key: "totalAmount",
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
  {
    label: "",
    key: "__actions",
  },
]
export const itemSalesHeaders = [
  {
    label: "invoice no",
    key: "trId",
  },
  // {
  //   label: "warehouse",
  //   key: "store.name",
  // },
  {
    label: "price",
    type: "number",
    key: "items.rate",
  },
  {
    label: "quantity",
    type: "number",
    key: "items.quantity",
  },
  {
    label: "sub total",
    type: "number",
    key: "items.subtotal",
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
export const sellItemsFormHeaders = [
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
    key: "price",
  },
  {
    label: "discount",
    type: "number",
    key: "discount",
  },
  {
    label: "tax",
    type: "number",
    key: "tax",
  },
  {
    label: "sub total",
    type: "number",
    key: "subtotal",
  },
  {
    label: "",
    key: "actions",
  },
]
export const sellDetailHeaders = [
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
    label: "discount",
    type: "number",
    key: "discount.amount",
  },
  // {
  //   label: "tax",
  //   type: "number",
  //   key: "tax",
  // },
  {
    label: "amount",
    type: "number",
    key: "amount",
  },
]
