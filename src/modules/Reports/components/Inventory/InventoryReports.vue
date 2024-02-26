<template>
  <div class="w-full h-full space-y-2 bg-primaryBg">
    <div
      class="flex space-x-4 items-center bg-textMedium text-white shadow-top p-3"
    >
      <div class=""><base-icon name="users" :size="48" /></div>
      <div class="space-y-0">
        <div
          class="capitalize tracking-wider text-opacity-90 font-semibold text-2xl"
        >
          {{ $t("inventory reports") }}
        </div>
        <div class="tracking-wider opacity-75 first-letter:uppercase">
          {{
            $t(`inventory reports are exclusively generated for the inventory tracked
        items in your organization`)
          }}
        </div>
      </div>
    </div>
    <scroll class="flex-grow grid lg:grid-cols-2 gap-2 break-words">
      <div v-for="report in reports" :key="report.to" class="report-item">
        <Transition name="page" mode="out-in">
          <router-link :to="report.to"
            ><div class="space-y-1">
              <div class="flex items-center space-x-2">
                <!-- <base-icon name="users" :size="32" /> -->
                <div class="light-title">{{ report.title }}</div>
              </div>
              <div class="first-letter:uppercase">{{ report.description }}</div>
            </div></router-link
          >
        </Transition>
      </div>
    </scroll>
  </div>
</template>

<script setup>
const reports = [
  {
    icon: "",
    title: "inventory summary",
    description:
      "shows you the quantity of an item sold and purchased for a given period",
    to: "/reports/inventory/inventory-summary",
  },
  {
    icon: "",
    title: "inventory valuation summary",
    description:
      "summarizes the stock on hand and the total asset value of your inventory items as of the current date",
    to: "/reports/inventory/inventory-valuation-summary",
  },
  {
    icon: "",
    title: "inventory aging summary",
    description:
      " gives a rundown of the number of days you’ve been holding stock",
    to: "/reports/inventory/inventory-aging-summary",
  },
  {
    icon: "",
    title: "inventory sales report",
    description: "",
    to: "/reports/inventory/inventory-sales-report",
  },
  {
    icon: "",
    title: "warehouse report",
    description:
      "shows the stock details of each item distributed across all warehouses",
    to: "/reports/inventory/inventory-warehouse-report",
  },
  {
    icon: "",
    title: "stock summary report",
    description:
      "displays the details of all your item’s opening stock, quantity sold, purchased, and closing stock for a given period",
    to: "/reports/inventory/inventory-stock-summary-report",
  },
  {
    icon: "",
    title: "ABC Classification",
    description:
      "groups your items into three classes, namely A, B, and C, based on the revenue they generate and its impact on your business for a specific period",
    to: "/reports/inventory/inventory-abc-classication-report",
  },
  {
    icon: "",
    title: "",
    description: "",
    to: "",
  },
]
</script>

<style>
.report-item {
  @apply bg-white rounded p-3;
}
.report-item:hover {
  @apply cursor-pointer border border-textMedium transition duration-300 ease-in-out transform scale-y-110 opacity-80;
}
.page-enter-active,
.page-leave-active {
  transition: 6000ms ease all;
}
</style>
