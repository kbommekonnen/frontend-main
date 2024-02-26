<template>
  <confirm-template @no="cancel" @yes="proceed">
    <template #title>
      <div class="uppercase">{{ title || "Confirmation" }}</div>
    </template>
    <template>
      <div>{{ message }}</div>
    </template>
  </confirm-template>
</template>

<script>
/* eslint-disable no-undef */
import ConfirmTemplate from "./ConfirmTemplate.vue"
export default {
  props: ["title", "message"],
  components: { ConfirmTemplate },
  methods: {
    cancel() {
      this.$emit("close")
    },
    proceed() {
      this.$emit("close", { invokeCb: true })
    },
  },
}
</script>

<style></style>
