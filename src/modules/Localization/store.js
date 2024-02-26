import { defineStore } from "pinia"
import { ref } from "vue"

export const useLocalizationStore = defineStore("localizationStore", {
  state: () => ({
    key: ref(""),
    en: ref(""),
    tg: ref(""),
    jerrors: ref({}),
  }),
  getters: {
    form() {
      return {
        key: this.key,
        en: this.en,
        tg: this.tg,
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
