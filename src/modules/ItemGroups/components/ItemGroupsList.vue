<template>
  <div class="h-full">
    <data-table
      title="item groups"
      :showHeader="true"
      :headers="ItemGroupsHeaders"
      :api="api.getAll"
      :handlers="handlers"
      letCreate
      :createHandler="openCreateForm"
      class="h-full"
    >
      <template #attributes="{ value }">
        <div class="space-y-1">
          <div
            v-for="{ name, options } in value"
            :key="name"
            class="grid grid-cols-4 gap-2"
          >
            <div class="">{{ name }}</div>
            <div class="flex space-x-2 col-span-3">
              <div
                v-for="item in options"
                :key="item"
                class="bg-primaryBg px-2 rounded"
              >
                {{ item }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </data-table>
  </div>
</template>

<script setup>
import { ItemGroupsHeaders } from "../headers"
import api from "../api"
import handlers from "../actionHandlers"
import { openCreateForm } from "../functions"
import DataTable from "@/components/table/DataTable.vue"
</script>

<style></style>
