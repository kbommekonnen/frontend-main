<template>
  <div class="h-full flex flex-col bg-primaryBg space-y-1">
    <div
      class="flex justify-between composites-center space-x-3 capitalize shadow-top bg-white p-2"
    >
      <div class="flex space-x-2 composites-center">
        <base-icon content="back" name="arrow-left" class="cursor-pointer" />
        <div class="flex truncate text-primary text-2xl">composite name</div>
      </div>
      <div class="flex-grow flex justify-center space-x-4">
        <template v-for="nav in navs" :key="nav.to">
          <router-link :to="nav.to">
            <div
              class="flex composite-nav space-x-2 composites-center rounded-lg px-3 py-1"
              :class="{
                'active-nav': nav.to == activeNav,
                'inactive-nav': nav.to != activeNav,
              }"
            >
              <base-icon :name="nav.icon" class="" />
              <div class="">{{ nav.label }}</div>
            </div>
          </router-link>
        </template>
      </div>
      <div class="flex space-x-2">
        <base-button
          type="secondary"
          label="print barcode"
          class="flex-shrink-0 capitalize text-ellipsis"
        />
      </div>
    </div>
    <div class="flex-grow bg-primaryBg">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"

const navs = [
  {
    label: "overview",
    icon: "clock",
    to: "",
  },
  {
    label: "purchases",
    icon: "cart-plus",
    to: "purchase",
  },
  {
    label: "sales",
    icon: "donate",
    to: "sell",
  },
  {
    label: "transfers",
    icon: "exchange-alt",
    to: "transfer",
  },
  {
    label: "adjustments",
    icon: "balance-scale",
    to: "adjustment",
  },
  {
    label: "detail",
    icon: "folder-open",
    to: "more",
  },
].map((nav) => ({
  ...nav,
  to: "/inventory/composites/" + useRoute().params.id + "/" + nav.to,
}))
const activeNav = computed(() => useRoute().path)
</script>

<style>
.active-nav {
  @apply bg-textMedium text-secondaryBg;
}
.composite-nav:hover {
  @apply bg-textMedium text-secondaryBg;
}
</style>
