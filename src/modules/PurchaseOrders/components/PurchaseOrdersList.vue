<template>
  <div class="h-full">
    <!-- TODO itemized purchase list -->
    <data-table
      title="purchase orders"
      :showHeader="true"
      :headers="purchasesHeaders"
      :api="api.getAll"
      :handlers="handlers"
      letCreate
      createLabel="Order"
      :createHandler="openCreateForm"
      class="h-full"
    >
    <!-- TODO display items as drop down, display max amount item on first view -->
    </data-table>
  </div>
</template>

<script setup>
import { purchasesHeaders } from "../headers"
import api from "../api"
import handlers from "../actionHandlers"
import { useRouter } from "vue-router"
import DataTable from "@/components/table/DataTable.vue"
const router = useRouter()

function openCreateForm() {
  router.push({ name: "NewPurchaseOrderForm" })
}
</script>

<style></style>
