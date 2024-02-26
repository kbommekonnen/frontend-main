<template>
  <svg :style="iconStyles">
    <use
      xmlns:xlink="http://www.w3.org/1999/xlink"
      :xlink:href="'#' + name"
    ></use>
  </svg>
</template>
<script>
/* eslint-disable no-undef */
export default {
  name: "BaseIcon",
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: 16,
    },
    fill: {
      type: String,
      default: "currentColor",
    },
  },
  computed: {
    iconStyles() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
        fill: this.fill,
      }
    },
  },
}
</script>
