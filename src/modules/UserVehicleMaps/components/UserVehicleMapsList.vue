<template>

  <div class="h-full">
    <data-table
      title="UserVehicleMaps"
      :showHeader="true"
      :headers="headers"
      :api="api.getAll"
      :handlers="handlers"
      letCreate
      :createHandler="openCreateForm"
      class="h-full bg-white"
    >
    </data-table>
  </div>
</template>

<script setup>
import { headers } from "../headers"
import api from "../api"
import handlers from "../actionHandlers"
import { openCreateForm } from "../functions"
import DataTable from "@/components/table/DataTable.vue"
import { inject } from "vue"
import { openToast } from "@/plugins/toast"

const putRequest = inject("putRequest")
function changeDefault(id) {
  putRequest({ ...api.changeDefault, params: [id] }).then(({ error }) => {
    if (!error) openToast("Default customer type changed")
  })
}
</script>

<style></style>
