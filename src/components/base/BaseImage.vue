<template>
  <div
    class="flex justify-center rounded bg-brightGray z-10 grow-active group items-center"
  >
    <div v-if="src" class="relative">
      <div
        class="absolute top-0 right-0 bottom-0 left-0 z-20 bg-black opacity-50 text-white hidden group-hover:flex justify-center items-center cursor-pointer"
        @click="expandImg('photo')"
      >
        <base-icon name="expand" :size="20" />
      </div>
      <img
        ref="photo"
        class="w-full h-full rounded hover:opacity-75"
        :src="PROFILE_PATH + src"
        v-viewer="{ inline: false, movable: true }"
        alt=""
      />
    </div>
    <base-icon v-else :name="placeholder || 'image'" :size="22" />
  </div>
</template>

<script>
/* eslint-disable no-undef */
import { PROFILE_PATH } from "@/config/config"
export default {
  props: ["src", "placeholder"],
  data() {
    return {
      PROFILE_PATH,
    }
  },
  methods: {
    expandImg(ref) {
      this.$refs[ref].click()
    },
  },
}
</script>

<style></style>
