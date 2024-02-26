<template>
  <div class="flex justify-around">
    <div
      class="w-1/5 bg-secondaryBg py-2 px-3 flex items-center rounded space-x-4"
    >
      <base-icon name="user-alt" :size="24" />
      <div class="-space-y-1 capitalize text-center">
        <div class="">total quantity</div>
        <div class="font-semibold text-2xl tracking-wider">
          {{ formateNumber(report.total_quantity) }}
        </div>
      </div>
    </div>
    <div
      class="w-1/5 bg-secondaryBg py-2 px-3 flex items-center rounded space-x-4"
    >
      <base-icon name="donate" :size="24" />
      <div class="-space-y-1 capitalize text-center">
        <div class="">average price</div>
        <div class="font-semibold text-2xl tracking-wider">
          {{ formateNumber(report.avg_rate) }}
        </div>
      </div>
    </div>
    <div
      class="w-1/5 bg-secondaryBg py-2 px-3 flex items-center rounded space-x-4"
    >
      <base-icon name="donate" :size="24" />
      <div class="-space-y-1 capitalize text-center">
        <div class="">sub total</div>
        <div class="font-semibold text-2xl tracking-wider">
          {{ formateNumber(report.total_amount) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formateNumber } from "../../../utils"
import { inject, ref } from "vue"
const props = defineProps({ id: { type: String } })
import api from "../api"
let loading = ref(true)
let report = ref({})
const getRequest = inject("getRequest")
getItemPurchaseSummaryReport()
async function getItemPurchaseSummaryReport() {
  loading.value = true
  const response = await getRequest({
    ...api.getItemPurchaseSummaryReport,
    params: [props.id],
  })
  if (response && response.item) {
    report.value = response.item
  }
  loading.value = false
}
</script>

<style scoped></style>
