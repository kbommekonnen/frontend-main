<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="flex flex-row-reverse w-full h-full space-x-1 transparent shadow-inner"
  >
    <PerfectScrollbar class="flex-grow h-full bg-white">
      <keep-alive>
        <router-view class="shadow-top h-full"></router-view>
      </keep-alive>
    </PerfectScrollbar>
    <left-nav
      title="accounting"
      :navs="formatedNavs"
      :active="activeNav"
      class="h-full flex-grow-0 text-lg tracking-wide leading-relaxed"
    />
  </div>
</template>

<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
import { PerfectScrollbar } from "vue3-perfect-scrollbar"
import LeftNav from "@/components/app/Navs/LeftNav.vue"
const navs = [
  {
    label: "dashboard",
    to: "dashboard",
    icon: "chart-column",
  },
  {
    label: "accounts",
    to: "coa",
    icon: "chart-simple",
  },
  {
    label: "deposites",
    to: "deposites",
    icon: "cart-shopping",
  },
  {
    label: "withdrows",
    to: "withdrows",
    icon: "right-from-bracket",
  },
  {
    label: "transfers",
    to: "transfers",
    icon: "money-bill-transfer",
  },
  {
    label: "adjustments",
    to: "adjustments",
    icon: "balance-scale",
  },
  {
    label: "report",
    to: "report",
    icon: "money-bill-trend-up",
  },
  {
    label: "balance sheet",
    to: "report/balance-sheet",
    icon: "money-bill-trend-up",
  },
  {
    label: "trial balance",
    to: "report/trial-balance",
    icon: "cogs",
  },

  {
    label: "preferences",
    to: "preference",
    icon: "cogs",
  },
]
const formatedNavs = computed(() =>
  navs.map((nav) => ({ ...nav, to: "/account/" + nav.to })),
)
const activeNav = computed(() => "/account/" + useRoute().path.split("/")[2])
</script>

<style></style>
