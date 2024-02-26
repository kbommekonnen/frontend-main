import { defineStore } from "pinia"
import { ref } from "vue"

export const useModuleStore = defineStore("moduleStore", {
  state: () => ({
    moduleName: ref(""),
    moduleCode: ref(""),
    description: ref(""),
    jerrors: ref({}),
  }),
  getters: {
    form() {
      return {
        moduleName: this.moduleName,
        moduleCode: this.moduleCode,
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
