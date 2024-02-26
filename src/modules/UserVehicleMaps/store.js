import { defineStore } from "pinia"
import { ref } from "vue"

export const useUserVehicleMapsstore = defineStore("UserVehicleMapsstore", {
  state: () => ({
		user: ref(),
		vehicle: ref(""),
    jerrors: ref({}),
  }),
  getters: {
    form() {
      return {
				user: this.user,
				vehicle: this.vehicle,
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
