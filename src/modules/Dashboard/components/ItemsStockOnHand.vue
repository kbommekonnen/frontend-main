<template>
  <div class="items-on-stock flex-shrink-0 capitalize bg-white p-4">
    <div class="text-lg tracking-wider border-b-2 border-primaryBg py-2">
      {{ $t("items on stock") }}
    </div>
    <data-table
      :showHeader="false"
      :headers="headers"
      :api="activeApi"
      :pageSize="4"
      class="h-full bg-white"
    >
      <template #item="{ item }">
        <router-link
          v-if="item.item"
          class="cursor-pointer"
          :to="`/inventory/items/${item.item._id}`"
          >{{ item.item.name }}</router-link
        >
      </template>
    </data-table>
  </div>
</template>

<script setup>
import DataTable from "@/components/table/DataTable.vue"
import { toRefs } from "vue"
import { usePreferencesStore } from "../../Settings/store"
import { useActiveWarehouseStore } from "../../Warehouses/store"
const activeWarehouseStore = useActiveWarehouseStore()
const { supportsMultipleWarehouses } = toRefs(usePreferencesStore())
import api from "../api"
const headers = [
  { label: "item", key: "item" },
  { label: "available", key: "quantity" },
]
const activeApi =
  supportsMultipleWarehouses.value && activeWarehouseStore.active
    ? api.getStoreStockOnHand
    : api.getOrganizationStockOnHand
</script>

<style scoped>
.items-on-stock {
  min-width: 25%;
}
</style>
