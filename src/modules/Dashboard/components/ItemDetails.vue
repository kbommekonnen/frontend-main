<template>
  <div class="p-4 space-y-3 capitalize w-full h-full bg-white">
    <div class="text-lg border-b-2 border-primaryBg px-4 py-2">
      {{ $t("product details") }}
    </div>
    <div class="flex space-x-0">
      <div class="flex-shrink-0 space-y-2">
        <div
          class="w-full flex space-x-3 justify-between text-lg text-lightDanger"
        >
          <div class="">{{ $t("low stock items") }}</div>
          <div class="text-center">{{ report.lowStock }}</div>
        </div>
        <div class="w-full flex space-x-3 justify-between text-lg">
          <div class="">{{ $t("all item groups") }}</div>
          <div class="text-center">{{ report.itemGroups }}</div>
        </div>
        <div class="w-full flex space-x-3 justify-between text-lg">
          <div class="">{{ $t("all items") }}</div>
          <div class="text-center">{{ report.items }}</div>
        </div>
      </div>
      <div class="flex justify-center items-center flex-grow">
        <donut-chart class="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref } from "vue"
import api from "../api"
import DonutChart from "../../../components/chart/DonutChart.vue"

const getRequest = inject("getRequest")
const report = ref({})

getRequest(api.getItemCounts).then(({ item }) => {
  if (item) {
    report.value = item
  }
})
</script>

<style></style>
