<template>
  <div class="summary-container">
    <div class="bg-secondaryBg py-2 px-3 flex items-center rounded space-x-4">
      <base-icon name="hand-holding-usd" :size="24" />
      <div class="amount-card">
        <div class="">{{ $t('purchase amount') }}</div>
        <div class="font-semibold text-2xl tracking-wider">
          {{ formateNumber(purchaseReport.amount) }}
        </div>
      </div>
    </div>
    <div class="bg-secondaryBg py-2 px-3 flex items-center rounded space-x-4">
      <base-icon name="donate" :size="24" />
      <div class="amount-card">
        <div class="">{{ $t('purchases') }}</div>
        <div class="font-semibold text-2xl tracking-wider">
          {{ formateNumber(purchaseReport.count) }}
        </div>
      </div>
    </div>
    <div class="bg-secondaryBg py-2 px-3 flex items-center rounded space-x-4">
      <base-icon name="hand-holding-usd" :size="24" />
      <div class="amount-card">
        <div class="">{{ $t('sell amount') }}</div>
        <div class="font-semibold text-2xl tracking-wider">
          {{ formateNumber(sellReport.amount) }}
        </div>
      </div>
    </div>
    <div class="bg-secondaryBg py-2 px-3 flex items-center rounded space-x-4">
      <base-icon name="donate" :size="24" />
      <div class="amount-card">
        <div class="">{{ $t('sales') }}</div>
        <div class="font-semibold text-2xl tracking-wider">
          {{ formateNumber(sellReport.count) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formateNumber } from "../../../utils"
import { inject, ref } from "vue"
import api from "../api"
let loading = ref(true)
let purchaseReport = ref({})
let sellReport = ref({})
const getRequest = inject("getRequest")
getReport()

async function getReport() {
  loading.value = true
  await getPurchaseSummaryReport()
  await getSellSummaryReport()
  loading.value = false
}

async function getPurchaseSummaryReport() {
  const response = await getRequest({
    ...api.getPurchaseSummaryReport,
  })
  if (response && response.item) {
    purchaseReport.value = response.item
  }
}

async function getSellSummaryReport() {
  const response = await getRequest({
    ...api.getSellSummaryReport,
  })
  if (response && response.item) {
    sellReport.value = response.item
  }
}
</script>

<style scoped>
@media (max-width: 640px) {
  .summary-container {
    @apply grid grid-cols-2 gap-4 bg-white
  }
  .amount-card {
    @apply flex flex-col-reverse items-center justify-start flex-shrink-0 w-full h-full -space-y-1 capitalize text-center
  }
  base-icon {
    @apply hidden
  }
}
@media (min-width: 640px) {
  .summary-container {
    @apply flex justify-around bg-white
  }
  .amount-card {
    @apply -space-y-1 capitalize text-center
  }
}
</style>
