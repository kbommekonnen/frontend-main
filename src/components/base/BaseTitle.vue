<template>
  <div class="flex w-full justify-between">
    <div class="text-2xl text-primary font-semibold font-serif tracking-wider">
      {{ title }}
    </div>
    <slot></slot>
  </div>
</template>

<script>
/* eslint-disable no-undef */
export default {
  props: ["title"],
}
</script>

<style></style>
