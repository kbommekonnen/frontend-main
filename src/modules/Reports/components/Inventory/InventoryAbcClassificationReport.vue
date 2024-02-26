<template>
  <div class="flex flex-col space-y-0.5 bg-primaryBg">
    <div class="flex-grow bg-white">
      <reports-table
        title="inventory abc classication report"
        :api="api"
        :query="query"
        :headers="headers"
        class="w-full h-full"
      >
        <!-- advanced filter  -->
        <template #advanced-filter>
          <div class="flex space-x-4 capitalize">
            <base-select
              v-model="queryForm.warehouse"
              label="warehouse"
              :items="[]"
              padding="small"
            />
            <base-select
              v-model="queryForm.item"
              label="item"
              :items="[]"
              padding="small"
            />
            <base-select
              v-model="queryForm.category"
              label="item category"
              :items="[]"
              padding="small"
            />
          </div> </template
      ></reports-table>
    </div>
  </div>
</template>

<script setup>
import ReportsTable from "../ReportsTable.vue"
import { inventoryAbcClassicationReport as headers } from "../../headers/inventoryReportHeaders"
import reportsApi from "../../api"
import { ref } from "vue"

let api = ref(reportsApi.getInventoryAbcClassificationReport)
let query = ref({})
let queryForm = ref({
  warehouse: "",
  item: "",
  category: "",
})
</script>

<style></style>
