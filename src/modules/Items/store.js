import { defineStore } from "pinia"
import { ref } from "vue"
export const useItemstore = defineStore("Itemstore", {
  state: () => ({
    name: ref(""),
    sku: ref(""),
    description: ref("description"),
    itemType: ref("Goods"),
    category: ref(""),
    size: ref(undefined),
    unit: ref(""),
    image: ref(""),
    returnable: ref(false),
    reorderPoint: ref(""),
    manufacturer: ref(""),
    brand: ref(""),

    // sales info
    sellingPrice: ref(0),
    salesGlAccount: ref("63dc0aaa1f4e2240f4485d0f"),
    salesdescription: ref("sales description"),

    // purchase info
    purchasingCost: ref(0),
    purchaseGlAccount: ref("63dc0aaa1f4e2240f4485d0f"),
    purchaseDescription: ref("purchase description"),

    inventoryAccount: ref("63dc0aaa1f4e2240f4485d0f"),
    // openingStock
    openingStockOnWarehouses: ref([]),
    pricing: ref([]),
    primaryMeasurementUnit: ref(""),
    measurements: ref([]),

    jerrors: ref({}),
  }),
  getters: {
    form() {
      return {
        name: this.name,
        sku: this.sku,
        // description: this.description,
        itemType: this.itemType,
        category: this.category,
        unit: this.primaryMeasurementUnit,
        units: [
          { unit: this.primaryMeasurementUnit, quantity: 1 },
          ...this.measurements.map(({ unit, quantity }) => ({
            unit,
            quantity,
          })),
        ],
        image: this.image,
        returnable: this.returnable,
        reorderPoint: this.reorderPoint,
        manufacturer: this.manufacturer,
        brand: this.brand,
        pricing: this.pricing.map(({ priceList, price }) => ({
          priceList,
          price,
        })),
        inventoryAccount: this.inventoryAccount,
        salesInfo: {
          glAccount: this.salesGlAccount,
          description: this.salesdescription,
        },
        purchaseInfo: {
          cost: this.purchasingCost,
          glAccount: this.purchaseGlAccount,
          description: this.purchaseDescription,
        },
        openingStock: this.openingStockOnWarehouses.map(
          ({ amount, warehouse }) => ({ warehouse, quantity: amount }),
        ),
      }
    },
    formData() {
      let data = new FormData()
      Object.entries(this.form).forEach(([key, value]) => {
        if (value && value != "") {
          data.append(key, value)
        }
      })
      return data
    },
    openingStockTotalAmount() {
      if (this.openingStockOnWarehouses.length == 0) return 0
      return this.openingStockOnWarehouses.reduce(
        (sum, { amount = 0 }) => sum + amount,
        0,
      )
    },
    error() {
      return this.success && Object.values(this.errors).find((value) => value)
    },
  },
  actions: {
    setError(error) {
      this.jerrors = error
    },
  },
})
