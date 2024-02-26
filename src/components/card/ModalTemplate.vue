<template>
  <div class="py-2 text-textMedium space-y-4">
    <div class="pb-2 text-xl text-center border-b-2 uppercase border-gray">
      <slot name="title">new item</slot>
    </div>
    <div class="space-y-4 px-4">
      <div>
        <slot></slot>
      </div>
      <div class="flex justify-between pt-2 pb-1">
        <base-button
          label="Cancel"
          :primary="false"
          class="py-1 px-4 text-textMedium bg-gray hover:bg-danger hover:text-error rounded"
          @click="cancel"
        />
        <base-button
          :label="saveLabel ? saveLabel : 'Save'"
          class="py-1 px-4 rounded"
          :isWorking="isWorking"
          @click="handleSave"
        />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
export default {
  props: ["isWorking", "saveLabel"],
  methods: {
    async handleSave() {
      this.$emit("save")
    },
    cancel() {
      this.$emit("cancel")
    },
  },
}
</script>

<style></style>
