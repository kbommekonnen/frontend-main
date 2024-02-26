<template>
  <div class="flex flex-col space-y-1 items-start">
    <modal-header title="edit frequency" @close="handleClose" />

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
          label="amount"
          placeholder="7"
          required
          class=""
          v-model.number="store.amount"
          :error="store.jerrors.amount"
        />
      </div>
      <div class="flex justify-end space-x-4">
        <base-button
          icon="edit"
          label="update"
          :isWorking="working"
          @click="handleUpdate"
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

const putRequest = inject("putRequest") // inject axios
const bindJoiErrors = inject("bindJoiErrors")

const props = defineProps({
  Frequency: { type: Object, default: () => {} },
})

let store = useFrequenciestore()
let working = ref(false)

// init
init()
function init() {
  store.name = props.Frequency.name
  store.amount = props.Frequency.amount
}
async function handleUpdate() {
  if (working.value) return
  working.value = true
  const response = await putRequest({
    ...api.edit,
    params: [props.Frequency._id],
    data: store.form,
  })
  if (response.joiError) {
    bindJoiErrors(response.joi, "name amount", store.setError)
  } else if (response.error) {
    openToast(response.message, true)
  } else {
    openToast("frequency updated successfully")
    store.$reset()
    closeModal()
  }
  working.value = false
}
function handleClose() {
  closeModal()
}
</script>

<style></style>
