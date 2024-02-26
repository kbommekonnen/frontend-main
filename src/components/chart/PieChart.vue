<template>
  <div>
    <apex-chart
      width="500"
      type="pie"
      :options="chartOptions"
      :series="series"
    ></apex-chart>
  </div>
</template>

<script setup>
import ApexChart from "vue3-apexcharts"
const chartOptions = {
  chart: {
    id: "vuechart-example",
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
  },
}
const series = [
  {
    name: "series-1",
    data: [30, 40, 35, 50, 49, 60, 70, 91],
  },
]
</script>

<style scoped></style>
