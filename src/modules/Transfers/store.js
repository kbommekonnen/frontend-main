import { defineStore } from "pinia"
import { computed } from "vue"
import { ref } from "vue"

export const useTransferStore = defineStore("transferStore", {
  state: () => ({
    name: ref(""),
    date: ref(""),
    destinationStore: ref(""),
    reason: ref(""),
    items: ref([{ _id: 0, quantity: 1 }]),
    jerrors: ref({}),
  }),
  getters: {
    form() {
      return {
        //  supplier: this.name,
        destinationStore: this.destinationStore,
        items: this.items
          .filter(({ _id }) => _id)
          .map(({ _id, quantity, unit }) => ({
            item: _id,
            unit,
            quantity,
          })),
        reason: this.reason,
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
        stock: item.stockDetail._id,
        quantity: 1,
        unit: item.unit,
        units: item.units,
        price: item.purchaseInfo.cost,
      }
      this.items.splice(-1, 0, item)
      const index = this.items.length - 2

      this.items[index].amount = computed(
        () => this.items[index].price * this.items[index].quantity,
      )
    },
    removeItem(index) {
      return this.items.splice(index, 1)
    },
  },
})
