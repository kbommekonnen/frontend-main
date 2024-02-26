<template>
  <div class="flex flex-col h-full max-h-full space-y-1 items-start">
    <div
      class="flex justify-between items-center w-full capitalize text-xl tracking-wider shadow-top bg-white p-3"
    >
      <div class="w-full flex justify-between space-x-2 items-center">
        <div class="flex-grow flex space-x-2 items-center">
          <base-icon
            content="back"
            name="arrow-left"
            class="cursor-pointer"
            @click="goBack"
          />
          <div class="text-textDark">{{ $t("purchase detail") }}</div>
        </div>
        <div class="flex space-x-2 items-center">
          <base-button
            type="secondary"
            label="print invoice"
            icon="file-invoice"
            @click="deleteTransaction"
            disabled
            class="capitalize"
          />
          <base-button
            type="danger"
            label="delete"
            icon="trash"
            @click="deleteTransaction"
            class="capitalize"
          />
        </div>
      </div>
    </div>
    <PerfectScrollbar
      class="flex-grow w-full flex space-x-1 bg-primaryBg overflow-y-scroll"
    >
      <div class="flex flex-col h-full space-y-4 bg-white p-3">
        <div class="space-y-0 bg-secondaryBg p-2">
          <div class="capitalize">{{ $t("invoice number") }}</div>
          <div class="text-lg uppercase">
            {{ transaction.invoiceNumber || transaction.trId }}
          </div>
        </div>
        <div class="space-y-0 bg-secondaryBg p-2">
          <div class="capitalize">{{ $t("warehouse") }}</div>
          <div v-if="transaction.store" class="text-lg uppercase">
            {{ transaction.store.name }}
          </div>
        </div>
        <!-- <div class="space-y-0 bg-secondaryBg p-2">
          <div class="capitalize">{{ $t("supplier") }}</div>
          <div class="text-lg uppercase">{{ transaction.supplier }}</div>
        </div> -->
        <div class="space-y-0 bg-secondaryBg p-2">
          <div class="capitalize">{{ $t("date") }}</div>
          <div class="text-lg">
            {{ formateDate(transaction.createdAt, "MMM DD YYYY hh:mm") }}
          </div>
        </div>
      </div>
      <div class="flex flex-col space-y-6">
        <data-table
        :headers="purchaseDetailHeaders"
        :api="api.getPurchaseItems"
        :params="[id]"
        class="flex-grow bg-white"
      >
        <template #item="{ item }">
          <router-link
            class="cursor-pointer"
            :to="`/inventory/items/${item.item.id}`"
            >{{ item.item.name }}</router-link
          >
        </template>
        <template #amount="{ item }">
          <div>{{ $n(item.quantity * item.rate || 0) }}</div>
        </template>

        <template #footer>
          <div class="w-full flex justify-end space-x-4 p-4 items-center">
            <div class="first-letter:uppercase">{{ $t("total amount") }}</div>
            <div class="text-lg font-semibold">
              {{ $n(transaction.totalAmount || 0) }}
            </div>
          </div>
        </template>
      </data-table>
      <empty-issue-items :issueNumber="transaction.issueNumber" />
      </div>
    </PerfectScrollbar>
  </div>
</template>

<script setup>
import { inject, ref } from "vue"
import api from "../api.js"
import { purchaseDetailHeaders } from "../headers.js"
import { confirmDelete as deleteTransaction } from "../functions.js"
import { useRoute, useRouter } from "vue-router"
import { PerfectScrollbar } from "vue3-perfect-scrollbar"
import DataTable from "@/components/table/DataTable.vue"
import EmptyIssueItems from "../../Issues/components/EmptyIssueItems.vue"
import { formateDate } from "../../../utils"
const getRequest = inject("getRequest") // inject axios

let working = ref(true)
let transaction = ref({})
const router = useRouter()
const id = useRoute().params.id
getRequest({ ...api.get, params: [id] }).then(({ item }) => {
  transaction.value = item
  working.value = false
})
function goBack() {
  router.back()
}
</script>

<style></style>
