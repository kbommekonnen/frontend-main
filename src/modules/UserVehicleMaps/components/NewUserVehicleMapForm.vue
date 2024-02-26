<template>
  <div class="flex flex-col space-y-1 items-start">
    <modal-header title="add new UserVehicleMap" @close="handleClose" />

    <div class="w-full flex flex-col space-y-3">
      <div
        class="slide-right flex-grow capitalize space-y-4 content-start px-4 border-primaryBg"
      >

      <base-input type="text" label="user" placeholder="" v-model="store.user" :error="store.jerrors.user" class="" required autofocus />

      <base-input type="text" label="vehicle" placeholder="" v-model="store.vehicle" :error="store.jerrors.vehicle" class="" required />


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
import { useUserVehicleMapsstore } from "../store.js"
import api from "../api.js"
import { closeModal } from "@/plugins/modal.js"
import { openToast } from "@/plugins/toast"

const postRequest = inject("postRequest") // inject axios
const bindJoiErrors = inject("bindJoiErrors")
let store = useUserVehicleMapsstore()
let working = ref(false)

async function handleSave() {
  working.value = true
  const response = await postRequest({
    ...api.create,
    data: store.form,
  })
  if (response.joiError) {
    bindJoiErrors(response.joi, "user vehicle ", store.setError)
  } else if (response.error) {
    openToast(response.message, true)
  } else {
    openToast("uservehiclemap created successfully")
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
