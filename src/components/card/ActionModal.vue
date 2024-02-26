<template>
  <div class="space-y-4 rounded p-3">
    <div class="text-textLight">
      {{ title }}
    </div>
    <component v-if="component" v-bind="componentProps" :is="component" />
    <div class="flex px-4 first-letter:uppercase">{{ message }}</div>
    <slot></slot>
    <div class="flex justify-end space-x-3">
      <base-button
        :icon="icon"
        :label="label"
        :isWorking="working"
        @click="smartHandle"
      />
    </div>
  </div>
</template>

<script setup>
import { inject, ref } from "vue"
import { closeModal } from "../../plugins/modal"
const props = defineProps({
  title: { type: String, default: "" },
  message: { type: String, default: "" },
  icon: { type: String, default: "check" },
  label: { type: String, default: "Save" },
  api: { type: Object, default: () => ({}) },
  params: { type: [String, Object, Array] },
  component: {
    type: [Object, String],
    required: true,
  },
  componentProps: {
    type: Object,
    default: () => ({}),
  },
})
let working = ref(false)
const request = inject(["request"])
async function smartHandle() {
  if (working.value) return
  working.value = true
  await request({ ...props.api, params: [props.params] })
  working.value = false
  handleClose()
}
function handleClose() {
  closeModal()
}
</script>

<style></style>
