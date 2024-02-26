<template>
  <div class="flex py-3 px-4">
    <div class="flex space-x-2 items-end">
      <div class="text-3xl font-thin capitalize">
        {{ title }}
      </div>
      <div
        class="text-sm font-thin tracking-wider text-textMedium mb-2 px-2 rounded-full bg-lightGreenBg"
      >
        {{ count }}
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
export default {
  props: {
    title: {
      default: "Vite",
    },
    count: {
      default: 1234,
    },
  },
}
</script>

<style></style>
