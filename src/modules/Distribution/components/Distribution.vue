<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="flex flex-row-reverse w-full h-full space-x-1 transparent shadow-inner"
  >
    <PerfectScrollbar class="flex-grow h-full bg-white">
      <router-view class="shadow-top h-full"></router-view>
    </PerfectScrollbar>
    <left-nav
      title="distribution"
      :navs="formatedNavs"
      class="h-full flex-grow-0"
    />
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
    to: "overview",
    icon: "user-alt",
  },
  {
    label: "vehicles",
    to: "vehicles",
    icon: "car",
  },
  {
    label: "routes",
    to: "routes",
    icon: "route",
  },
  {
    label: "vehicle types",
    to: "vehicle-types",
    icon: "car-side",
  },
  {
    label: "rewards",
    to: "reward",
    icon: "award",
  },
  {
    label: "frequency",
    to: "frequency",
    icon: "clock",
  },
  {
    label: "plan",
    to: "plan",
    icon: "map-marker-alt",
  },
  {
    label: "report",
    to: "report",
    icon: "cogs",
  },
]
const formatedNavs = computed(() =>
  navs.map((nav) => ({ ...nav, to: "/distribution/" + nav.to })),
)
</script>

<style></style>
