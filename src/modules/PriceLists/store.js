import { defineStore } from "pinia"
import { ref } from "vue"

export const useLocationStore = defineStore("locationStore", {
  state: () => ({
    name: ref(""),
    description: ref(""),
    jerrors: ref({}),
  }),
  getters: {
    form() {
      return {
        name: this.name,
        description: this.description,
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
