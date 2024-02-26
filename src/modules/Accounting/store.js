import { defineStore } from "pinia"
import { ref } from "vue"
export const useAccountstore = defineStore("Accountstore", {
  state: () => ({
    name: ref(""),
    code: ref(""),
    side: ref("Credit"),
    isSubAccount: ref(false),
    parent: ref(""),

    jerrors: ref({}),
  }),
  getters: {
    form() {
      return {
        name: this.name,
        code: this.code,
        side: this.side,
        isSubAccount: this.isSubAccount,
        parent: this.parent
        // this.isSubAccount ? ...{parent: this.parent} : null,
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
export const useAccountPreferencesStore = defineStore("AccountPreferencesstore", {
  state: () => ({
    cashOnHandAccount: ref(""),
    defaultSellAccount: ref(""),
    defaultPurchaseAccount: ref(""),

    jerrors: ref({}),
  }),
  getters: {
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
