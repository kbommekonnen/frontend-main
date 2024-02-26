<template>
  <div class="w-screen h-screen flex flex-col overflow-hidden">
    <Header class="" />
    <div class="flex-grow w-full h-full overflow-y-auto">
      <router-view class="w-full h-full"></router-view>
    </div>
  </div>
</template>

<script setup>
import Header from "./components/Header.vue"
import { useFavicon } from "@vueuse/core"
const icon = useFavicon()
icon.value = "logo.png"

</script>

<style>
@import "../styles/tailwind.css";
</style>
