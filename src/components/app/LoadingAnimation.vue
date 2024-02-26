<template>
  <div class="flex justify-center relative items-center">
    <canvas class="bg-transparent flex justiy-center" id="canvas"> </canvas>
    <div
      class="flex flex-col justify-center items-center h-full text-4xl text-center absolute rounded-circle border border-primary"
      :style="{ width: `${height}px` }"
    >
      {{ progress }}
      <base-icon
        v-if="finished || progress == total"
        name="check"
        :size="48"
        class="text-primary"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
/* eslint-disable no-undef */
export default {
  props: {
    progress: { type: Number, default: 0 },
    total: { type: Number, default: 100 },
    finished: { type: Boolean, default: false },
  },
  data() {
    return {
      context: "",
      canvas: "",
    }
  },
  methods: {
    drawAnimation() {
      this.context.beginPath()
      this.context.arc(
        this.width / 2,
        this.height / 2,
        this.canvas.offsetHeight / 2,
        -Math.PI / 2,
        (2 * Math.PI * this.progress) / this.total - Math.PI / 2,
      )
      this.context.stroke()
    },
  },
  computed: {
    width() {
      return this.canvas.offsetWidth || 0
    },
    height() {
      return this.canvas.offsetHeight || 0
    },
  },
  watch: {
    progress() {
      if (this.progress) this.drawAnimation()
    },
  },
  mounted() {
    this.canvas = document.getElementById("canvas")
    this.context = this.canvas.getContext("2d")
    this.context.lineWidth = 8
    this.context.strokeStyle = "#3F73BF"
    this.drawAnimation()
  },
}
</script>

<style></style>
