<template>
  <div class="bg-white rounded-lg shadow-md p-4 ml-1">
    <div class="flex flex-col space-y-0 items-start">
      <h3 class="text-lg font-semibold mb-2">{{ account.name }}</h3>
      <div class="flex space-x-2 text-base text-textLight">
        <div class="flex space-x-1 items-end">
          <div class="text-lg font-medium">{{ account.code }}</div>
          <div class="text-textLight text-sm">{{ account.side }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    account: {
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
