import { defineStore } from "pinia"
import { ref } from "vue"

export const useTaxStore = defineStore("taxStore", {
  state: () => ({
    name: ref(""),
    amount: ref(),
    rateType: ref("Percentage"),
    jerrors: ref({}),
  }),
  getters: {
    form() {
      return {
        name: this.name,
        amount: this.amount,
        rateType: this.rateType,
      }
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
