<template>
  <div class="feature-card p-6 rounded-md">
    <h2 class="text-2xl text-primary font-bold mb-2 text-center">
      {{ feature.title }}
    </h2>
    <p>
      {{ feature.detail }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  feature: { type: Object, default: () => ({}) },
})
</script>

<style scoped>
.feature-card {
  --tw-shadow: 2px 4px 6px 4px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color),
    0 2px 4px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
</style>
