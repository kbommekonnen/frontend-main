<template>
  <div
    class="flex flex-col shadow-top w-full h-full space-y-1 px-1 bg-primaryBg"
  >
    <div
      class="bg-white w-full grid grid-cols-3 md:flex md:h-24 p-3 rounded tracking-wide space-x-0 justify-around"
    >
      <item-summary-report :id="itemId" class="flex-grow" />
      <!-- TODO change input dates display to speed dial -->
      <speed-dial class="relative" />
      <div
        v-if="false"
        class="lg:w-2/6 bg-secondaryBg py-2 px-3 flex items-center rounded space-x-4"
      >
        <div class="space-y-1 capitalize">
          <div class="text-sm">{{ $t("from") }}</div>
          <base-input type="date" padding="small" />
        </div>
        <div class="md:-space-y-1 capitalize">
          <div class="text-sm">to</div>
          <base-input type="date" bordered padding="small" />
        </div>
        <!-- TODO change icon to date filter -->
        <base-icon name="calendar-alt" :size="24" />
      </div>
    </div>
    <div class="flex-grow lg:flex lg:space-x-1 bg-primaryBg w-full max-h-full">
      <mixed-chart :itemId="itemId" class="p-3 flex-grow bg-white lg:h-full" />
      <item-stock-on-hand
        v-if="supportsMultipleWarehouses"
        :itemId="itemId"
        class="flex-grow-0 fleex-shrink-0 bg-white p-2 min-w-fit lg:min-h-full flex-shrink-0"
      />
    </div>
  </div>
</template>
<script setup>
import { toRefs } from "vue"
import { useRoute } from "vue-router"
import MixedChart from "../../../components/chart/MixedChart.vue"
import { usePreferencesStore } from "../../Settings/store"
import ItemStockOnHand from "./ItemStockOnHand.vue"
import ItemSummaryReport from "./ItemSummaryReport.vue"
const { supportsMultipleWarehouses } = toRefs(usePreferencesStore())
const itemId = useRoute().params.id

</script>
<style scoped>
@media (max-width: 640px) {
}
</style>
