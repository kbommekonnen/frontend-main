<template>
  <div class="h-full">
    <data-table
      title="Customers"
      :showHeader="true"
      :headers="headers"
      :api="api.getAll"
      :handlers="handlers"
      letCreate
      :createHandler="() => $router.push({ name: 'NewCustomerForm' })"
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
