<template>
  <div
    class="flex flex-row-reverse w-full h-full space-x-1 transparent shadow-inner"
  >
    <PerfectScrollbar class="flex-grow h-full bg-white">
      <router-view class="shadow-top h-full"></router-view>
    </PerfectScrollbar>
    <left-nav
      title="inventory"
      :navs="formatedNavs"
      :active="activeNav"
      class="h-full flex-grow-0"
    />
  </div>
</template>

<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
import { PerfectScrollbar } from "vue3-perfect-scrollbar"
import LeftNav from "../../../components/app/Navs/LeftNav.vue"
import { usePreferencesStore } from "../../Settings/store"
const store = usePreferencesStore()
const navs = [
  {
    label: "items",
    to: "items",
    icon: "user-alt",
  },
  {
    label: "composites",
    to: "composites",
    icon: "map-marker-alt",
    filter: () => store.supportsItemComposites,
  },
  {
    label: "item groups",
    to: "item-groups",
    icon: "map-marker-alt",
    filter: () => store.supportsItemGroup,
  },
  {
    label: "categories",
    to: "item-categories",
    icon: "book-open",
    filter: () => store.supportsItemCategory,
  },
  // {
  //   label: "brands",
  //   to: "brands",
  //   icon: "star",
  // },
  {
    label: "transfers",
    to: "transfers",
    icon: "exchange-alt",
  },
  {
    label: "adjustments",
    to: "adjustments",
    icon: "balance-scale",
  },
  {
    label: "import items",
    to: "items/bulk-import",
    icon: "user-alt",
  },

]
const formatedNavs = computed(() =>
  navs.map((nav) => ({ ...nav, to: "/inventory/" + nav.to })),
)
const activeNav = computed(() => "/inventory/" + useRoute().path.split("/")[2])
</script>

<style></style>
