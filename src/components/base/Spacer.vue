<template>
  <div :style="{ height: size + 'px', backgroundColor: color }"></div>
</template>

<script>
/* eslint-disable no-undef */
export default {
  props: {
    color: { type: String, default: "#5D6D7A55" }, //dgray },
    size: { type: Number, default: 1 },
  },
}
</script>

<style></style>
