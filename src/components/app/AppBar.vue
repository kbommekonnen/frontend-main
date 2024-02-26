<template>
  <div class="app-bar shadow">
    <div class="flex space-x-3 items-center">
      <logo class="flex-shrink-0"></logo>
      <div
        v-if="activeNavLabel"
        class="text-primary text-2xl capitalize visible-sm"
      >
        {{ activeNavLabel.label }}
      </div>
    </div>
    <div
      class="navigations flex-grow"
      :class="{
        'flex justify-start visible-sm': navOpened,
        'hidden-sm': !navOpened,
      }"
    >
      <div class="px-4 py-2 w-full visible-sm" @click="toggleNavBar">
        <base-icon name="times" :size="32" class="" />
      </div>
      <template v-for="nav in navs" :key="nav.to">
        <router-link :to="nav.to" @click="toggleNavBar">
          <div
            class="nav-item"
            :class="{
              active: nav.to == activeNav,
            }"
          >
            {{ $t(nav.label) }}
            <div
              class="w-4 h-1 -mt-1 rounded relative"
              :class="{
                'bg-white sm:bg-primary active': nav.to == activeNav,
                'bg-transparent': nav.to != activeNav,
              }"
            ></div>
          </div>
        </router-link>
      </template>
      <div class="flex flex-col space-y-3 items-center visible-sm">
        <lang-converter class="py-2" />
        <switch-warehouse v-if="supportsMultipleWarehouses" />
        <user-profile-tippy class=""></user-profile-tippy>
      </div>
    </div>
    <div class="flex md:space-x-3 items-center hidden-sm">
      <lang-converter class="py-2" />
      <switch-warehouse v-if="supportsMultipleWarehouses" />
      <user-profile-tippy class=""></user-profile-tippy>
    </div>
    <div class="flex items-center justify-center h-full">
      <base-icon
        name="bars"
        :size="24"
        class="visible-sm cursor-pointer"
        :class="{ hidden: navOpened }"
        @click="toggleNavBar"
      />
    </div>
  </div>
</template>

<script setup>
import logo from "@/assets/Logo.vue"
import { computed, ref, toRefs, watch } from "vue"
import { useRoute } from "vue-router"
import SwitchWarehouse from "../../modules/Warehouses/components/SwitchWarehouse.vue"
import UserProfileTippy from "../tippy/UserProfileTippy.vue"
import LangConverter from "./LangConverter.vue"
import BaseIcon from "../base/BaseIcon.vue"
import { usePreferencesStore } from "../../modules/Settings/store"
const { supportsMultipleWarehouses, supportsAccount } = toRefs(
  usePreferencesStore(),
)
let navs = ref([
  {
    label: "dashboard",
    to: "/",
  },
  {
    label: "inventory",
    to: "/inventory",
  },
  {
    label: "purchases",
    to: "/purchase",
  },
  {
    label: "sales",
    to: "/sell",
  },
  {
    label: "reports",
    to: "/reports",
  },
  {
    label: "settings",
    to: "/settings",
  },
  {
    label: "distribution",
    to: "/distribution",
  },
])

// toggle accounts module
watch(
  () => supportsAccount.value,
  () => {
    if (supportsAccount.value) {
      navs.value.splice(4, 0, { label: "accounts", to: "/account" })
    } else {
      const index = navs.value.findIndex(({label}) => label== "accounts")
      if(index > -1) {
        navs.value.splice(index, 1)
      }
    }
  },
  { immediate: true },
)

const activeNav = computed(() => "/" + useRoute().path.split("/")[2])
const activeNavLabel = computed(() =>
  navs.value.find(({ to }) => to == (activeNav.value || "/")),
)
let navOpened = ref(false)
function toggleNavBar() {
  navOpened.value = !navOpened.value
}
</script>

<style>
.navigations {
  /* @apply items-center space-x-2 tracking-wider text-2xl uppercase text-white; */
}
.nav-item {
  @apply space-y-2 capitalize text-sm px-4 flex-shrink-0 text-textDark cursor-pointer;
}
.nav-item:hover {
  @apply text-primary;
}
.nav-item.active {
  @apply text-primary font-medium;
}
.app-bar {
  @apply flex space-x-3 bg-white py-1 lg:py-3 px-4 items-center relative;
}
@media (max-width: 640px) {
  .app-bar {
    @apply relative items-start justify-between;
  }
  .hidden-sm {
    @apply hidden;
  }
  .navigations {
    @apply absolute top-0 w-full bg-white shadow-lg flex-col items-start space-y-2 p-3;
  }

  .nav-item {
    @apply text-xl;
  }
  .nav-item:hover {
    @apply font-semibold text-primary;
  }
  .nav-item.active {
    @apply text-white;
  }
}
@media (min-width: 640px) {
  .visible-sm {
    @apply hidden;
  }
  .navigations {
    @apply flex justify-start items-center space-x-2 tracking-wider text-2xl uppercase text-white;
  }
}
</style>
