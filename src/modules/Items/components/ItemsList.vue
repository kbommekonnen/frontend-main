<template>
  <div class="h-full">
    <data-table
      title="Items"
      :showHeader="true"
      :headers="ItemsHeaders"
      :api="api.search"
      :searchApi="api.search"
      :handlers="handlers"
      letCreate
      :createHandler="openCreateForm"
      class="h-full"
    >
      <template #name="{ item, value }">
        <router-link :to="getItemDetailRoutePath(item._id)">{{
          value
        }}</router-link>
      </template>
      <template #mobile="{ item }">
        <router-link :to="getItemDetailRoutePath(item._id)">
          <mobile-item-card :item="item"/>
        </router-link>
      </template>
    </data-table>
  </div>
</template>

<script setup>
import { ItemsHeaders } from "../headers"
import api from "../api"
import handlers from "../actionHandlers"
import { openCreateForm } from "../functions"
import DataTable from "@/components/table/DataTable.vue"
import MobileItemCard from "./mobile-view/MobileItemCard.vue"
function getItemDetailRoutePath(id) {
  return `/inventory/items/${id}`
}
</script>

<style></style>
