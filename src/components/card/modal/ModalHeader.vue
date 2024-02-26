<template>
  <div class="flex justify-between w-full bg-white p-4">
    <div class="flex-grow flex justify-between items-center">
      <slot>
        <div class="capitalize font-semibold text-xl tracking-wider">
          {{ $t(title) }}
        </div>
      </slot>
      <base-icon
        v-if="hasCloseBtn"
        name="times"
        :size="28"
        class="hover:bg-primaryBg cursor-pointer"
        v-tippy
        content="close"
        @click="handleClose"
      />
    </div>
  </div>
</template>
<script setup>
defineProps({
  hasCloseBtn: { type: Boolean, default: true }, // toggle close button
  title: { type: String, default: "" },
})
const emit = defineEmits(["close"])

function handleClose() {
  emit("close")
}
</script>
