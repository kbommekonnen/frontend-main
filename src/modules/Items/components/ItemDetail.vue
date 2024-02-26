<template>
  <div class="h-full flex flex-col bg-primaryBg space-y-1 overflow-x-hidden">
    <div
      class="flex flex-col lg:flex-row justify-between items-center lg:space-x-3 capitalize shadow-top bg-white p-2 w-full"
    >
      <div class="flex-grow flex space-x-2 items-center h-full overflow-hidden">
        <base-icon
          content="back"
          name="arrow-left"
          class="cursor-pointer"
          @click="router.back"
        />
        <div
          class="flex truncate text-primary text-2xl flex-grow limit-lines limit-lines-1 break-all w-full"
        >
          {{ store.name }}
        </div>
      </div>
      <div class="flex-grow flex justify-start space-x-4 tabs">
        <template v-for="nav in navs" :key="nav.to">
          <router-link :to="nav.to">
            <div
              class="flex space-x-2 items-center rounded-lg px-3 py-1 item-nav"
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
      <!-- <div class="flex space-x-2">
        <base-button
          type="secondary"
          label="print barcode"
          class="flex-shrink-0 capitalize text-ellipsis"
        />
      </div> -->
    </div>
    <Swiper @swipe="onSwipe">
      <div class="flex-grow bg-primaryBg" ref="swiper">
        <router-view></router-view>
      </div>
    </Swiper>
  </div>
</template>

<script setup>
import { computed, inject } from "vue"
import { useRoute, useRouter } from "vue-router"
import api from "../api"
import { useItemstore } from "../store"
import Swiper from "../../../components/app/Swiper.vue"
const getRequest = inject("getRequest")
const route = useRoute()
const itemId = useRoute().params.id
const activeNavIndex = computed(() => {
  console.log(route)
  const activeRoute = route.fullPath
  return navs.findIndex(({ to }) => to == activeRoute)
})
const router = useRouter()
const store = useItemstore()
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
    label: "history",
    icon: "clock",
    to: "history",
  },
  {
    label: "detail",
    icon: "folder-open",
    to: "more",
  },
].map((nav) => ({
  ...nav,
  to: "/inventory/items/" + itemId + (nav.to ? "/" : "") + nav.to,
}))
const activeNav = computed(() => useRoute().path)
function onSwipe(direction) {
  console.log("swipe", activeNavIndex.value, direction)
  if (direction == "left") {
    router.push(navs[activeNavIndex.value + 1].to)
  } else if (direction == "right") {
    router.push(navs[activeNavIndex.value - 1].to)
  }
}
getRequest({ ...api.get, params: [itemId] }).then(({ item }) => {
  if (item) {
    ;[
      "name",
      "sku",
      "description",
      "itemType",
      "category",
      "unit",
      "image",
      "returnable",
      "reorderPoint",
      "manufacturer",
      "brand",
    ].forEach((attribute) => (store[attribute] = item[attribute]))
  }
})
</script>

<style scoped>
.active-nav {
  @apply bg-textMedium text-secondaryBg;
}
.item-nav:hover {
  @apply bg-textMedium text-secondaryBg;
}

@media (max-width: 780px) {
  .tabs {
    @apply pb-6 pt-2  overflow-x-scroll w-full;
  }
  .item-nav {
    /* @apply mb-6; */
  }
}
</style>
