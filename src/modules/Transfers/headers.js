export const transfersHeaders = [
  // {
  //   label: "invoice no",
  //   key: "trId",
  //   // key: "transfer_no",
  // },
  {
    label: "items",
    key: "items.length",
  },
  {
    label: "sender warehouse",
    key: "sourceStore.name",
  },
  {
    label: "receiver warehouse",
    key: "destinationStore.name",
  },
  {
    label: "registered",
    key: "registeredBy.fullName",
  },
  {
    label: "confirmed",
    key: "verifiedBy.fullName",
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
export const itemTransfersHeaders = [
  {
    label: "code",
    key: "trNo",
  },
  {
    label: "sender warehouse",
    key: "sourceStore.name",
  },
  {
    label: "sender user",
    key: "registeredBy.fullName",
  },
  {
    label: "receiver warehouse",
    key: "destinationStore.name",
  },
  {
    label: "receiver user",
    key: "verifiedBy.fullName",
  },
  {
    label: "date",
    type: "date",
    formate: "MMM DD YYYY hh:mm:ss",
    key: "date",
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
export const transferItemsFormHeaders = [
  {
    label: "item",
    key: "_id",
  },
  {
    label: "quantity",
    key: "quantity",
  },
  // incase they want to know how much value are they exchanging, if it is going to be returned in cash
  {
    label: "subtotal",
    key: "subtotal",
  },
  {
    label: "",
    key: "actions",
  },
]
export const transferDetailHeaders = [
  {
    label: "item",
    key: "item.name",
  },
  {
    label: "quantity",
    type: "number",
    key: "quantity",
  },
  // incase they want to know how much value are they exchanging, if it is going to be returned in cash
  {
    label: "subtotal",
    type: "number",
    key: "subtotal",
  },
  {
    label: "",
    key: "actions",
  },
]
