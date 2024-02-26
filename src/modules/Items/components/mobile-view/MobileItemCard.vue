<template>
  <div class="bg-white rounded-lg shadow-md p-4 ml-1">
    <!-- <pre>{{ item }}</pre> -->
    <div class="flex items-start">
      <img
        v-if="item.image"
        :src="item.image.content"
        :alt="item.image"
        class="w-24 h-24 object-contain mb-4"
      />
      <div class="flex flex-col space-y-0 items-start">
        <h3 class="text-lg font-semibold mb-2">{{ item.name }}</h3>
        <div class="flex space-x-2 text-sm text-textLight">
          <!-- <div class="">{{ item.sku }}</div> -->
          <div class="">{{ item.brand }}</div>
          <div class="">{{ item.manufacturer }}</div>
          <div class="">Size {{ `${item.size} ${item.unit.shortName}` }}</div>
        </div>
        <div class="flex space-x-1 items-end">
          <div class="text-lg font-medium">{{ item.stockDetail.quantity }}</div>
          <div class="text-textLight text-sm">{{ item.unit.shortName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup() {},
}
</script>

<style>
/* No additional styles needed */
</style>
