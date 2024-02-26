<template>
  <div class="space-y-4 rounded p-3 first-letter:capitalize">
    <div class="text-textLight">{{ $t("change status") }}</div>
    <component v-if="component" v-bind="componentProps" :is="component" />
    <div class="text-xl" v-else-if="message">{{ message }}</div>
    <div class="flex space-x-3 capitalize">
      <base-select
        placeholder="change status"
        :items="statusOptions"
        v-model="status"
        class="flex-grow"
      />
      <base-button
        icon="check"
        label="change status"
        class="flex-shrink-0"
        :isWorking="loading"
        @click="changeStatus"
      />
    </div>
  </div>
</template>
<script setup>
import { computed, inject, ref } from "vue"
const emit = defineEmits(["close"])
const putRequest = inject("putRequest")
const props = defineProps({
  message: {
    type: String,
    default: "Are you sure you really want to change status",
  },
  api: { type: String, default: "" },
  defaultStatus: { type: String, default: "" },
  params: { type: Array, default: () => [] },
  options: { type: Array, default: () => [] },
  component: {
    type: [Object, String],
    required: true,
  },
  componentProps: {
    type: Object,
    default: () => ({}),
  },
})
let loading = ref(false)
let status = ref(props.defaultStatus)
const statusOptions = computed(() =>
  props.options.map((status) => ({
    label: status.toUpperCase(),
    value: status,
  })),
)
async function changeStatus() {
  loading.value = true
  const response = await putRequest({
    ...props.api,
    params: props.params,
    data: { status: status.value },
  })
  if (response) {
    // eventBus.$emit("refresh");
    // eventBus.$emit("open-toast", {
    //   message: "Status changed successfully",
    // });
    handleClose()
  } else {
    // eventBus.$emit("open-toast", {
    //   error: true,
    //   message: response.message,
    // });
  }
  loading.value = false
}
function handleClose() {
  emit("close")
}
</script>

<style></style>
