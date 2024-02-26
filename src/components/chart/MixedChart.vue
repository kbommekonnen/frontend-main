<template>
  <div class="resize">
    <apex-chart
      :height="props.height"
      :options="chartOptions"
      :series="series"
    ></apex-chart>
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
      "09/01/2003",
      "10/01/2003",
      "11/01/2003",
    ],
  },
  height: { type: Number, default: 380 },
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
  title: {
    text: props.title,
    align: "left",
    style: {
      fontSize: "16px",
      color: "#666",
    },
  },
  chart: {
    height: 350,
    type: "line",
    stacked: false,
  },
  stroke: {
    width: [4, 2, 5],
    curve: "smooth",
  },
  plotOptions: {
    bar: {
      columnWidth: "25%",
    },
  },

  fill: {
    opacity: [0.85, 0.25, 1],
    gradient: {
      inverseColors: false,
      shade: "light",
      type: "vertical",
      opacityFrom: 0.85,
      opacityTo: 0.55,
      stops: [0, 100, 100, 100],
    },
  },
  labels: {
    formatter: function (value, timestamp, opts) {
      return opts.dateFormatter(new Date(timestamp), "dd MMM")
    },
  },
  markers: {
    size: 0,
  },
  yaxis: {
    title: {
      text: "ETB",
    },
    min: 0,
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: function (y) {
        if (typeof y !== "undefined") {
          return y.toFixed(0) + " ETB"
        }
        return y
      },
    },
  },
}

const series = [
  {
    name: "SALES",
    type: "line",
    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
  },
  {
    name: "PROFIT",
    type: "area",
    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
  },
  {
    name: "PURCHASES",
    type: "line",
    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
  },
]
</script>

<style scoped></style>
