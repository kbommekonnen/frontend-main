<template>
  <div class="h-full">
    <data-table
      title="Item Categories"
      :showHeader="true"
      :headers="ItemCategoriesHeaders"
      :api="api.getAll"
      :handlers="handlers"
      letCreate
      :createHandler="openCreateForm"
      class="h-full"
    ></data-table>
  </div>
</template>

<script setup>
import { ItemCategoriesHeaders } from "../headers"
import api from "../api"
import handlers from "../actionHandlers"
import { openCreateForm } from "../functions"
import DataTable from "@/components/table/DataTable.vue"
</script>

<style></style>
