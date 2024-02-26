<template>
  <div class="flex flex-col space-y-1 pt-1">
    <div class="top-cards-container">
      <item-details class="top-card" />
      <top-selling-items class="top-card" />
    </div>
    <div class="flex flex-grow flex-col lg:flex-row space-x-1">
      <items-stock-on-hand class="flex-grow-0 flex-shrink-0 lg:h-full" />
      <div class="flex-grow flex flex-col space-y-1">
        <purchase-and-sell-summary-report class="py-3" />
        <purchases class="flex-grow w-full bg-white p-3" />
      </div>
    </div>
    <!-- <div class="w-full bg-white p-3">sales</div> -->
  </div>
</template>

<script setup>
import ItemDetails from "./ItemDetails.vue"
import TopSellingItems from "./TopSellingItems.vue"
import PurchaseAndSellSummaryReport from "./PurchaseAndSellSummaryReport.vue"
import Purchases from "./Purchases.vue"
import ItemsStockOnHand from "./ItemsStockOnHand.vue"
</script>

<style scoped>
.top-card {
  @apply bg-white shadow-sm;
}
@media (min-width: 780px) {
  .top-cards-container {
    @apply flex space-x-1 w-full;
  }
  .top-card {
    @apply w-1/2 h-full;
  }
}
@media (max-width: 780px) {
  .top-cards-container {
    @apply flex flex-col space-y-1;
  }
  .top-card {
    @apply w-full;
  }
}
</style>
