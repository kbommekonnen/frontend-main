<template>
  <div class="h-full">
    <data-table
      title="adjustments"
      :showHeader="true"
      :headers="adjustmentsHeaders"
      :api="api.getAll"
      :handlers="handlers"
      letCreate
      createLabel="Adjustment"
      :createHandler="openCreateForm"
      class="h-full"
    >
    </data-table>
  </div>
</template>

<script setup>
import { adjustmentsHeaders } from "../headers"
import api from "../api"
import handlers from "../actionHandlers"
// import {openCreateForm} from "../functions"
import DataTable from "@/components/table/DataTable.vue"

import { useRouter } from "vue-router"
import { formateNumber } from "../../../utils"
const router = useRouter()

function openCreateForm() {
  router.push({ name: "NewAdjustmentForm" })
}
</script>

<style></style>
