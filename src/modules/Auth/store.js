import { defineStore } from "pinia"
import { ref } from "vue"

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    firstName: ref(""),
    lastName: ref(""),
    username: ref(""),
    store: ref([]),
    password: ref(""),
    confirmPassword: ref(""),
    role: ref(""),
    email: ref(""),
    photo: ref(""),
    jerrors: ref({}),
  }),
  getters: {
    form() {
      return {
        fullName: this.firstName + " " + this.lastName,
        username: this.username,
        password: this.password,
        email: this.email,
        store: this.store,
        role: this.role,
        photo: this.photo,
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
