// import termService from "../../services/userService";
import { userService } from "../../services/userService"
import { defineStore } from "pinia"
import { ref } from "vue"
import { tokenService, userInfoService } from "../../services/storageService"
import { setHeaderAuthToken } from "../../plugins/axios"

export default defineStore("userStore", {
  state: () => ({
    isLoading: ref(false),
    user: ref(""),
    error: ref(""),
  }),
  actions: {
    setUser(_user) {
      this.user = _user
    },
    async signin(user, access_token) {
      try {
        if (access_token) {
          tokenService.saveToken(access_token)
          setHeaderAuthToken(access_token)
        }
        this.setUser(user)
        userInfoService.saveUser(user)
        return true
      } catch (e) {
        this.error = { code: e.errorCode, message: e.message }
        return false
      }
    },
    async logout() {
      try {
        this.user = ""
        userService.logout()
        return true
      } catch (e) {
        return false
      }
    },
  },
})
