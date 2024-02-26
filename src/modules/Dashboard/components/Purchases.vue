<template>
  <div class="p-4 space-y-3 capitalize w-full bg-white">
    <!-- <div class="text-lg border-b-2 border-primaryBg px-4 py-2">
      transactions
    </div> -->
    <div class="md:flex md:space-x-2 w-full">
      <mixed-chart
        :height="380"
        class="flex-grow md:w-3/4 lg:w-5/6 space-y-2 border-r-2 border-primaryBg"
      />
      <!-- <div
        class="grid grid-cols-2 md:flex md:flex-col text-center gap-4 capitalize"
      >
        <div class="border-bottom">
          <div class="text-3xl">350.00</div>
          <div class="light-title">quantity purchased</div>
        </div>
        <div class="border-bottom">
          <div class="text-3xl"><span class="uppercase"></span> 360.00K</div>
          <div class="light-title">total cost</div>
        </div>
        <div class="border-bottom">
          <div class="text-3xl">350.00</div>
          <div class="light-title">quantity sales</div>
        </div>
        <div class="border-bottom">
          <div class="text-3xl"><span class="uppercase"></span> 360.00K</div>
          <div class="light-title">total price</div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import MixedChart from "../../../components/chart/MixedChart.vue"
</script>

<style>
.border-bottom {
  @apply border-b-2 border-primaryBg;
}
</style>
