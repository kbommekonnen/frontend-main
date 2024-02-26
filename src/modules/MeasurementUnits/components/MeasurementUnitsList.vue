<template>
  <div class="h-full">
    <data-table
      title="measurement units"
      :showHeader="true"
      :headers="unitsHeaders"
      :api="api.getAll"
      :handlers="handlers"
      letCreate
      :createHandler="openCreateForm"
      class="h-full"
    >
      <template #isPrimary="{ value, item }">
        <div v-if="value">
          <base-icon name="star" class="text-primary" />
        </div>
        <div v-else>
          <base-button
            icon="star"
            label="make primary"
            @click="makePrimaryUnit(item._id)"
          />
        </div>
      </template>
    </data-table>
  </div>
</template>

<script setup>
import { unitsHeaders } from "../headers"
import api from "../api"
import handlers from "../actionHandlers"
import { openCreateForm } from "../functions"
import DataTable from "@/components/table/DataTable.vue"
import { inject } from "vue"

const putRequest = inject("putRequest")
function makePrimaryUnit(id) {
  console.log(id)
  putRequest({ ...api.edit, params: [id], data: { isPrimary: true } }).then(
    ({ error }) => {
      if (!error) console.log("refresh")
    },
  )
}
</script>

<style></style>
