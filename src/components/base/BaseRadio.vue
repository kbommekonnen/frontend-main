<template>
  <div class="space-y-2">
    <slot name="label"
      ><div class="text-textMedium">{{ label }}</div></slot
    >
    <div :class="containerClass">
      <div
        type="radio"
        class="p-2 rounded flex items-center space-x-2 cursor-pointer hover:opacity-75"
        :class="{ 'border border-primary': item.value === modelValue }"
        :style="{
          boxShadow:
            item.value === modelValue ? '0 0 2px #16A596' : '0 0 3px #8993a466',
        }"
        v-for="item in items"
        :key="item.value"
        @click="immutalble ? null : handleToggle(item.value)"
      >
        <BaseIcon
          v-if="item.value === modelValue"
          name="check-circle"
          :size="20"
          class="text-primary"
        />
        <slot name="items">
          <div>
            <slot :item="item" name="item"
              ><div class="text-textMedium tracking-widest">
                {{ item.label }}
              </div></slot
            >
          </div>
        </slot>
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
    modelValue: {},
    label: { type: String, default: "" },
    items: { type: Array, default: () => [] },
    immutalble: { type: Boolean, default: false },
    success: { type: Boolean, default: false },
    errors: { type: Array, default: () => [] },
    containerClass: { type: String, default: "flex space-x-3" },
  },
  emits: ["update:modelValue"],
  methods: {
    handleToggle(modelValue) {
      this.$emit("update:modelValue", modelValue)
    },
  },
}
</script>

<style></style>
