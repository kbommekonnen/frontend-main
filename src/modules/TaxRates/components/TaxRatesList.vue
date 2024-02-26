<template>
  <div class="h-full">
    <data-table
      title="tax rates"
      :showHeader="true"
      :headers="taxsHeaders"
      :api="api.getAll"
      :handlers="handlers"
      letCreate
      :createHandler="openCreateForm"
      class="h-full"
    ></data-table>
  </div>
</template>

<script setup>
import { taxsHeaders } from "../headers"
import api from "../api"
import handlers from "../actionHandlers"
import { openCreateForm } from "../functions"
import DataTable from "@/components/table/DataTable.vue"
</script>

<style></style>
