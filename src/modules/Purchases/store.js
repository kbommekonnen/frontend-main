import { defineStore } from "pinia"
import { computed, watch } from "vue"
import { ref } from "vue"

export const usePurchaseStore = defineStore("purchaseStore", {
  state: () => ({
    name: ref("Walkin"),
    supplier: ref("63dc0aaa1f4e2240f4485d0f"),
    date: ref(""),
    tel: ref(""),
    invoiceNumber: ref(""),
    plateNumber: ref(""),
    orderNumber: ref(""),
    issueNumber: ref(""),
    referenceNumber: ref(""),
    description: ref(""),
    items: ref([{ _id: 0, quantity: 0, price: 0 }]),
    jerrors: ref({}),
  }),
  getters: {
    form() {
      return {
        supplier: this.supplier,
        invoiceNumber: this.invoiceNumber,
        plateNumber: this.plateNumber,
        orderNumber: this.orderNumber,
        issueNumber: this.issueNumber,
        referenceNumber: this.referenceNumber,
        items: this.items
          .filter(({ _id }) => _id)
          .map(({ _id, quantity, unit, price }) => ({
            item: _id,
            unit,
            quantity,
            rate: price,
          })),
        description: this.description,
      }
    },
    totalAmount() {
      return this.items.reduce((sum, { amount = 0 }) => (sum += amount), 0)
    },
    error() {
      return this.success && Object.values(this.errors).find((value) => value)
    },
  },
  actions: {
    setError(error) {
      this.jerrors = error
    },
    addItem(item) {
      item = {
        _id: item._id,
        name: item.name,
        sku: item.sku,
        stockDetail: item.stockDetail,
        quantity: 1,
        purchaseInfo: item.purchaseInfo,
        unit: item.unit._id,
        units: item.units,
        price: item.purchaseInfo.cost,
      }
      this.items.splice(-1, 0, item)
      const index = this.items.length - 2
      watch(
        () => this.items[index]?.unit,
        (unit) => {
          if (unit && this.items[index].purchaseInfo && this.items[index].units)
            this.items[index].price =
              this.items[index].purchaseInfo.cost * this.items[index].quantity
              // this.items[index].units.find(
              //   ({ unit }) => unit == this.items[index].unit,
              // ).quantity
              // this.items[index].units.find(
              //   ({ unit }) => unit == this.items[index].unit,
              // ).quantity
          else return
        },
      )

      this.items[index].amount = computed(
        () => this.items[index].price * this.items[index].quantity,
      )
    },
    removeItem(index) {
      return this.items.splice(index, 1)
    },
  },
})
