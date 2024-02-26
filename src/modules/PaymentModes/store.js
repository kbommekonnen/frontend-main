import { defineStore } from "pinia"
import { ref } from "vue"

export const usePaymentModestore = defineStore("PaymentModestore", {
  state: () => ({
    name: ref(""),
    gl: ref(""),
    description: ref(""),
    isDefault: ref(false),
    jerrors: ref({}),
  }),
  getters: {
    form() {
      return {
        name: this.name,
        gl: this.gl,
        description: this.description,
        isDefault: this.isDefault,
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
