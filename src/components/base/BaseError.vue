<template>
  <div>
    <div v-if="message" class="text-sm text-error">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: { type: String },
})
</script>

<style lang="scss" scoped></style>
