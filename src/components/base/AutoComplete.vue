<template>
  <div
    class="w-full p-2 space-y-1 relative h-auto"
    :class="{
      'shadow-2xl rounded-lg rounded-b-none': resultOpened,
    }"
  >
    <div class="space-y-1">
      <label style="font-size: 16px" class="text-textDarkest" v-if="label">
        {{ label }}
      </label>
      <div class="flex items-center space-x-1 relative">
        <base-input
          type="text"
          :readonly="!!value"
          :placeholder="placeholder"
          :size="size"
          :bordered="bordered"
          v-model="activeLabel"
          :errors="errors"
          @focus="handleFocus"
          v-outsideClick="{ handler: handleBlur }"
        />
        <div
          v-if="!!value"
          class="hover:text-primary text-textMedium cursor-pointer pl-1 pr-2 absolute right-0"
          @click="handleClear"
        >
          <BaseIcon name="times" :size="18" />
        </div>
      </div>
      <div
        v-if="resultOpened"
        class="absolute left-0 right-0 bg-white z-10 p-2 shadow-2xl rounded-b-lg"
      >
        <div v-if="filteredItems.length === 0" class="p-2">No data</div>
        <div v-else class="overflow-y-auto" style="max-height: 25vh">
          <div
            class="p-2 hover:border-primary hover:bg-brightGray cursor-pointer border-l-4 border-transparent"
            v-for="item in filteredItems"
            :key="item.value"
            @click="handleChange(item.value)"
          >
            {{ item.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
export default {
  props: {
    value: {},
    label: String,
    placeholder: { type: String, default: "" },
    size: { type: Number, default: 16 },
    errors: { type: Array, default: () => [] },
    items: { type: Array, default: () => [] },
    bordered: { type: Boolean, default: false },
  },
  data() {
    return {
      resultOpened: false,
      activeLabel: "",
    }
  },
  computed: {
    success() {
      return this.errors.length === 0
    },
    filteredItems() {
      if (!this.activeLabel) return this.items
      return this.items.filter((item) =>
        RegExp(`${this.activeLabel}`, "i").test(item.label),
      )
    },
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        if (!this.value) return (this.activeLabel = "")
        this.activeLabel = this.items.find(
          (item) => item.value === this.value,
        ).label
      },
    },
  },
  methods: {
    handleFocus() {
      this.resultOpened = true
    },
    handleBlur() {
      this.resultOpened = false
    },
    handleChange(value) {
      this.$emit("input", value)
    },
    handleClear() {
      this.$emit("input", "")
    },
  },
}
</script>

<style></style>
