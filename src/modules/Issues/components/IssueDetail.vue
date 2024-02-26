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
          <div class="text-textDark">{{ $t("empty issue detail") }}</div>
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
          <div class="capitalize">{{ $t("issue number") }}</div>
          <div class="text-lg uppercase">{{ transaction.issueNumber }}</div>
        </div>
        <div class="space-y-0 bg-secondaryBg p-2">
          <div class="capitalize">{{ $t("warehouse") }}</div>
          <div v-if="transaction.store" class="text-lg uppercase">
            {{ transaction.store.name }}
          </div>
        </div>
        <div class="space-y-0 bg-secondaryBg p-2">
          <div class="capitalize">{{ $t("customer") }}</div>
          <div class="text-lg uppercase">
            {{ transaction.customer }}
          </div>
        </div>
        <div class="space-y-0 bg-secondaryBg p-2">
          <div class="capitalize">{{ $t("date") }}</div>
          <div class="text-lg">
            {{ formateDate(transaction.createdAt, "MMM DD YYYY hh:mm") }}
          </div>
        </div>
      </div>
      <data-table
        :headers="issueDetailHeaders"
        :items="transaction.items"
        class="flex-grow"
      >
        <template #item="{ item }">
          <router-link
            class="cursor-pointer"
            :to="`/inventory/items/${item.item._id}`"
            >{{ item.item.name }}</router-link
          >
        </template>

        <template #footer>
          <div class="flex flex-col items-end center p-4">
            <!-- <div class="w-full md:w-1/2 grid grid-cols-2 gap-4">
              <div
                class="flex-shrink-0 text-start first-letter:uppercase"
              >
                {{ $t("total discount") }}
              </div>
              <div class="text-lg font-semibold">
                {{ $n(transaction.totalAmount || 0) }}
              </div>
            </div>
            <div class="w-full md:w-1/2 grid grid-cols-2 gap-4">
              <div class="flex-shrink-0 first-letter:uppercase">
                {{ $t("tax") }}
              </div>
              <div class="text-lg font-semibold">
                {{ $n(transaction.totalAmount || 0) }}
              </div>
            </div> -->
            <div class="w-full md:w-1/2 grid grid-cols-2 gap-4">
              <div class="flex-shrink-0 first-letter:uppercase">
                {{ $t("total quantity") }}
              </div>
              <div class="text-lg font-semibold">
                {{ $n(totalQuantity || 0) }}
              </div>
            </div>
          </div>
        </template>
      </data-table>
    </PerfectScrollbar>
  </div>
</template>

<script setup>
import { computed, inject, ref } from "vue"
import api from "../api.js"
import { issueDetailHeaders } from "../headers.js"
import { confirmDelete as deleteTransaction } from "../functions.js"
import { useRoute, useRouter } from "vue-router"
import { PerfectScrollbar } from "vue3-perfect-scrollbar"
import DataTable from "@/components/table/DataTable.vue"
import { formateDate } from "../../../utils"
const getRequest = inject("getRequest") // inject axios

let working = ref(true)
let transaction = ref({})
const totalQuantity = computed(() => {
  if (transaction.value && transaction.value.items)
    return transaction.value.items.reduce(
      (acc, { quantity = 0 }) => (acc += quantity),
      0,
    )
  else return 0
})
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
