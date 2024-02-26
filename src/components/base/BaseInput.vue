<template>
  <div class="flex flex-col w-full space-y-0 h-full">
    <div
      :style="'font-size: ' + size + 'px;'"
      class="text-textMedium text-left"
      :class="`col-span-${labelCols}`"
      v-if="label"
      >
      {{ label }} <span v-if="required" class="text-error">*</span>
      </div
    >
    <div class="input-box" :class="`col-span-${12 - labelCols}`">
      <div
        class="relative flex flex-shrink-0 -space-x-1 items-center"
        :class="{ 'rounded bg-primaryBg': !bordered }"
      >
        <input
          :style="'font-size: ' + size + 'px;'"
          :readonly="readOnly"
          v-bind="attrs"
          :autofocus="autofcus"
          :value="modelValue"
          ref="inputRef"
          @input="handleInput"
          @keyup.enter="handleOnEnter"
          @focus="handleFocus"
          @blur="handleBlur"
          @scroll.prevent=""
          class="w-full flex-grow normal-case custom-input rounded tracking-widest text-textMedium"
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
        />
        <div v-if="icon" class="absolute p-1 px-3">
          <base-icon :name="icon" />
        </div>
        <slot name="suffix" class="h-full flex-grow-0"></slot>
      </div>
      <div v-if="!success" class="text-xs" style="color: #ec3118">
        <div v-if="error">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, useAttrs, watch } from "vue"
const props = defineProps({
  modelValue: {},
  label: String,
  icon: String,
  readOnly: { type: Boolean, default: false },
  labelCols: { type: Number, default: 6 },
  size: { type: Number, default: 16 },
  error: { type: String, default: "" },
  padding: { type: String, default: ["big", "small", "xs"][0] },
  bordered: { type: Boolean, default: true },
  positiveNumber: { type: Boolean, default: true },
  integer: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  formatted: { type: Boolean, default: true },
  focus: { type: Boolean, default: false },
  autofocus: { type: Boolean, default: false },
})
const emit = defineEmits([
  "input",
  "enter",
  "focus",
  "blur",
  "update:modelValue",
])
let inputRef = ref()
const success = computed(() => !props.error)
const attrs = useAttrs()

onMounted(()=> {
  // formate number if type is number and formatted
  if((useAttrs().type == "number") && props.formatted ) {
    // formate
  }
})

function handleInput(event) {
  if (attrs.type == "number") {
    const no_decimal_digit = props.integer ? 0 : 3
    let value = event.target.value
    let index = value.indexOf(".")
    if (index > 0) {
      event.target.value = value.slice(0, index + no_decimal_digit)
    }
    if (event.target.value < 0 && props.positiveNumber) {
      event.target.value = event.target.value * -1
    }
    emit("update:modelValue", Number(event.target.value))
  } else emit("update:modelValue", event.target.value)
}
function handleOnEnter() {
  emit("enter")
}
function handleFocus() {
  emit("focus")
  if (inputRef.value) inputRef.value.focus()
}

function handleBlur() {
  emit("blur")
}
onMounted(()=> {
  if(props.autofocus) {
    handleFocus()
  }
})
watch(
  () => props.focus,
  (value) => {
    console.log(value, inputRef, inputRef.value)
    if (value) {
      handleFocus()
    }
  },
  {
    deep: true,
    immediate: true,
  },
)
</script>

<style>
.custom-input:focus {
  outline-color: #16a596;
}
.custom-input::placeholder {
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.input-box {
  position: relative;
}

.icon-right {
  position: absolute;
  right: 3px;
  top: 50%;
  transform: translate(0, -50%);
}
</style>
