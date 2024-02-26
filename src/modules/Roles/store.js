import { defineStore } from "pinia"
import { ref } from "vue"

export const useRoleStore = defineStore("roleStore", {
  state: () => ({
    roleName: ref(""),
    description: ref(""),
    jerrors: ref({}),
  }),
  getters: {
    form() {
      return {
        roleName: this.roleName,
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
