<template>
  <div class="flex flex-col-reverse space-y-0 w-screen h-screen max-h-screen">
    <PerfectScrollbar id="container" class="flex-grow">
      <keep-alive>
        <router-view class="w-full h-full"></router-view>
      </keep-alive>
    </PerfectScrollbar>
    <app-bar class="flex-shrink-0"></app-bar>
    <socket />
  </div>
</template>

<script setup>
import { inject } from "vue"
import { PerfectScrollbar } from "vue3-perfect-scrollbar"

import AppBar from "../components/app/AppBar.vue"
import { usePreferencesStore } from "../modules/Settings/store"
import Socket from "../components/app/socket.vue";
const preferencesStore = usePreferencesStore()
const getRequest = inject("getRequest")
getPreferences()
async function getPreferences() {
  const response = await getRequest({
    url: "config/preference/myorg",
  })
  if (response && response.item) {
    preferencesStore.setPreference(response.item)
  }
}
</script>

<style></style>
