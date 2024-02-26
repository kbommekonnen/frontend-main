import { defineStore } from "pinia"
import { ref } from "vue"

export const useMeasurementUnitStore = defineStore("measurementUnitStore", {
  state: () => ({
    name: ref(""),
    shortName: ref(""),
    description: ref(""),
    isPrimary: ref(false),
    jerrors: ref({}),
  }),
  getters: {
    form() {
      return {
        name: this.name,
        shortName: this.shortName,
        description: this.description,
        isPrimary: this.isPrimary,
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
