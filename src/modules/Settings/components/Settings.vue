<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="space-y-0">
    <div class="flex h-full w-screen space-x-1 transparent shadow-inner">
      <left-nav title="settings" :navs="formatedNavs" :active="activeNav" />
      <PerfectScrollbar class="h-full flex-grow bg-white">
        <router-view class="shadow-top w-full h-full"></router-view>
      </PerfectScrollbar>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
import { PerfectScrollbar } from "vue3-perfect-scrollbar"
import { usePreferencesStore } from "../store"
import LeftNav from "../../../components/app/Navs/LeftNav.vue"
const store = usePreferencesStore()
const navs = [
  {
    label: "organization profile",
    to: "organization",
    icon: "user-alt",
  },
  {
    label: "locations",
    to: "locations",
    icon: "map-marker-alt",
    filter: () => store.supportsMultipleLocations,
  },
  {
    label: "warehouses",
    to: "warehouses",
    icon: "map-marker-alt",
    filter: () => store.supportsMultipleWarehouses,
  },
  {
    label: "users & roles",
    to: "auth",
    icon: "users",
  },
  {
    label: "preferences",
    to: "preferences",
    icon: "cogs",
  },
  {
    label: "price list",
    to: "price-lists",
    icon: "hand-holding-usd",
    filter: () => store.supportsPriceList,
  },
  {
    label: "measurement unit",
    to: "measurement-units",
    icon: "balance-scale",
  },
  {
    label: "payment modes",
    to: "payment-modes",
    icon: "money-check-dollar",
  },
  {
    label: "customer types",
    to: "customer-types",
    icon: "user-alt",
    // filter: () => store.hasMultipleCustomerTypes
  },
  {
    label: "frequency",
    to: "frequency",
    icon: "user-alt",
    // filter: () => store.frequency
  },  {
    label: "tax rates",
    to: "tax-rates",
    icon: "percentage",
    filter: () => store.supportsTax,
  },
  {
    label: "localization",
    to: "localization",
    icon: "percentage",
  },
]
const formatedNavs = computed(() =>
  navs.map((nav) => ({ ...nav, to: "/settings/" + nav.to })),
)
const activeNav = computed(() => "/settings/" + useRoute().path.split("/")[2])
</script>

<style></style>
