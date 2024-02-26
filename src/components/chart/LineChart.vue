<template>
  <div>
    <apex-chart type="line" :options="chartOptions" :series="series"></apex-chart>
  </div>
</template>

<script setup>
import ApexChart from "vue3-apexcharts"
const props = defineProps({
  categories: {
    type: Array,
    default: () => [
      "01/01/2003",
      "02/01/2003",
      "03/01/2003",
      "04/01/2003",
      "05/01/2003",
      "06/01/2003",
      "07/01/2003",
      "08/01/2003",
    ],
  },
  forecastCount: {
    type: Number,
    default: 0,
  },
  title: { type: String, default: "" },
})
const chartOptions = {
  xaxis: {
    type: "datetime",
    categories: props.categories,
  },
  forecastDataPoints: {
    count: props.forecastCount,
  },
  stroke: {
    width: 5,
    curve: "smooth",
  },
  labels: {
    formatter: function (value, timestamp, opts) {
      return opts.dateFormatter(new Date(timestamp), "dd MMM")
    },
  },
  title: {
    text: props.title,
    align: "left",
    style: {
      fontSize: "16px",
      color: "#666",
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      gradientToColors: ["#FDD835"],
      shadeIntensity: 1,
      type: "horizontal",
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100, 100, 100],
    },
  },
  // yaxis: {
  //   min: -10,
  //   max: 40,
  // },
}
const series = [
  {
    name: "Purchases",
    data: [30, 40, 45, 50, 49, 60, 70, 91],
  },
  {
    name: "Sales",
    data: [23, 43, 54, 12, 44, 52, 32, 11],
  },
]
</script>

<style scoped></style>
