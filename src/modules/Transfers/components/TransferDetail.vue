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
          <div class="text-textDark">{{ $t("transfer detail") }}</div>
        </div>
        <div class="flex space-x-2 items-center">
          <base-button
            type="secondary"
            label="print invoince"
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
          <div class="text-lg uppercase">{{ transaction.trId }}</div>
        </div>
        <div class="space-y-0 bg-secondaryBg p-2">
          <div class="capitalize">{{ $t("sender") }}</div>
          <div
            class="flex space-x-4 items-center text-lg uppercase underline underline-offset-2"
          >
            <base-icon name="user" :size="18" />{{
              transaction.rejectedBy || transaction.confirmedBy
            }}
          </div>
          <div v-if="transaction.sourceStore" class="text-lg uppercase">
            {{ transaction.sourceStore.name }}
          </div>
        </div>
        <div class="space-y-0 bg-secondaryBg p-2">
          <div class="capitalize">{{ $t("receiver") }}</div>
          <div
            class="flex space-x-4 items-center text-lg uppercase underline underline-offset-2"
          >
            <base-icon name="user" :size="18" />{{ transaction.registeredBy }}
          </div>
          <div v-if="transaction.destinationStore" class="text-lg uppercase">
            {{ transaction.destinationStore.name }}
          </div>
        </div>
        <div class="space-y-0 bg-secondaryBg p-2">
          <div class="capitalize">{{ $t("date") }}</div>
          <div class="text-lg">{{ formateDate(transaction.createdAt) }}</div>
        </div>
        <div class="space-y-0 bg-secondaryBg p-2 text-center">
          <div
            class="text-lg uppercase text-textLight"
            :style="{
              backgroundColor: getStatusColor(item.status),
            }"
          >
            {{ transaction.status }}
          </div>
        </div>
      </div>
      <data-table
        :headers="transferDetailHeaders"
        :items="transaction.items"
        class="flex-grow"
      >
        <template #amount="{ item }">
          <div>{{ $n(item.quantity * item.rate || 0) }}</div>
        </template>

        <template #footer>
          <div class="flex flex-col items-end center p-4">
            <div class="w-full grid grid-cols-2 gap-4">
              <div class="flex-shrink-0 text-start first-letter:uppercase">
                {{ $t("total items") }}
              </div>
              <div class="text-lg font-semibold">
                {{ $n(transaction.items.length || 0) }}
              </div>
            </div>
            <!-- <div class="w-full grid grid-cols-2 gap-4">
              <div class="flex-shrink-0 first-letter:uppercase">
                {{ $t("total amount") }}
              </div>
              <div class="text-lg font-semibold">
                {{ $n(transaction.totalAmount || 0) }}
              </div>
            </div> -->
          </div>
        </template>
      </data-table>
    </PerfectScrollbar>
  </div>
</template>

<script setup>
import { inject, ref } from "vue"
import api from "../api.js"
import { transferDetailHeaders } from "../headers.js"
import { confirmDelete as deleteTransaction } from "../functions.js"
import { useRoute, useRouter } from "vue-router"
import { PerfectScrollbar } from "vue3-perfect-scrollbar"
import DataTable from "@/components/table/DataTable.vue"
import { formateDate, getStatusColor } from "../../../utils"
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
