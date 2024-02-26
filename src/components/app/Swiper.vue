<template>
  <div>
    <div ref="container" class="container select-none">
      <div
        ref="target"
        class="flex justify-start items-center overlay right-32"
        :class="{ animated: !isSwiping }"
        :style="{ left, right, opacity }"
      >
        <slot>
          <p class="w-full bg-primary p-4">Swipe horizontal</p>
        </slot>
      </div>
    </div>
    <!-- <p class="status">
      Direction: {{ direction ? direction : "-" }} <br />
      lengthX: {{ lengthX }} | lengthY: {{ lengthY }} left: {{ left }} | right:
      {{ right }}
    </p> -->
  </div>
</template>

<script setup>
import { computed, ref } from "vue"
import { useSwipe } from "@vueuse/core"

const emit = defineEmits(["swipe"])

const target = ref()
const container = ref()
const containerWidth = computed(() => container.value?.offsetWidth)
const left = ref("0")
const right = ref("0")
const opacity = ref(1)
const { direction, isSwiping, lengthX, lengthY } = useSwipe(target, {
  passive: false,
  onSwipe: () => {
    if (containerWidth.value) {
      const length = Math.abs(lengthX.value)
      if (lengthX.value < 0) {
        left.value = `${length}px`
        right.value = `0`
        // opacity.value = 1.1 - length / containerWidth.value
      } else {
        left.value = "0"
        right.value = `${length}px`
        opacity.value = 1
      }
    }
  },
  onSwipeEnd() {
    console.log("direction ", direction.value)
    if (
      lengthX.value < 0 &&
      containerWidth.value &&
      Math.abs(lengthX.value) / containerWidth.value >= 0.5
    ) {
      left.value = "100%"
      right.value = "0"
      opacity.value = 1
    } else {
      left.value = "0"
      right.value = "100%"
      opacity.value = 1
    }
    lengthX.value = 0
    emit("swipe", direction.value)
  },
})
</script>

<style scoped></style>
