<template>
  <div class="space-y-0">
    <div class="flex h-full w-full space-x-1 transparent shadow-inner">
      <left-nav title="Settings" :navs="formatedNavs" :active="activeNav" />
      <div class="flex-grow bg-white">
        <div class="h-1 w-full shadow-md -my-1"></div>

        <router-view class="w-full h-full"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import LeftNav from "../../../components/app/Navs/LeftNav.vue"
export default {
  name: "Settings",
  components: { LeftNav },
  data() {
    return {}
  },
  computed: {},
}
</script>

<style></style>
