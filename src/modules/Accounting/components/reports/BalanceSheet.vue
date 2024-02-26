<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex space-x-2 h-full w-full">
    <data-table
      title="Deposites"
      ref="depositesTable"
      :showHeader="true"
      :headers="headers"
      :api="api.getAll"
      :searchApi="api.search"
      :handlers="actionHandlers"
      letCreate
      :createHandler="openCreateForm"
      class="flex-grow bg-white h-full"
    >
      <template #name="{ item, value }">
        <router-link :to="`/accounts/${item._id}`" class="text-textDark">{{
          value
        }}</router-link>
      </template>
      <template #mobile="{ item }">
        <router-link :to="`/accounts/${item._id}`">
          <mobile-account-card :account="item" />
        </router-link>
      </template>
    </data-table>
    <component
      :is="sideComponent"
      @close="sideComponent = null"
      v-bind="props"
      class="bg-white"
    />
  </div>
</template>

<script setup>
import api from "../../api"
import DataTable from "@/components/table/DataTable.vue"
import MobileAccountCard from "../mobile-view/MobileAccountCard.vue"
import { ref } from "vue"
const headers = ref([])
</script>

<style></style>
