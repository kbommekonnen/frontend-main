<template>
  <div class="flex flex-col space-y-0.5 bg-primaryBg">
    <div class="flex-grow bg-white">
      <reports-table
        title="inventory summary reports"
        :subtitle="`as of from ${formateDate(selectedDate)}`"
        :api="api"
        :query="queryForm"
        :headers="headers"
        class="w-full h-full"
      >
        <template #primaryFilter>
          <div class="flex space-x-3 items-center">
            <base-select
              icon="map-marker-alt"
              class="capitalize"
              placeholder="select warehouse"
              :items="warehouseOptions"
              v-model="queryForm.warehouse"
            />
            <div
              class="flex-grow bg-secondaryBg py-2 px-3 flex items-center rounded space-x-4"
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
        </template>
      </reports-table>
    </div>
  </div>
</template>

<script setup>
import ReportsTable from "../ReportsTable.vue"
import { inventorySummaryReport as headers } from "../../headers/inventoryReportHeaders"
import reportsApi from "../../api"
import { inject, ref } from "vue"
import { formateDate } from "../../../../utils"
import warehouseApi from "../../../Warehouses/api.js"
import { useActiveWarehouseStore } from "../../../Warehouses/store"
const getRequest = inject("getRequest") // inject axios
const selectedDate = Date.now()
let api = ref(reportsApi.getInventorySummaryReport)
let warehouseOptions = ref([])
getRequest(warehouseApi.getMyStores).then(({ items }) => {
  if (items) {
    warehouseOptions.value = items.map(({ id, name }) => ({
      label: name,
      value: id,
    }))
  }
})
let queryForm = ref({
  warehouse: useActiveWarehouseStore().active,
})
</script>

<style></style>
