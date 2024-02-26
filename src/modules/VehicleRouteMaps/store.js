import { defineStore } from "pinia"
import { ref } from "vue"

export const useVehicleRouteMapsstore = defineStore("VehicleRouteMapsstore", {
  state: () => ({
		vehicle: ref(),
		route: ref(""),
    jerrors: ref({}),
  }),
  getters: {
    form() {
      return {
				vehicle: this.vehicle,
				route: this.route,
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
