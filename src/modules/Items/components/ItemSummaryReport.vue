<template>
  <div class="flex justify-around">
    <div
      class="w-1/5 bg-secondaryBg py-2 px-3 flex items-center rounded space-x-4"
    >
      <base-icon name="user-alt" :size="24" />
      <div class="-space-y-1 capitalize text-center">
        <div class="">quantity on hand</div>
        <div class="font-semibold text-2xl tracking-wider">
          {{ formateNumber(report.available_on_stock) }}
        </div>
      </div>
    </div>
    <div
      class="w-1/5 bg-secondaryBg py-2 px-3 flex items-center rounded space-x-4"
    >
      <base-icon name="donate" :size="24" />
      <div class="-space-y-1 capitalize text-center">
        <div class="">sales quantity</div>
        <div class="font-semibold text-2xl tracking-wider">
          {{ formateNumber(report.sell_quantity) }}
        </div>
      </div>
    </div>
    <div
      class="w-1/5 bg-secondaryBg py-2 px-3 flex items-center rounded space-x-4"
    >
      <base-icon name="donate" :size="24" />
      <div class="-space-y-1 capitalize text-center">
        <div class="">sells amount</div>
        <div class="font-semibold text-2xl tracking-wider">
          {{ formateNumber(report.sell_amount) }}
        </div>
      </div>
    </div>
    <div
      class="w-1/5 bg-secondaryBg py-2 px-3 flex items-center rounded space-x-4"
    >
      <base-icon name="donate" :size="24" />
      <div class="-space-y-1 capitalize text-center">
        <div class="">purchase quantity</div>
        <div class="font-semibold text-2xl tracking-wider">
          {{ formateNumber(report.purchase_quantity) }}
        </div>
      </div>
    </div>
    <div
      class="w-1/5 bg-secondaryBg py-2 px-3 flex items-center rounded space-x-4"
    >
      <base-icon name="donate" :size="24" />
      <div class="-space-y-1 capitalize text-center">
        <div class="">purchase amount</div>
        <div class="font-semibold text-2xl tracking-wider">
          {{ formateNumber(report.purchase_amount) }}
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
getItemSummaryReport()
async function getItemSummaryReport() {
  loading.value = true
  const response = await getRequest({
    ...api.getItemSummaryReport,
    params: [props.id],
  })
  if (response && response.item) {
    report.value = response.item
  }
  loading.value = false
}
</script>

<style scoped></style>
