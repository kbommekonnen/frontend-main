export const inventoryTransactionReport = [
  {
    label: "item name",
    key: "item.name",
  },
  {
    label: "sku",
    key: "item.sku",
  },
  {
    label: "quantity purchased",
    key: "purchase_quantity",
    type: "number",
  },
  {
    label: "quantity sold",
    key: "sell_quantity",
    type: "number",
  },
  {
    label: "total purchase",
    key: "purchase_amount",
    type: "number",
  },
  {
    label: "total sell",
    key: "sell_amount",
    type: "number",
  },
]
export const inventorySummaryReport = [
  {
    label: "item name",
    key: "item",
  },
  {
    label: "sku",
    key: "sku",
  },
  {
    label: "reorder level",
    key: "reorderLevel",
  },
  {
    label: "quantity in",
    key: "purchases",
  },
  {
    label: "quantity out",
    key: "sales",
  },
  {
    label: "stock on hand",
    key: "available",
  },
]

// Inventory Asset Value = Stock on Hand * Cost Price Per Unit
export const inventoryValuationSummaryReport = [
  {
    label: "item name",
    key: "name",
  },
  {
    label: "sku",
    key: "sku",
  },
  {
    label: "quantity available",
    type: "number",
    key: "quantity",
  },
  {
    label: "inventory asset value",
    type: "number",
    key: "value",
  },
]
//  a rundown of the number of days you’ve been holding stock. This is helpful in identifying slow-moving and stale goods.
export const inventoryAgingReport = [
  {
    label: "item name",
    key: "item",
  },
  {
    label: "sku",
    key: "sku",
  },
  {
    label: "1-5 days",
    key: "1-5days",
    type: "number",
  },
  {
    label: "6-10 days",
    key: "6-10days",
    type: "number",
  },
  {
    label: "11-20 days",
    key: "11-20days",
    type: "number",
  },
  {
    label: "21-30 days",
    key: "21-30days",
    type: "number",
  },
  {
    label: "> month",
    key: ">month",
    type: "number",
  },
]
export const inventorySalesReport = [
  {
    label: "item name",
    key: "item",
  },
  {
    label: "sku",
    key: "sku",
  },
  {
    label: "margin",
    key: "margin",
    type: "number",
  },
  {
    label: "quantity sold",
    key: "quantity",
  },
  {
    label: "total sales price",
    key: "totalAmount",
  },
]
// shows the stock details of each item distributed across all warehouses
export const inventoryWarehouseReport = [
  {
    label: "item name",
    key: "item.name",
  },
  {
    label: "sku",
    key: "item.sku",
  },
  {
    label: "warehouse name",
    key: "store",
  },
  {
    label: "quantity in",
    key: "purchase_quantity",
  },
  {
    label: "quantity out",
    key: "sell_quantity",
  },
  {
    label: "stock on hand",
    key: "available",
  },
]
//  displays the details of all your item’s opening stock, quantity sold (Quantity Out), purchased (Quantity In), and closing stock (calculated as Opening Stock + Quantity In - Quantity Out) for a given period
export const inventoryStockSummaryReport = [
  {
    label: "item name",
    key: "item",
  },
  {
    label: "sku",
    key: "sku",
  },
  {
    label: "opening stock",
    key: "openingStock",
    type: "number",
  },
  {
    label: "quantity in",
    key: "purchases",
  },
  {
    label: "quantity out",
    key: "sales",
  },
  {
    label: "closing stock",
    key: "closingStock",
  },
]

//  displays the details of all your item’s opening stock, quantity sold (Quantity Out), purchased (Quantity In), and closing stock (calculated as Opening Stock + Quantity In - Quantity Out) for a given period
export const inventoryAbcClassicationReport = [
  {
    label: "item name",
    key: "item",
  },
  {
    label: "sku",
    key: "sku",
  },
  {
    label: "cumulative value",
    key: "cumulativeValue",
    type: "number",
  },
  {
    label: "cumulative share",
    key: "cumulativeShare",
    type: "number",
  },
  {
    label: "current class",
    key: "currentClass",
  },
]
