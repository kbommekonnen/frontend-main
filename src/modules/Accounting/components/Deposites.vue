<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex space-x-2 h-full w-full">
    <data-table
      title="Deposites"
      ref="depositesTable"
      :showHeader="true"
      :headers="headers"
      :api="api.getDeposites"
      :searchApi="api.getAllTransactions"
      :handlers="actionHandlers"
      letCreate
      :createHandler="openCreateForm"
      class="flex-grow bg-white h-full"
    >
      <template #gl="{ value }">
        <router-link
          :to="`/account/detail/${value._id}`"
          class="space-y-0 text-textDark"
        >
          <div class="text-lg text-textDark">
            {{ value.name }}
          </div>
          <div class="flex space-x-4 items-center">
            <div>{{ value.code }}</div>
            <div
              class="bg-opacity-10 px-3 lowercase tracking-wide"
              :class="{
                'bg-primary text-primary': value.side == 'Credit',
                'bg-orange text-orange': value.side == 'Debit',
              }"
            >
              {{ value.side }}
            </div>
          </div>
        </router-link>
      </template>
      <template #credit="{ value }">
        <div class="text-xl font-semibold">{{ formateNumber(value) }}</div>
      </template>
      <template #mobile="{ item }">
        <router-link :to="`/accounts/${item._id}`">
          <mobile-account-card :account="item" />
        </router-link>
      </template>
    </data-table>
    <component
      v-if="sideComponent"
      :is="sideComponent"
      @close="sideComponent = null"
      v-bind="props"
      class="bg-white"
    />
  </div>
</template>

<script setup>
import { DepositeHeaders } from "../headers"
import api from "../api"
// import handlers from "../actionHandlers"
import DataTable from "@/components/table/DataTable.vue"
import MobileAccountCard from "./mobile-view/MobileAccountCard.vue"
import NewDepositeForm from "./NewDepositeForm.vue"
import EditDepositeForm from "./EditDepositeForm.vue"
import { computed, nextTick, onMounted, ref } from "vue"

import { useElementSize } from "@vueuse/core"
import { formateNumber } from "../../../utils"
const depositesTable = ref()
const { width } = useElementSize(depositesTable)
const visibleHeadersCount = computed(() => Math.floor(width.value / 180))

const actionHandlers = ref([
  {
    label: "edit",
    icon: "edit",
    function: openEditForm,
    fullParam: true,
    shown: true,
  },
])
const sideComponent = ref()
const props = ref({}) // props bind to edit component

let headers = computed(() => {
  if (sideComponent.value)
    return DepositeHeaders.slice(0, visibleHeadersCount.value || 5)
  else return DepositeHeaders
})

onMounted(() => {
  // actionHandlers.value[1].function = openEditForm
})

function openCreateForm() {
  sideComponent.value = NewDepositeForm
}

function openEditForm({ _id, gl, credit: amount, reason }) {
  sideComponent.value = ""
  props.value = { _id, account: gl._id, amount, reason }
  nextTick(() => {
    // props.value = {}
    sideComponent.value = EditDepositeForm
  })
}
</script>

<style></style>
