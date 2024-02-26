<template>
  <div class="h-full flex flex-col bg-primaryBg space-y-1">
    <div class="w-full flex h-24 p-3 rounded bg-white tracking-wide space-x-3">
      <div
        class="w-1/5 bg-secondaryBg py-2 px-3 flex items-center rounded space-x-4"
      >
        <base-icon name="user-alt" :size="24" />
        <div class="-space-y-1 capitalize">
          <div class="text-lg">total quantity</div>
          <div class="font-semibold text-2xl tracking-wider">24,000</div>
        </div>
      </div>
      <div
        class="w-1/5 bg-secondaryBg py-2 px-3 flex items-center rounded space-x-4"
      >
        <base-icon name="filter-alt" :size="24" class="flex-shrink-0" />
        <div class="space-y-0 capitalize text-ellipsis">
          <div class="text-lg truncate">sender warehouse</div>
          <base-select
            v-model="sender"
            placeholder="warehouse"
            bordered
            padding="small"
            :items="senderWarehouseOptions"
          />
        </div>
      </div>
      <div
        class="w-1/5 bg-secondaryBg py-2 px-3 flex items-center rounded space-x-4"
      >
        <base-icon name="filter-alt" :size="24" />
        <div class="space-y-0 capitalize">
          <div class="text-lg">receiver warehouse</div>
          <base-select
            v-model="receiver"
            placeholder="warehouse"
            bordered
            padding="small"
            :items="receiverWarehouseOptions"
          />
        </div>
      </div>
      <div
        class="w-2/6 bg-secondaryBg py-2 px-3 flex items-center rounded space-x-4"
      >
        <div class="space-y-1 capitalize">
          <div class="text-sm">from</div>
          <base-input type="date" padding="small" />
        </div>
        <div class="-space-y-1 capitalize">
          <div class="text-sm">to</div>
          <base-input type="date" bordered padding="small" />
        </div>
        <base-icon name="calendar-alt" :size="24" />
      </div>
    </div>
    <div class="flex-grow bg-white">
      <data-table
        :showHeader="false"
        :headers="itemAdjustmentsHeaders"
        :api="api.getItemAdjustments"
        :params="[id]"
        :handlers="handlers"
        class="h-full"
      ></data-table>
    </div>
  </div>
</template>

<script setup>
import { itemAdjustmentsHeaders } from "../headers"
import api from "../api"
import warehouseApi from "../../Warehouses/api"
import handlers from "../actionHandlers"
// import {openCreateForm} from "../functions"
import DataTable from "@/components/table/DataTable.vue"
import { useRoute } from "vue-router"
import { computed, inject, ref } from "vue"
let itemAdjustments = ref("")
let sender = ref("")
let receiver = ref("")
let senderWarehouseOptions = ref([])
let warehouses = ref([])
let receiverWarehouseOptions = computed(() =>
  warehouses.value.filter(({ value }) => value != sender.value),
)
const id = useRoute().params.id
const getRequest = inject("getRequest")

getRequest(warehouseApi.getMyStores).then(({ error, items }) => {
  if (items) {
    senderWarehouseOptions.value = items.map(({ name, id }) => ({
      label: name,
      value: id,
    }))
  }
})
getRequest(warehouseApi.getVerified).then(({ error, items }) => {
  if (items) {
    warehouses.value = items
      .map(({ name, id }) => ({
        label: name,
        value: id,
      }))
      .filter(({ value }) => value != sender.value)
  }
})
getRequest({ ...api.getItemAdjustments, params: { id } }).then(({ items }) => {
  if (items) {
    itemAdjustments.value = items
  }
})
</script>

<style></style>
