<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="space-y-0 bg-primaryBg">
    <div
      class="flex flex-row-reverse h-full w-screen space-x-1 transparent shadow-inner"
    >
      <!-- <reports-nav
        title="Reports"
        :navs="navs"
        @toggle-active="toggleActive"
        :active="active"
      /> -->
      <PerfectScrollbar class="flex-grow h-full w-full bg-white">
        <router-view class="shadow-top w-full h-full"></router-view>
      </PerfectScrollbar>
      <left-nav
        title="Reports"
        :navs="navs"
        @toggle-active="toggleActive"
        :active="active"
      />
    </div>
  </div>
</template>

<script setup>
import { PerfectScrollbar } from "vue3-perfect-scrollbar"
import LeftNav from "@/components/app/Navs/LeftNav.vue"
// import ReportsNav from "./ReportsNav.vue"
import { ref } from "vue"
import { useRouter } from "vue-router"
const navs = [
  {
    label: "inventory",
    to: "/reports/inventory",
    icon: "clock",
    children: [
      {
        label: "inventory summary",
        to: "",
        icon: "",
      },
      {
        label: "inventory valuation summary",
        to: "",
        icon: "",
      },
    ],
  },
  {
    label: "sales",
    to: "/reports/sales",
    icon: "donate",
    children: [
      {
        label: "product sales report",
        to: "/reports/",
        icon: "",
      },
      {
        label: "sales by item",
        to: "/reports/",
        icon: "",
      },
    ],
  },
  {
    label: "purchases",
    to: "/reports/purchases",
    icon: "cart-plus",
    children: [
      {
        label: "product purchases report",
        to: "/reports/",
        icon: "",
      },
      {
        label: "purchases by item",
        to: "/reports/",
        icon: "",
      },
    ],
  },
  {
    label: "transfers",
    to: "/reports/transfers",
    icon: "exchange-alt",
    children: [
      {
        label: "transfers",
        to: "/reports/",
        icon: "",
      },
      {
        label: "transfers by item",
        to: "/reports/",
        icon: "",
      },
    ],
  },
  {
    label: "adjustments",
    to: "/reports/adjustments",
    icon: "balance-scale",
    children: [],
  },
]
const router = useRouter()
let active = ref("inventory")

function toggleActive(to) {
  router.push(to)
}
</script>

<style></style>
