<template>
  <div class="flex space-x-2 items-center cursor-pointer" @click="toggle">
    <div
      style="width: 22px; height: 22px"
      class="flex justify-center items-center"
      :style="{
        backgroundColor: value ? '#2ECC71' : '#8F92A1',
      }"
    >
      <base-icon name="check" :size="value ? 14 : 10" class="text-white" />
    </div>
    <div v-if="label">{{ label }}</div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
export default {
  props: ["value", "label"],
  methods: {
    toggle() {
      this.$emit("input", !this.value)
    },
  },
}
</script>

<style></style>
