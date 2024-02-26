<template>
  <div class="py-2 text-textMedium space-y-4">
    <div class="pb-2 text-xl text-center border-b uppercase border-brightGray">
      <slot name="title">confirmation</slot>
    </div>
    <div class="space-y-4 px-4">
      <div>
        <slot></slot>
      </div>
      <div class="flex justify-end space-x-4 pt-2">
        <base-button
          label="No"
          :primary="false"
          class="py-1 px-4 text-textMedium bg-gray hover:bg-danger hover:text-error rounded"
          @click="handleNo"
        />
        <base-button
          label="Yes"
          class="py-1 px-4 rounded"
          :isWorking="isWorking"
          @click="handleYes"
        />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
export default {
  props: ["isWorking"],
  methods: {
    async handleYes() {
      this.$emit("yes")
    },
    handleNo() {
      this.$emit("no")
    },
  },
}
</script>

<style></style>
