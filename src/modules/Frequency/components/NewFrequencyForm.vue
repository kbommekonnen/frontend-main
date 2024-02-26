<template>
  <div class="flex flex-col space-y-1 items-start">
    <modal-header title="add new frequency" @close="handleClose" />

    <div class="w-full flex flex-col space-y-3">
      <div
        class="slide-right flex-grow capitalize space-y-4 content-start px-4 border-primaryBg"
      >
        <base-input
          label="name"
          placeholder="weekly"
          required
          v-model="store.name"
          :error="store.jerrors.name"
          autofocus
          class="text-xl text-textDark"
        />
        <base-input
          label="no of days"
          placeholder="7"
          required
          class=""
          v-model.number="store.amount"
          :error="store.jerrors.amount"
        />
      </div>
      <div class="flex justify-end space-x-4">
        <base-button
          icon="check-circle"
          label="save"
          :isWorking="working"
          @click="handleSave"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref } from "vue"
import { useFrequenciestore } from "../store.js"
import api from "../api.js"
import { closeModal } from "@/plugins/modal.js"
import { openToast } from "../../../plugins/toast"

const postRequest = inject("postRequest") // inject axios
const bindJoiErrors = inject("bindJoiErrors")
let store = useFrequenciestore()
let working = ref(false)

async function handleSave() {
  working.value = true
  const response = await postRequest({
    ...api.create,
    data: store.form,
  })
  if (response.joiError) {
    bindJoiErrors(response.joi, "name amount", store.setError)
  } else if (response.error) {
    openToast(response.message, true)
  } else {
    openToast("frequency created successfully")
    store.$reset()
    handleClose()
  }
  working.value = false
}
function handleClose() {
  closeModal()
}
</script>

<style></style>
../../../plugins/toast.js