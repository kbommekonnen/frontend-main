import { defineStore } from "pinia"
import { ref } from "vue"

export const useItemGroupstore = defineStore("ItemGroupstore", {
  state: () => ({
    name: ref(""),
    description: ref("description"),
    itemType: ref("Goods"),
    category: ref(""),
    unit: ref(""),
    size: ref(1),
    image: ref([]),
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
    attributes: ref([
      // { name: "size", options: ["large", "mid", "small"] },
      // { name: "color", options: ["yellow", "white", "green", "black"] },
      // { name: "brand", options: ["fila", "Nike", "Adidas"] },
      // { name: "brand", options: ["a", "b", "c"] },
    ]),
    itemGroupVariants: ref([]),

    jerrors: ref({}),
  }),
  getters: {
    form() {
      return {
        name: this.name,
        itemType: this.itemType,
        category: this.category,
        // description: this.description,
        size: this.size,
        unit: this.primaryMeasurementUnit,
        units: [
          { unit: this.primaryMeasurementUnit, quantity: 1 },
          ...this.measurements.map(({ unit, quantity }) => ({
            unit,
            quantity,
          })),
        ],
        // image: this.image,
        // returnable: this.returnable,
        // reorderPoint: this.reorderPoint,
        manufacturer: this.manufacturer,
        brand: this.brand,
        // inventoryAccount: this.inventoryAccount,
        salesInfo: {
          glAccount: this.salesGlAccount,
          description: this.salesdescription,
        },
        purchaseInfo: {
          cost: this.purchasingCost,
          glAccount: this.purchaseGlAccount,
          description: this.purchaseDescription,
        },
        attributes: this.attributes,
        pricing: this.pricing,
        items: this.itemGroupVariants.map((item) => {
          item.name = this.name + item.name
          item.purchaseInfo = {
            cost: this.purchasingCost,
            glAccount: this.purchaseGlAccount,
            description: this.purchaseDescription,
          }
          return item
        }),
        // openingStock: this.openingStockOnWarehouses.map(
        //   ({ amount, warehouse }) => ({ warehouse, quantity: amount }),
        // ),
      }
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
    setItemGroupVariants(variants, priceListOptions = []) {
      this.itemGroupVariants = variants
      this.addPriceListToItemVariants(priceListOptions)
    },
    generateAllItemsSkuNumber() {
      this.itemGroupVariants.forEach((item, index) => {
        this.itemGroupVariants[index].sku = this.generateSkuNumber()
      })
    },
    generateSkuNumber() {
      return Number(Number(Math.random() * 1000000).toFixed(0)).toString(8)
    },

    // copy first item data to all item variants
    copyToAll(key) {
      const sourceData = this.itemGroupVariants[0][key]
      this.itemGroupVariants = this.itemGroupVariants.map((item) => {
        item[key] = sourceData
        return item
      })
    },

    copyPricingToAll(priceList) {
      const firstItem = this.itemGroupVariants[0]
      const priceListIndex = firstItem.pricing.findIndex(
        (item) => item.priceList == priceList,
      )
      const sourceData = firstItem.pricing[priceListIndex].price
      this.itemGroupVariants = this.itemGroupVariants.map((item) => {
        item.pricing[priceListIndex].price = sourceData
        return item
      })
    },

    addPriceListToItemVariants(priceListOptions = []) {
      const priceLists = priceListOptions.map(({ value }) => value)
      this.itemGroupVariants = this.itemGroupVariants.map(
        ({ pricing, ...rest }) => {
          pricing = priceLists.map((priceList) => ({ priceList, price: 0 }))
          return { pricing, ...rest }
        },
      )
    },
  },
})
