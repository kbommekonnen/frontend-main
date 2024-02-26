<template>
  <div v-if="!success" class="text-xs" style="color: #ec3118">
    <div v-for="(error, i) in errors" :key="i">{{ error }}</div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
export default {
  props: {
    errors: { type: Array, default: () => [] },
  },
  computed: {
    success() {
      return this.errors.length === 0
    },
  },
}
</script>

<style></style>
