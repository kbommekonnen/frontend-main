<template>
  <div class="h-full">
    <data-table
      title="payment modes"
      :showHeader="true"
      :headers="unitsHeaders"
      :api="api.getAll"
      :handlers="handlers"
      letCreate
      :createHandler="openCreateForm"
      class="h-full bg-white"
    >
      <template #isDefault="{ value, item }">
        <div v-if="value">
          <base-icon name="star" class="text-primary" />
        </div>
        <div v-else>
          <base-button
            icon="star"
            label="make default"
            @click="changeDefault(item._id)"
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
import { openToast } from "../../../plugins/toast"

const putRequest = inject("putRequest")
function changeDefault(id) {
  putRequest({ ...api.changeDefault, params: [id] }).then(({ error }) => {
    if (!error) openToast("Default payment mode changed")
  })
}
</script>

<style></style>
