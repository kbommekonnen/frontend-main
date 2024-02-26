<template>
  <div class="w-full space-y-1 text-textMedium">
    <label style="font-size: 16px" class="text-textMedium" v-if="label"
      >{{ label }}<span v-if="required" class="text-error">*</span></label
    >
    <div>
      <textarea
        :rows="rows"
        :style="'font-size: ' + size + 'px;'"
        ref="textarea"
        v-bind="attrs"
        :autofocus="autofcus"
        :value="modelValue"
        @input="handleInput"
        @keyup.enter="handleOnEnter"
        @focus="handleFocus"
        @blur="handleBlur"
        class="w-full custom-text-input p-2 px-3 pr-6 rounded tracking-widest text-justify text-textMedium focus:outline-primary"
        :class="{
          'overflow-y-hidden': autoResize,
          'bg-brightGray': success && !bordered,
          'bg-danger': !success && !bordered,
          'border-textLight': success && bordered,
          'border-error': !success && bordered,
          'border rounded': bordered,
        }"
      ></textarea>
    </div>
    <div v-if="!success" class="text-xs" style="color: #ec3118">
      <div v-if="error">{{ error }}</div>
    </div>
  </div>
</template>

<script setup>
import { useTextareaAutosize } from "@vueuse/core";
import { computed, useAttrs } from "vue"
const { textarea, input } = useTextareaAutosize()
const props = defineProps({
  modelValue: {},
  label: String,
  readOnly: { type: Boolean, default: false },
  autoResize: { type: Boolean, default: true },
  size: { type: Number, default: 16 },
  error: { type: String, default: "" },
  bordered: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  rows: { type: Number, default: 3 },
  autofocus: { type: Boolean, default: false },
})
const emit = defineEmits([
  "input",
  "enter",
  "focus",
  "blur",
  "update:modelValue",
])

const success = computed(() => !props.error)
const attrs = useAttrs()
function handleInput(event) {
  if(props.autoResize) {
    input.value = event.target.value;
  }
  emit("update:modelValue", event.target.value)
}
function handleOnEnter(event) {
  emit("enter", event.target.value)
}
function handleFocus(event) {
  emit("focus", event.target.value)
}

function handleBlur(event) {
  emit("blur", event.target.value)
}
</script>

<!-- outline-color: #1763ad; -->
<style>
.custom-text-input:focus {
}
.custom-text-input::placeholder {
  font-size: 14px;
}
</style>
