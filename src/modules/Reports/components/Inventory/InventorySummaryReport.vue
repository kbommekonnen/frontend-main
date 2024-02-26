<template>
  <div class="flex flex-col space-y-0.5 bg-primaryBg">
    <div class="flex-grow bg-white">
      <reports-table
        title="inventory summary report"
        :subtitle="`as of date ${formateDate(selectedDate)}`"
        :api="api"
        :query="queryForm"
        :headers="headers"
        class="w-full h-full"
      >
        <template #primaryFilter>
          <div class="flex space-x-3 items-end">
            <base-select
              icon="map-marker-alt"
              class="capitalize"
              placeholder="select warehouse"
              :items="warehouseOptions"
              v-model="queryForm.warehouse"
            />
            <div
              class="flex-grow bg-secondaryBg pt-2 px-3 flex items-center rounded space-x-4"
            >
              <div class="-space-y-1 capitalize">
                <div class="text-xs">from</div>
                <base-input
                  type="date"
                  v-model="fromDate"
                  :max="formateDate(today(), 'YYYY-MM-DD')"
                  padding="small"
                  :bordered="false"
                >
                  <template #suffix>
                    <div class="self-center pr-1 h-full bg-primaryBg rounded">
                      <base-icon
                        icon="times-circle"
                        class="base-btn text-textLight"
                      />
                    </div>
                  </template>
                </base-input>
              </div>
              <div class="-space-y-1 capitalize">
                <div class="text-xs">to</div>
                <base-input
                  type="date"
                  v-model="toDate"
                  :max="formateDate(today(), 'YYYY-MM-DD')"
                  bordered
                  padding="small"
                />
              </div>
              <!-- <base-icon name="calendar-alt" :size="24" /> -->
            </div>
          </div>
        </template>
      </reports-table>
    </div>
  </div>
</template>

<script setup>
import ReportsTable from "../ReportsTable.vue"
import { inventoryTransactionReport as headers } from "../../headers/inventoryReportHeaders"
import reportsApi from "../../api"
import { computed, inject, ref } from "vue"
import { formateDate, today } from "../../../../utils"
import warehouseApi from "../../../Warehouses/api.js"
import { useActiveWarehouseStore } from "../../../Warehouses/store"
const getRequest = inject("getRequest") // inject axios
const selectedDate = Date.now()
let api = ref(reportsApi.getInventorySummaryReport)
let warehouseOptions = ref([])
let fromDate = ref(formateDate(today().subtract(1, "days"), "YYYY-MM-DD"))
let toDate = ref(formateDate(today(), "YYYY-MM-DD"))

getRequest(warehouseApi.getMyStores).then(({ items }) => {
  if (items) {
    warehouseOptions.value = items.map(({ id, name }) => ({
      label: name,
      value: id,
    }))
  }
})
let queryForm = computed(() => ({
  store: useActiveWarehouseStore().active,
  // from: fromDate.value,
  // to: toDate.value,
}))
</script>

<style></style>
