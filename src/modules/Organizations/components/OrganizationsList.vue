<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="h-full shadow-top">
    <data-table
      title="organizations"
      :showHeader="true"
      :headers="organizationHeaders"
      :api="getOrganizations"
      :handlers="handlers"
      class="h-full"
    ></data-table>
  </div>
</template>

<script setup>
import { organizationHeaders } from "../headers"
import { getOrganizations } from "../api"
import handlers from "../actionHandlers"
import DataTable from "@/components/table/DataTable.vue"
</script>

<style></style>
