import { defineStore } from "pinia"
import { ref } from "vue"

export const useVehiclesstore = defineStore("Vehiclesstore", {
  state: () => ({
		name: ref(),
		plateNumber: ref(""),
		sideNumber: ref(""),
		type: ref(""),
		availability: ref(""),
    roles: ref([]),
    jerrors: ref({}),
  }),
  getters: {
    form() {
      return {
				name: this.name,
				plateNumber: this.plateNumber,
				sideNumber: this.sideNumber,
				type: this.type,
				availability: this.availability,
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
    addRole() {
      this.roles.push("")
    },
    removeRole(index) {
      this.roles.splice(index, 1)
    }
  },
})
