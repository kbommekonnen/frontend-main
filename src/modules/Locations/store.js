import { defineStore } from "pinia"
import { ref } from "vue"

export const useLocationStore = defineStore("locationStore", {
  state: () => ({
    name: ref(""),
    country: ref("Ethipia"),
    region: ref("Tigray"),
    city: ref(""),
    street: ref(""),
    description: ref(""),
    jerrors: ref({}),
  }),
  getters: {
    form() {
      return {
        name: this.name,
        country: this.country,
        region: this.region,
        city: this.city,
        street: this.street,
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
