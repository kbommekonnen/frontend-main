<template>
  <div class="flex space-x-2 h-full w-full">
    <data-table
      title="Accounts"
      ref="accountsTable"
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
        <router-link :to="`/account/detail/${item._id}`" class="text-textDark">{{
          value
        }}</router-link>
      </template>
      <template #mobile="{ item }">
        <router-link :to="`/account/detail/${item._id}`">
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
import { AccountsHeaders } from "../headers"
import api from "../api"
import handlers from "../actionHandlers"
import DataTable from "@/components/table/DataTable.vue"
import MobileAccountCard from "./mobile-view/MobileAccountCard.vue"
import NewAccountForm from "./NewAccountForm.vue"
import EditAccountForm from "./EditAccountForm.vue"
import { computed, nextTick, onMounted, ref } from "vue"

import { useElementSize } from "@vueuse/core"
const accountsTable = ref()
const { width } = useElementSize(accountsTable)
const visibleHeadersCount = computed(() => Math.floor(width.value / 180))

const actionHandlers = ref(handlers)
const sideComponent = ref()
const props = ref({}) // props bind to edit component

let headers = computed(() => {
  if (sideComponent.value)
    return AccountsHeaders.slice(0, visibleHeadersCount.value || 5)
  else return AccountsHeaders
})

onMounted(() => {
  actionHandlers.value[1].function = openEditForm
})

function openCreateForm() {
  sideComponent.value = NewAccountForm
}

function openEditForm(account) {
  props.value = { account }
  sideComponent.value = EditAccountForm
  nextTick(() => (props.value = {}))
}
</script>

<style></style>
