<template>
  <div class="flex flex-col space-y-0.5 bg-primaryBg">
    <div class="flex-grow bg-white">
      <reports-table
        ref="report"
        title="inventory valuation summary report"
        :subtitle="`as of date ${formateDate(selectedDate)}`"
        :api="api"
        :query="queryForm"
        :headers="headers"
        class="w-full h-full"
      >
        <template #primaryFilter>
          <div class="">
            <base-select
              icon="map-marker-alt"
              class="capitalize"
              placeholder="select warehouse"
              :items="warehouseOptions"
              v-model="queryForm.warehouse"
            />
          </div>
        </template>
      </reports-table>
      <pre>{{report}}</pre>
    </div>
  </div>
</template>

<script setup>
import ReportsTable from "../ReportsTable.vue"
import { inventoryValuationSummaryReport as headers } from "../../headers/inventoryReportHeaders"
import reportsApi from "../../api"
import { inject, onMounted, ref } from "vue"
import { formateDate } from "../../../../utils"
import warehouseApi from "../../../Warehouses/api.js"
import { useActiveWarehouseStore } from "../../../Warehouses/store"
const getRequest = inject("getRequest") // inject axios
const selectedDate = Date.now()

const report = ref(null)

let api = ref(reportsApi.getInventoryValuationSummaryReport)
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
onMounted(() => {
  console.info(report, report.value.items)
})
</script>

<style></style>
