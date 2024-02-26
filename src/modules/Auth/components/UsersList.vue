<template>
  <div class="h-full">
    <data-table
      title="users"
      :showHeader="false"
      :headers="usersHeaders"
      :api="api.getAll"
      :handlers="handlers"
      letCreate
      createLabel="create user"
      :createHandler="openCreateForm"
      class="h-full"
    >
    </data-table>
  </div>
</template>

<script setup>
import { usersHeaders } from "../headers"
import api from "../api"
import handlers from "../actionHandlers"
import { useRouter } from "vue-router"
// import {openCreateForm} from "../functions"
import DataTable from "@/components/table/DataTable.vue"

const router = useRouter()

function openCreateForm() {
  router.push({ name: "NewUserForm" })
}
</script>

<style></style>
