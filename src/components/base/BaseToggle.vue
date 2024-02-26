<template>
  <div class="space-y-2">
    <!-- <div class="text-textDarkest">{{ label }}</div> -->
    <div class="flex space-x-3">
      <div
        class="py-2 px-4 rounded flex items-center space-x-2 cursor-pointer hover:opacity-75"
        :class="{ 'border border-primary': value }"
        :style="{
          boxShadow: value ? '0 0 5px #3b49df' : '0 0 3px #8993a466',
        }"
        @click="immutalble ? null : handleToggle()"
      >
        <BaseIcon v-if="value" name="check-circle" :size="20" fill="#3b49df" />
        <div class="text-textDark tracking-widest">{{ label }}</div>
      </div>
    </div>
    <div v-if="!success" class="text-xs" style="color: #ec3118">
      <div v-for="(error, i) in errors" :key="i">{{ error }}</div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
export default {
  props: {
    value: {},
    label: { type: String, default: "Select" },
    items: { type: Array, default: () => [] },
    immutalble: { type: Boolean, default: false },
    success: { type: Boolean, default: false },
    errors: { type: Array, default: () => [] },
  },

  methods: {
    handleToggle() {
      this.$emit("input", !this.value)
    },
  },
}
</script>

<style></style>
