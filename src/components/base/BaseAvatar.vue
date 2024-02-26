<template>
  <div :style="getImageStyle" v-if="avatarUrl" />
  <div v-else :style="getLetterStyle" class="letter items-center">
    <span v-if="!empty">
      <slot />
    </span>
    <span
      v-else
      class="text-white styledCache__StyledSpan-zohhd2-3 cwXEzS flex w-full h-full justify-center items-center"
    >
      <base-icon v-if="icon" :size="22" :name="icon" class="flex w-full" />
      <div
        v-else
        class="flex justify-center items-center h-full uppercase text-white"
      >
        <span style="font-size: 80%">{{ _2Letters }}</span>
      </div>
    </span>
  </div>
</template>
<script>
/* eslint-disable no-undef */
import { colorFromName } from "@/mixins/colorMixins"
export default {
  name: "Avatar",
  mixins: [colorFromName],
  props: {
    avatarUrl: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: "VITE",
    },
    size: {
      type: Number,
      default: 32,
    },
    empty: {
      type: Boolean,
      default: true,
    },
    rounded: {
      type: Boolean,
      default: true,
    },
    _2Letters: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      avatarColors: [
        "#DA7657",
        "#6ADA57",
        "#5784DA",
        "#AA57DA",
        "#DA5757",
        "#DA5792",
        "#57DACA",
        "#57A5DA",
      ],
    }
  },
  computed: {
    getImageStyle() {
      return {
        display: "inline-block",
        width: `${this.size}px`,
        height: `${this.size}px`,
        "border-radius": this.rounded ? "100%" : "3px",
        backgroundImage: `url('${this.avatarUrl}')`,
        backgroundPosition: "50% 50%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }
    },
    getLetterStyle() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
        background: this.getColorFromName(this.avatarColors, this.name || "AB"),
        fontSize: `${Math.round(this.size / 2)}px`,
        borderRadius: "50%",
      }
    },
  },
}
</script>
