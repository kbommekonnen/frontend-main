import { defineStore } from "pinia"
import { ref } from "vue"

export const useBoardingsstore = defineStore("Boardingsstore", {
  state: () => ({
		route: ref(),
		vehicle: ref(""),
		items: ref(""),
		users: ref(""),
    jerrors: ref({}),
  }),
  getters: {
    form() {
      return {
				route: this.route,
				vehicle: this.vehicle,
				items: this.items,
				users: this.users,
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
