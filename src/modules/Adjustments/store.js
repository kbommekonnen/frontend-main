import { defineStore } from "pinia"
import { watch } from "vue"
import { ref } from "vue"

export const useAdjustmentStore = defineStore("adjustmentStore", {
  state: () => ({
    name: ref(""),
    date: ref(""),
    adjustmentType: ref("Quantity"),
    destinationStore: ref(""),
    description: ref(""),
    account: ref("63dc0aaa1f4e2240f4485d0f"),
    items: ref([{ _id: 0, newQuantityOnHand: 0, quantityAdjusted: 0 }]),
    jerrors: ref({}),
  }),
  getters: {
    form() {
      return {
        referenceNumber: this.referenceNumber,
        mode: this.adjustmentType,
        account: this.account,
        reason: this.reason,
        items: this.items
          .filter(({ _id }) => _id)
          .map(({ _id, newQuantityOnHand }) => ({
            item: _id,

            quantityOnHand: newQuantityOnHand,
          })),
        // description: this.description,
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
        unit: item.unit,
        adjustedQuantity: 0,
        quantityAvailable: item.stockDetail.quantity,
        newQuantityOnHand: item.stockDetail.quantity,
      }
      this.items.splice(-1, 0, item)
      const index = this.items.length - 2
      watch(
        () => this.items[index].newQuantityOnHand,
        (quantity = 0) => {
          this.items[index].adjustedQuantity =
            quantity - (this.items[index].quantityAvailable || 0)
        },
        {
          immediate: false,
        },
      )
      watch(
        () => this.items[index].adjustedQuantity,
        (quantity = 0) => {
          this.items[index].newQuantityOnHand =
            quantity + (this.items[index].quantityAvailable || 0)
        },
        {
          immediate: false,
        },
      )
      // this.items[index].adjustedQuantity = computed(
      //   () =>
      //     this.items[index].newQuantityOnHand -
      //     this.items[index].quantityAvailable,
      // )
    },
    removeItem(index) {
      return this.items.splice(index, 1)
    },
  },
})
