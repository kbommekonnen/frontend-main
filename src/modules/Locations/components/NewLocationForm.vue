<template>
  <div class="flex flex-col space-y-3 items-start">
    <div
      class="w-full capitalize text-xl tracking-wider border-b-2 border-primaryBg py-1"
    >
      add new location
    </div>
    <div class="w-full flex flex-col space-y-3">
      <div
        class="slide-right flex-grow capitalize space-y-4 content-start border-2 p-4 border-primaryBg"
      >
        <base-input
          label="location name"
          placeholder="write location name"
          required
          v-model="store.name"
          :error="store.jerrors.name"
        />
        <base-input
          label="description"
          placeholder="write location description"
          class=""
          v-model="store.description"
          :error="store.jerrors.description"
        />
      </div>
      <div
        class="capitalize content-start border-2 p-4 border-primaryBg grid grid-cols-2 gap-4"
      >
        <base-input
          label="country"
          placeholder="write country"
          required
          v-model="store.country"
          :error="store.jerrors.country"
        />
        <base-input
          label="region"
          placeholder="write region"
          required
          v-model="store.region"
          :error="store.jerrors.region"
        />
        <base-input
          label="city"
          placeholder="write city"
          required
          v-model="store.city"
          :error="store.jerrors.city"
        />
        <base-input
          label="street"
          placeholder="write street"
          required
          v-model="store.street"
          :error="store.jerrors.street"
        />
      </div>
      <div class="flex justify-between space-x-4">
        <base-button
          icon="check-circle"
          label="close"
          type="secondary"
          @click="handleClose"
        />
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
import { useLocationStore } from "../store.js"
import api from "../api.js"
import { closeModal } from "@/plugins/modal.js"
import { openToast } from "../../../plugins/toast"

const postRequest = inject("postRequest") // inject axios
const bindJoiErrors = inject("bindJoiErrors")

let store = useLocationStore()
let working = ref(false)

async function handleSave() {
  working.value = true
  const response = await postRequest({
    ...api.create,
    data: store.form,
  })
  if (response.joiError) {
    bindJoiErrors(
      response.joi,
      "name country region city street description",
      store.setError,
    )
  } else if (response.error) {
    openToast(response.message, true)
  } else {
    openToast("location created successfully")
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
