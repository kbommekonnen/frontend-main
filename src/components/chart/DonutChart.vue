<template>
  <div>
    <apex-chart
      type="donut"
      class="h-full w-full"
      :options="chartOptions"
      :series="series"
    ></apex-chart>
  </div>
</template>

<script setup>
import ApexChart from "vue3-apexcharts"
const chartOptions = {
  chart: {
    width: 200,
    type: "donut",
  },
  dataLabels: {
    enabled: false,
  },
  labels: ["active", "inactive"],
  responsive: [
    {
      breakpoint: 680,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          show: false,
        },
      },
    },
    {
      breakpoint: 1200,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          show: false,
        },
      },
    },
    {
      breakpoint: 1920,
      options: {
        chart: {
          width: 280,
        },
        legend: {
          show: false,
        },
      },
    },
  ],
  legend: {
    show: false,
    position: "right",
    offsetY: 0,
    height: 230,
  },
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          total: {
            show: false,
            // label: "active items",
            // formatter: (v) => Object.entries(v.config),
          },
        },
      },
    },
  },
}
const series = [60, 30]
</script>

<style scoped></style>
