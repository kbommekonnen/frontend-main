<template>
  <button
    :class="{
      'bg-primary text-white': type == 'primary',
      'bg-textMedium text-white': type == 'secondary',
      'border-2 border-textMedium bg-primaryBg text-textDark hover:bg-textDark hover:text-white':
        type == 'plain',
      'border-2 border-lightDanger text-lightDanger': type == 'danger',
      'bg-textLight text-white opacity-50': isWorking,
      'cursor-not-allowed': disabled,
      'base-btn cursor-pointer': !disabled,
      idle: !isWorking,
    }"
    :disabled="disabled"
    class="disabled:opacity-50 py-1 px-3 rounded tracking-widest flex space-x-2 items-center justify-center capitalize"
    @click.prevent="handleClick"
  >
    <BaseIcon v-if="isWorking" :size="iconSize" name="spin" class="spinner" />
    <BaseIcon
      v-if="!isWorking && icon && !iconRight"
      :size="iconSize"
      :name="icon"
    />
    <div v-if="label || label == 0">{{ $t(label) }}</div>
    <BaseIcon
      v-if="!isWorking && icon && iconRight"
      :size="iconSize"
      :name="icon"
    />
  </button>
</template>

<script setup>
import { useMagicKeys, whenever } from "@vueuse/core"

const props = defineProps({
  label: {},
  type: {
    type: String,
    default: "primary",
    enum: ["primary", "secondary", "danger"],
  },
  primary: { type: Boolean, default: true },
  icon: { type: String },
  iconSize: { type: Number, default: 14 },
  iconRight: { type: Boolean },
  disabled: { type: Boolean, default: false },
  isWorking: { type: Boolean, default: false },
  shortcut: { type: String, default: "" }, //ctrl_n, ctrl+4
})
const keys = useMagicKeys()
whenever(keys.alt_n, () => handleClick())

const emit = defineEmits(["click"])
function handleClick() {
  console.log('clicked')
  if (props.isWorking || props.disabled) return
  emit("click")
}
</script>

<style>
.base-btn.idle:hover {
  opacity: 0.8;
  transition: transform 0.5s;
}
.base-btn.idle:active {
  opacity: 0.7;
  transform: scale(1.1);
}
</style>
