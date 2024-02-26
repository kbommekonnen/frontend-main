<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="flex flex-row-reverse w-full h-full space-x-1 transparent shadow-inner"
  >
    <PerfectScrollbar class="flex-grow h-full bg-white">
      <router-view class="shadow-top h-full"></router-view>
    </PerfectScrollbar>
    <left-nav title="" :navs="formatedNavs" class="h-full flex-grow-0" />
  </div>
</template>

<script setup>
import { computed } from "vue"
import { PerfectScrollbar } from "vue3-perfect-scrollbar"
import LeftNav from "../../../components/app/Navs/LeftNav.vue"
import { usePreferencesStore } from "../../Settings/store"
const store = usePreferencesStore()
const navs = [
  {
    label: "Overview",
    to: "",
    icon: "user-alt",
  },
  {
    label: "purchases",
    to: "list",
    icon: "map-marker-alt",
  },
  {
    label: "orders",
    to: "orders",
    icon: "book-open",
  },
  {
    label: "suppliers",
    to: "supplier",
    icon: "user-alt",
    // filter: () => store.registerCustomerInformationOnSell,
  },
]
const formatedNavs = computed(() =>
  navs.map((nav) => ({ ...nav, to: "/purchase/" + nav.to })),
)
</script>

<style></style>
