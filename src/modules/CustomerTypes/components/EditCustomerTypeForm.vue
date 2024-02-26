<template>
  <div class="flex flex-col space-y-1 items-start">
    <modal-header title="edit customer type" @close="handleClose" />

    <div class="w-full flex flex-col space-y-3">
      <div
        class="slide-right flex-grow capitalize space-y-4 content-start px-4 border-primaryBg"
      >
        <base-input
          label="name"
          placeholder="agent, whole sale, retailer ..."
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
import { useCustomerTypestore } from "../store.js"
import api from "../api.js"
import { closeModal } from "@/plugins/modal.js"
import { openToast } from "../../../plugins/toast"

const putRequest = inject("putRequest") // inject axios
const bindJoiErrors = inject("bindJoiErrors")

const props = defineProps({
  CustomerType: { type: Object, default: () => {} },
})

let store = useCustomerTypestore()
let working = ref(false)

// init
init()
function init() {
  store.name = props.CustomerType.name
  store.description = props.CustomerType.description
  store.isDefault = props.CustomerType.isDefault
}
async function handleUpdate() {
  if (working.value) return
  working.value = true
  const response = await putRequest({
    ...api.edit,
    params: [props.CustomerType._id],
    data: store.form,
  })
  if (response.joiError) {
    bindJoiErrors(response.joi, "name description isDefault", store.setError)
  } else if (response.error) {
    openToast(response.message, true)
  } else {
    openToast("customer type updated successfully")
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
