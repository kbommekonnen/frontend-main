<template>
  <div
    class="flex flex-col shadow-top bg-white w-full h-full space-y-1 px-1 bg-primaryBg"
  >
  <div
      class="bg-white w-full grid grid-cols-3 md:flex md:h-24 p-3 rounded bg-white tracking-wide space-x-0 justify-around"
    >
      <account-summary-report :id="accountId" class="flex-grow" />
      <div class="total-card">
        <base-icon name="user-alt" :size="24" />
        <div class="-space-y-1 capitalize">
          <div class="text-lg flex-shrink-0">total quantity</div>
          <div class="font-semibold text-2xl tracking-wider">24,000</div>
        </div>
      </div>
      <div class="total-card">
        <base-icon name="cart-plus" :size="24" />
        <div class="-space-y-1 capitalize">
          <div class="text-lg">total purchases</div>
          <div class="font-semibold text-2xl tracking-wider">24,000</div>
        </div>
      </div>
      <div class="total-card">
        <base-icon name="donate" :size="24" />
        <div class="-space-y-1 capitalize">
          <div class="text-lg">total sales</div>
          <div class="font-semibold text-2xl tracking-wider">24,000</div>
        </div>
      </div>
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
        <base-icon name="calendar-alt" :size="24" />
      </div>
    </div>
    <div class="flex-grow lg:flex lg:space-x-1 bg-primaryBg w-full max-h-full">
      <mixed-chart :accountId="accountId" class="p-3 flex-grow bg-white lg:h-full" />
      
    </div>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router"
import MixedChart from "../../../components/chart/MixedChart.vue"
import AccountSummaryReport from "./AccountSummaryReport.vue"
const accountId = useRoute().params.id
</script>
<style scoped>
.total-card {
  @apply hidden bg-secondaryBg py-2 px-3 flex items-center rounded space-x-4;
}
@media (max-width: 640px) {
  .total-card {
    @apply scale-75;
  }
}
</style>
