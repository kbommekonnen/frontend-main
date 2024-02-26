import { defineStore } from "pinia"
import { ref } from "vue"

export const useFrequenciestore = defineStore("Frequenciestore", {
  state: () => ({
    name: ref(""),
    amount: ref(),
    jerrors: ref({}),
  }),
  getters: {
    form() {
      return {
        name: this.name,
        amount: this.amount,
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
