<template>
  <div v-if="isActive" @click="$emit('clicked')" class="tab">
    <slot></slot>
  </div>
</template>

<script>
/* eslint-disable no-undef */
export default {
  props: {
    title: { type: String, default: "tab" },
    icon: { type: String },
    top: { type: Boolean },
  },
  data() {
    return {
      isActive: false,
    }
  },
}
</script>

<style>
.tab {
  animation: tab-slider 0.5s;
}
@keyframes tab-slider {
  0% {
    transform: translateY(20px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
