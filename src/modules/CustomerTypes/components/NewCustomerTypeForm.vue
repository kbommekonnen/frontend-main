<template>
  <div class="flex flex-col space-y-1 items-start">
    <modal-header title="add new customer type" @close="handleClose" />

    <div class="w-full flex flex-col space-y-3">
      <div
        class="slide-right flex-grow capitalize space-y-4 content-start px-4 border-primaryBg"
      >
        <base-input
          label="name"
          placeholder="agent, whole sales, ..."
          required
          v-model="store.name"
          :error="store.jerrors.name"
          autofocus
          class="text-xl text-textDark"
        />
        <base-text-area
          label="description"
          placeholder=""
          class=""
          v-model="store.description"
          :error="store.jerrors.description"
        />
        <div class="flex space-x-4">
          <switch-button
            v-model="store.isDefault"
            :error="store.jerrors.isDefault"
          />
          <div class="">{{ $t("make default") }}</div>
        </div>
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
import { useCustomerTypestore } from "../store.js"
import api from "../api.js"
import { closeModal } from "@/plugins/modal.js"
import { openToast } from "../../../plugins/toast"

const postRequest = inject("postRequest") // inject axios
const bindJoiErrors = inject("bindJoiErrors")
let store = useCustomerTypestore()
let working = ref(false)

async function handleSave() {
  working.value = true
  const response = await postRequest({
    ...api.create,
    data: store.form,
  })
  if (response.joiError) {
    bindJoiErrors(response.joi, "name description isDefault", store.setError)
  } else if (response.error) {
    openToast(response.message, true)
  } else {
    openToast("customer type created successfully")
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
