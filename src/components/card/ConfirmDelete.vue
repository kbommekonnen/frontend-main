<template>
  <div class="space-y-4 rounded p-3">
    <div class="text-textLight">
      {{ title }}
    </div>
    <div class="text-textMedium text-xl">{{ message }}</div>
    <div class="flex justify-between space-x-3">
      <base-button icon="times" label="No" @click="handleClose" />
      <base-button
        icon="check"
        label="Delete"
        :isWorking="loading"
        @click="handleDelete"
      />
    </div>
  </div>
</template>

<script setup>
import { inject } from "vue"
import { openToast } from "../../plugins/toast"

const props = defineProps([
  "title",
  "message",
  "toastMessage",
  "action",
  "api",
  "params",
  "loading",
])
const emit = defineEmits("close")

const deleteRequest = inject("deleteRequest")

async function handleDelete() {
  if (props.action) {
    await props.action(props.params)
  } else if (props.api) {
    const { error, message } = await deleteRequest(props.api)
    if (error) {
      openToast(message, true)
    } else {
      openToast(props.toastMessage || message)
    }
  }
  handleClose()
}
function handleClose() {
  emit("close")
}
</script>
