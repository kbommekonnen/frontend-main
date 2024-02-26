<template>
  <div class="flex flex-col space-y-3 items-start">
    <div
      class="w-full capitalize text-xl tracking-wider border-b-2 border-primaryBg py-1"
    >
      {{ $t("add new warehouse") }}
    </div>
    <div class="w-full flex flex-col space-y-3">
      <div
        class="slide-right flex-grow capitalize space-y-4 content-start border-2 p-4 border-primaryBg"
      >
        <base-input
          label="warehouse name"
          placeholder="write warehouse name"
          required
          v-model="store.name"
          :error="store.jerrors.name"
        />
        <base-select
          label="parent warehouse"
          placeholder="under ..."
          required
          searchable
          :items="warehouseOptions"
          v-model="store.parent"
          :error="store.jerrors.parent"
        />
        <base-select
          v-if="supportsMultipleLocations"
          label="location"
          searchable
          placeholder="select location"
          icon="map-marker-alt"
          :items="locationOptions"
          v-model="store.location"
          :error="store.jerrors.location"
        />
        <div class="py-2">users</div>
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
import { inject, ref, toRefs } from "vue"
import { useWarehouseStore } from "../store.js"
import api from "../api.js"
import locationApi from "../../Locations/api.js"
import { closeModal } from "@/plugins/modal.js"
import { openToast } from "../../../plugins/toast"
import { usePreferencesStore } from "../../Settings/store.js"

const postRequest = inject("postRequest") // inject axios
const getRequest = inject("getRequest") // inject axios
const bindJoiErrors = inject("bindJoiErrors")

let store = useWarehouseStore()
let working = ref(false)
const locationOptions = ref([])
const warehouseOptions = ref([])
const { supportsMultipleLocations } = toRefs(usePreferencesStore())

getRequest(api.getVerified).then(({ items }) => {
  if (items) {
    warehouseOptions.value = items.map(({ id, name }) => ({
      label: name,
      value: id,
    }))
  }
})
if (supportsMultipleLocations.value)
  getRequest(locationApi.getVerified).then(({ items }) => {
    if (items) {
      locationOptions.value = items.map(({ id, name }) => ({
        label: name,
        value: id,
      }))
    }
  })

async function handleSave() {
  if (working.value) return
  working.value = true
  const response = await postRequest({
    ...api.create,
    data: store.form,
  })
  if (response.joiError) {
    bindJoiErrors(response.joi, "name parent location users", store.setError)
  } else if (response.error) {
    openToast(response.message, true)
  } else {
    openToast("warehouse created successfully")
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
