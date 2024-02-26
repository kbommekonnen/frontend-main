<template>
  <div
    class="flex w-full flex-grow custom-input rounded tracking-widest text-textMedium"
    :class="{
      'bg-secondaryBg ': success && bordered,
      'bg-primaryBg': success && !bordered,
      'bg-danger': !success && !bordered,
      'border-primaryBorder': success && bordered,
      'border-error': !success && bordered,
      'pl-8': icon,
      'py-2 px-3': padding === 'big',
      'py-1 px-2': padding === 'small',
      'py-0 px-1': padding === 'xs',
      border: bordered,
    }"
  >
    <div class="grid gap-2 w-full grid-cols-2">
      <div
        v-for="(item, index) in modelValue"
        :key="index"
        class="rounded-md pl-4 pr-2 text-sm py-0 m-0 flex items-center space-x-2 border border-primary"
      >
        <div>{{ item }}</div>
        <div
          class="active:resize cursor-pointer active:bg-primary active:text-white rounded-full p-1"
          @click="removeItem(index)"
        >
          <base-icon name="times" :size="11" />
        </div>
      </div>
      <input
        @bind="attrs"
        class="outline-none px-2 w-full"
        v-model="item"
        @keydown.enter="addItem"
        @keydown.tab="addItem"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, useAttrs } from "vue"
const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  label: String,
  icon: String,
  readOnly: { type: Boolean, default: false },
  size: { type: Number, default: 16 },
  cols: { type: Number, default: 3 },
  error: { type: String, default: "" },
  padding: { type: String, default: ["big", "small", "xs"][0] },
  bordered: { type: Boolean, default: true },
  required: { type: Boolean, default: false },
})

let item = ref("")

const emit = defineEmits([
  "input",
  "enter",
  "focus",
  "blur",
  "update:modelValue",
])

const success = computed(() => !props.error)
const attrs = useAttrs()

function removeItem(index) {
  emit("update:modelValue", [
    ...props.modelValue.slice(0, index),
    ...props.modelValue.slice(index + 1),
  ])
}
function addItem() {
  if (item.value) emit("update:modelValue", [...props.modelValue, item.value])
  item.value = ""
}
</script>

<style>
.activeresize {
  transition: transform 0.3s;
}
.activeresize:active {
  transform: scale(1.5);
}
</style>
