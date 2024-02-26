<template>
  <transition appear>
    <printer v-if="false" class="w-screen h-screen"></printer>
    <div
      v-else
      class="font-sans flex flex-col h-screen w-screen bg-primaryBg text-textMedium overflow-auto"
    >
      <div v-if="userStore.isLoading">Loading...</div>
      <protected v-else-if="userStore.user"></protected>
      <open v-else></open>
      <dynamic-modal />
      <!-- <socket /> -->
      <Toast />
      <keyboard-shortcuts/>
      <!-- <utils /> -->
    </div>
  </transition>
</template>
<script setup>

import { useUserStore } from "@/stores"
import Protected from "./views/Protected.vue"
import Open from "./views/Open.vue"
import { userInfoService } from "./services/storageService"
import DynamicModal from "./components/app/DynamicModal.vue"
import { onMounted, watch } from "vue"
import Toast from "./components/app/Toast.vue"
import KeyboardShortcuts from "./components/app/KeyboardShortcuts.vue"
// import setFavicon from "favicon-setter"
// setFavicon("./assets/logo.png")
// import { useRouter } from "vue-router"

import { useFavicon } from "@vueuse/core"
const icon = useFavicon()
icon.value = "logo.png"


const userStore = useUserStore()
onMounted(() => {
  const user = userInfoService.getUser()
  if (user) {
    userStore.setUser(user)
  }
})
// const router = useRouter()
watch(
  () => userStore.user,
  () => {
    console.log("user changed")
    // router.push("/")
  },
  {
    immediate: false,
  },
)
</script>
