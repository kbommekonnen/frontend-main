<template>
  <div class="h-full">
    <data-table
      title="locations"
      :showHeader="true"
      :headers="locationsHeaders"
      :api="api.getAll"
      :handlers="handlers"
      letCreate
      :createHandler="openCreateForm"
      class="h-full"
    >
      <template #address="{ item }">
        <div class="flex space-x-2 items-center">
          <div class="">{{ item.country }}</div>
          <base-icon
            v-if="item.country"
            name="angle-right"
            class="text-textLight"
          />
          <div class="">{{ item.region }}</div>
          <base-icon
            v-if="item.region"
            name="angle-right"
            class="text-textLight"
          />
          <div class="">{{ item.city }}</div>
          <base-icon
            v-if="item.city"
            name="angle-right"
            class="text-textLight"
          />
          <div class="">{{ item.street }}</div>
        </div>
      </template>
    </data-table>
  </div>
</template>

<script setup>
import { locationsHeaders } from "../headers"
import api from "../api"
import handlers from "../actionHandlers"
import { openCreateForm } from "../functions"
import DataTable from "@/components/table/DataTable.vue"
</script>

<style></style>
