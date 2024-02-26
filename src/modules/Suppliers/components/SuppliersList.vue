<template>
  <div class="h-full">
    <data-table
      title="Suppliers"
      :showHeader="true"
      :headers="headers"
      :api="api.getAll"
      :handlers="handlers"
      letCreate
      :createHandler="() => $router.push({ name: 'NewSupplierForm' })"
      class="h-full bg-white"
    >
    </data-table>
  </div>
</template>

<script setup>
import { headers } from "../headers"
import api from "../api"
import handlers from "../actionHandlers"
import DataTable from "@/components/table/DataTable.vue"
</script>

<style></style>
