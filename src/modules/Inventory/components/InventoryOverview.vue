<template>
  <div class="flex flex-col space-y-1 p-4">
    <div class="flex p-2">
      <div class="light-title">{{ $t("all items") }}</div>
    </div>
    <div
      class="flex-grow space-y-1 sm:grid sm:space-y-0 grid-cols-2 gap-1 bg-primaryBg p-1"
    >
      <div
        v-for="(nav, i) in navs"
        :key="i"
        class="text-center space-y-2 p-4 bg-white"
        :class="{
          'opacity-75': !nav.active,
        }"
      >
        <div class="light-title capitalize">{{ $t(nav.title) }}</div>
        <div class="flex justify-center space-x-4 items-center">
          <div class="text-3xl tracking-widest">
            {{ formateNumber(nav.count) }}
          </div>
          <div class=""><base-icon :name="nav.icon" :size="32" /></div>
        </div>
        <div class="text-sm">{{ $t(nav.description) }}</div>
        <div class="flex justify-center capitalize">
          <base-button
            :label="nav.createLabel"
            @click="nav.createHandler"
            :disabled="!nav.active"
            icon="plus"
            class="capitalize"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { openCreateForm as createItemGroup } from "../../ItemGroups/functions.js"
import { openCreateForm as createCompositeItem } from "../../Composites/functions.js"
import { openCreateForm as createItem } from "../../Items/functions.js"
import { openCreateForm as createItemCategory } from "../../ItemCategory/functions.js"
import { formateNumber } from "../../../utils"
import api from "../api"
import { computed, inject, ref, toRefs } from "vue"
import { usePreferencesStore } from "../../Settings/store.js"
const { supportsItemComposites, supportsItemGroup, supportsItemCategory } =
  toRefs(usePreferencesStore())
const getRequest = inject("getRequest")

getRequest(api.getItemCounts).then(({ item }) => {
  if (item) {
    const reports = [
      item.itemGroups,
      item.items,
      item.compositeItems,
      item.itemCategories,
    ]
    navs.value = navs.value.map((nav, i) => {
      nav.count = reports[i]
      return nav
    })
  }
})

let navs = ref([
  {
    title: "item groups",
    count: 0,
    icon: "book-open",
    description: "create multiple variants of the same  item using item groups",
    createLabel: "new item group",
    createHandler: createItemGroup,
    active: computed(() => supportsItemGroup.value),
  },
  {
    title: "items",
    count: 0,
    icon: "user",
    description: "create standalone items that you buy and sell",
    createLabel: "new item",
    createHandler: createItem,
    active: true,
  },
  {
    title: "composite items",
    count: 0,
    icon: "",
    description: "bundle different items together and sell them as kits",
    createLabel: "new composite item",
    createHandler: createCompositeItem,
    active: computed(() => supportsItemComposites.value),
  },
  {
    title: "item categories",
    count: 0,
    icon: "",
    description: "group multiple items that belongs to one category",
    createLabel: "new item category",
    createHandler: createItemCategory,
    active: computed(() => supportsItemCategory.value),
  },
])
</script>

<style scoped></style>
