<template>
  <div
    class="rounded-full flex cursor-pointer"
    :class="modelValue ? 'bg-primary justify-end' : 'bg-[#D2D2D4] justify-start'"
    style="width: 44px; height: 25px; padding: 1.5px"

    @click="toggleSelect"
  >
    <div class="rounded-full bg-white" style="width: 22px; height: 22px"></div>
  </div>
</template>

<script setup>
const props = defineProps(["modelValue"])
const emit = defineEmits(["update:modelValue"])
function toggleSelect() {
  emit("update:modelValue", !props.modelValue)
}
</script>

<style></style>
