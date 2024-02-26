import { defineStore } from "pinia"
import { computed, watch } from "vue"
import { ref } from "vue"

export const useIssueStore = defineStore("issueStore", {
  state: () => ({
    name: ref("Walk-in"),
    customer: ref(""),
    issueNumber: ref(""),
    date: ref(""),
    tel: ref(""),
    priceList: ref(""),
    paymentMode: ref(""),
    description: ref(""),
    items: ref([{ _id: 0, quantity: 0, price: 0 }]),
    jerrors: ref({}),
  }),
  getters: {
    form() {
      return {
        customerFullName: this.name,
        customer: this.customer,
        issueNumber: this.issueNumber,
        priceList: this.priceList,
        paymentMode: this.paymentMode,
        items: this.items
          .filter(({ _id }) => _id)
          .map(
            ({
              _id,
              quantity,
              unit,
              price,
              stock,
              discount,
              discountType,
              taxes,
            }) => ({
              item: _id,
              stock,
              unit,
              quantity,
              rate: price,
              discount: { discountType, amount: discount },
              tax: taxes,
            }),
          ),
        description: this.description,
      }
    },
    totalAmount() {
      return this.items.reduce((sum, { amount = 0 }) => (sum += amount), 0)
    },
    totalTax() {
      return this.items.reduce((sum, { totalTax = 0 }) => (sum += totalTax), 0)
    },
    totalDiscountedAmount() {
      return this.items.reduce(
        (sum, { discountedAmount = 0 }) => (sum += discountedAmount),
        0,
      )
    },
    totalPayAmount() {
      return this.items.reduce((sum, { subtotal = 0 }) => (sum += subtotal), 0)
    },
    error() {
      return this.success && Object.values(this.errors).find((value) => value)
    },
  },
  actions: {
    setError(error) {
      this.jerrors = error
    },
    getItemPrice(pricing = []) {
      try {
        return pricing.find(({ priceList }) => priceList == this.priceList)
          .price
      } catch (error) {
        return 0
      }
    },
    addItem(item, taxOptions) {
      item = {
        _id: item._id,
        name: item.name,
        sku: item.sku,
        stockDetail: item.stockDetail,
        stock: item.stockDetail._id,
        quantity: 1,
        discountType: "Flat",
        discount: 0,
        unit: item.unit._id,
        units: item.units,
        pricing: item.pricing,
        price: this.getItemPrice(item.pricing), //item.pricing[default]
        taxes: [],
      }
      this.items.splice(-1, 0, item)
      const index = this.items.length - 2
      watch(
        () => this.items[index]?.unit,
        (unit) => {
          if (this.priceList && unit) {
            console.log("pricing ...")
            this.items[index].price =
              this.getItemPrice(this.items[index].pricing) *
              this.items[index].units.find(({ unit }) => unit == unit).quantity
          } else return
        },
      )

      this.items[index].amount = computed(
        () => this.items[index].price * this.items[index].quantity,
      )

      this.items[index].discountedAmount = computed(() =>
        this.items[index].discountType == "Flat"
          ? this.items[index].discount
          : this.items[index].amount * this.items[index].discount * 0.01,
      )

      this.items[index].netAmount = computed(
        () => this.items[index].amount - this.items[index].discountedAmount,
      )

      this.items[index].totalTax = computed(() =>
        this.items[index].taxes.reduce((sum, tax) => {
          const taxRate = taxOptions.find(({ value }) => value == tax)
          let taxAmount =
            taxRate.rateType == "Flat"
              ? taxRate.amount
              : taxRate.amount * 0.01 * this.items[index].netAmount
          return (sum += taxAmount)
        }, 0),
      )
      this.items[index].subtotal = computed(
        () => this.items[index].netAmount + this.items[index].totalTax,
      )
    },
    removeItem(index) {
      return this.items.splice(index, 1)
    },
  },
})
