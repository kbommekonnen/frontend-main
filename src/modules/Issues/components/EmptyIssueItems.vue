<template>
  <div class="h-full flex flex-col space-y-1">
    <div class="flex-growflex flex-col bg-white">
      <div class="light-title text-xl capitalize tracking-wider px-4">
        {{ $t("Empty Issue") }}
      </div>
      <data-table
        :headers="emptyIssueItemsHeaders"
        :api="api.getEmptyItemsIssue"
        :query="query"
        class=""
      ></data-table>
    </div>
  </div>
</template>

<script setup>
import { emptyIssueItemsHeaders } from "../headers"
import api from "../api"
import DataTable from "@/components/table/DataTable.vue"
import { computed } from "vue"

const props = defineProps({
  issueNumber: { type: String, default: () => "" },
})
const query = computed(() => ({ issueNumber: props.issueNumber }))
</script>

<style></style>
