import { defineStore } from "pinia"
import { ref } from "vue"

export const useActionStore = defineStore("actionStore", {
  state: () => ({
    actionName: ref(""),
    actionCode: ref(""),
    module: ref(""),
    requiredActions: ref([]),
    description: ref(""),
    jerrors: ref({}),
  }),
  getters: {
    form() {
      return {
        actionName: this.actionName,
        actionCode: this.actionCode,
        module: this.module,
        requiredActions: this.requiredActions,
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
// used on users and roles actions grant and revoke previledged actions
export const useGrantAndRevokeActionStore = defineStore(
  "grantAndRevokeActionsStore",
  {
    state: () => ({
      authorizedActions: ref([]),
      authorizedActionIds: ref([]),
      requiredActions: ref([]),
      jerrors: ref({}),
    }),
    getters: {
      form() {
        return {
          authorizedActions: this.authorizedActions,
          authorizedActionIds: this.authorizedActionIds,
          requiredActions: this.requiredActions,
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
  },
)
