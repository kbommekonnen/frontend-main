<template>
  <div class="flex flex-col space-y-3 items-start">
    <div
      class="w-full capitalize text-xl tracking-wider border-b-2 border-primaryBg py-1"
    >
      {{ $t("edit measurement unit") }}
    </div>
    <div class="w-full flex flex-col space-y-3">
      <div
        class="slide-right flex-grow capitalize space-y-4 content-start border-2 p-4 border-primaryBg"
      >
        <base-input
          label="unit name"
          placeholder="write measurement unit name"
          required
          v-model="store.name"
          :error="store.jerrors.name"
        />
        <base-input
          label="short name"
          placeholder="short name"
          required
          v-model="store.shortName"
          :error="store.jerrors.shortName"
        />
        <base-input
          label="description"
          placeholder="write measurement unit description"
          class=""
          v-model="store.description"
          :error="store.jerrors.description"
        />
        <div class="flex space-x-4">
          <switch-button
            v-model="store.isPrimary"
            :error="store.jerrors.description"
          />
          <div class="">{{ $t("primary unit") }}</div>
        </div>
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
          @click="handleUpdate"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref } from "vue"
import { useMeasurementUnitStore } from "../store.js"
import api from "../api.js"
import { closeModal } from "@/plugins/modal.js"
import { openToast } from "../../../plugins/toast"

const putRequest = inject("putRequest") // inject axios
const bindJoiErrors = inject("bindJoiErrors")

const props = defineProps({
  measurementUnit: { type: Object, default: () => {} },
})

let store = useMeasurementUnitStore()
let working = ref(false)

// init
init()
function init() {
  store.name = props.measurementUnit.name
  store.shortName = props.measurementUnit.shortName
  store.description = props.measurementUnit.description
  store.isPrimary = props.measurementUnit.isPrimary
}
async function handleUpdate() {
  if (working.value) return
  working.value = true
  const response = await putRequest({
    ...api.edit,
    params: [props.measurementUnit._id],
    data: store.form,
  })
  if (response.joiError) {
    bindJoiErrors(response.joi, "name shortName description", store.setError)
  } else if (response.error) {
    openToast(response.message, true)
  } else {
    openToast("measurement unit updated successfully")
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
