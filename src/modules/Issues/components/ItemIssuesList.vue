<template>
  <div class="h-full flex flex-col bg-primaryBg space-y-1">
    <div
      class="w-full flex justify-around h-24 p-3 rounded bg-white tracking-wide space-x-3"
    >
      <item-issues-summary-report class="flex-grow" :id="id" />

      <div class="bg-secondaryBg py-2 px-3 flex items-center rounded space-x-4">
        <div class="space-y-1 capitalize">
          <div class="text-sm">from</div>
          <base-input type="date" padding="small" />
        </div>
        <div class="-space-y-1 capitalize">
          <div class="text-sm">to</div>
          <base-input type="date" bordered padding="small" />
        </div>
        <base-icon name="calendar-alt" :size="24" />
      </div>
    </div>
    <div class="flex-grow bg-white">
      <data-table
        :showHeader="false"
        :headers="itemIssuesHeaders"
        :api="api.getItemSales"
        :params="[id]"
        :handlers="handlers"
        class="h-full"
      ></data-table>
    </div>
  </div>
</template>

<script setup>
import { itemIssuesHeaders } from "../headers"
import ItemIssuesSummaryReport from "./ItemIssuesSummaryReport.vue"
import api from "../api"
import handlers from "../actionHandlers"
// import {openCreateForm} from "../functions"
import DataTable from "@/components/table/DataTable.vue"
import { useRoute } from "vue-router"

const id = useRoute().params.id
</script>

<style></style>
