<template>
  <div class="p-4 space-y-3 capitalize w-full h-full bg-white">
    <div
      class="flex justify-between items-center text-lg border-b-2 border-primaryBg pr-4 py-2"
    >
      <div class="flex-shrink-0">{{ $t("top selling items") }}</div>
      <div class="">
        <base-select
          v-model="activeDuration"
          icon="calendar"
          :items="durationOptions"
        />
      </div>
    </div>
    <div v-if="items && items.length > 0" class="space-y-2">
      <template v-for="(item, index) in items" :key="index">
        <div v-if="item._id" class="grid grid-cols-3 w-full border-b-2 border-primaryBg">
          <router-link
            class="cursor-pointer"
            :to="`/inventory/items/${item._id._id}`"
            >{{ item._id.name }}</router-link
          >
          <div class="text-center">{{ formateNumber(item.quantity) }}</div>
          <div class="text-center">ETB {{ formateNumber(item.amount) }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { formateNumber } from "../../../utils"
import { inject, onMounted, ref } from "vue"
import api from "../api"

const durationOptions = ref([
  { label: "yearly", value: "yearly" },
  { label: "monthly", value: "monthly" },
  { label: "weekly", value: "weekly" },
  { label: "daily", value: "daily" },
])

let activeDuration = ref("monthly")
let loading = ref(true)
let items = ref([])
const getRequest = inject("getRequest")
onMounted(() => {
  getTopSellingItems()
})
async function getTopSellingItems() {
  loading.value = true
  const response = await getRequest({
    ...api.getTopSellingItems,
  })
  if (response && response.items) {
    items.value = response.items
  }
  loading.value = false
}
</script>

<style></style>
