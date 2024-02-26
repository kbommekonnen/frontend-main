<template>
  <div class="h-full">
    <data-table
      title="Composites"
      :showHeader="true"
      :headers="CompositesHeaders"
      :api="api.getAll"
      :handlers="handlers"
      letCreate
      :createHandler="openCreateForm"
      class="h-full"
    >
      <template #name="{ composite, value }">
        <router-link :to="getCompositeDetailRoutePath(composite._id)">{{
          value
        }}</router-link>
      </template>
    </data-table>
  </div>
</template>

<script setup>
import { CompositesHeaders } from "../headers"
import api from "../api"
import handlers from "../actionHandlers"
import { openCreateForm } from "../functions"
import DataTable from "@/components/table/DataTable.vue"

function getCompositeDetailRoutePath(id) {
  return `/inventory/composites/${id}`
}
</script>

<style></style>
