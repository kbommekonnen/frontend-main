<template>
  <div
    class="flex space-x-2 items-center cursor-pointer hover:opacity-75"
    @click="toggle"
  >
    <BaseIcon
      :name="modelValue ? 'check-square' : 'square'"
      :size="size"
      :class="{
        'text-primary': !color && modelValue,
      }"
    />

    <div class="flex-auto" :class="modelValue ? '' : ''">
      {{ label }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: { type: String, default: "" },
  modelValue: {},
  size: { type: Number, default: 26 },
  selected: Boolean,
  color: {
    type: String,
  },
  value: {},
})
const emits = defineEmits(["toggle", "input", "update:modelValue"])
function toggle() {
  // emits("toggle", !props.modelValue)
  emits("update:modelValue", !props.modelValue)
}
</script>

<style></style>
