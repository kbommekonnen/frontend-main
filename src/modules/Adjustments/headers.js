export const adjustmentsHeaders = [
  {
    label: "reference no",
    key: "referenceNumber",
    // key: "adjustment_no",
  },
  {
    label: "mode",
    key: "mode",
  },
  {
    label: "items",
    key: "items.length",
  },
  {
    label: "warehouse",
    key: "store.name",
  },
  {
    label: "reason",
    key: "reason",
  },
  {
    label: "user",
    key: "registeredBy.fullName",
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
export const itemAdjustmentsHeaders = [
  {
    label: "reference number",
    key: "referenceNumber",
  },
  {
    label: "warehouse",
    key: "store",
  },
  {
    label: "reason",
    key: "reason",
  },
  {
    label: "user",
    key: "registeredBy",
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
export const adjustmentItemsFormHeaders = [
  {
    label: "item",
    key: "_id",
  },
  {
    label: "quantity available",
    key: "quantityAvailable",
  },
  {
    label: "new quantity on hand",
    key: "newQuantityOnHand",
  },
  {
    label: "quantity adjusted",
    key: "adjustedQuantity",
  },
  {
    label: "",
    key: "actions",
  },
]
