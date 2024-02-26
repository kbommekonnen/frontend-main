<template>
  <div :style="getImageStyle" v-if="avatarUrl" />
  <div v-else :style="getLetterStyle" class="letter">
    <span v-if="!empty">
      <slot />
    </span>
    <span v-else class="styledCache__StyledSpan-zohhd2-3 cwXEzS">
      <svg v-if="icon">
        <use
          xmlns:xlink="http://www.w3.org/1999/xlink"
          :xlink:href="`#${icon}`"
        ></use>
      </svg>
      <div
        v-else
        class="flex justify-center items-center h-full uppercase text-white"
      >
        <span style="font-size: 80%">{{ name }}</span>
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
      default: "",
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
