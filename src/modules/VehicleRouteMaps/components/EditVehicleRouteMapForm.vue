<template>
  <div class="flex flex-col space-y-1 items-start">
    <modal-header title="add new VehicleRouteMap" @close="handleClose" />

    <div class="w-full flex flex-col space-y-3">
      <div
        class="slide-right flex-grow capitalize space-y-4 content-start px-4 border-primaryBg"
      >

      <base-input type="text" label="vehicle" placeholder="" v-model="store.vehicle" :error="store.jerrors.vehicle" class="" required autofocus />

      <base-input type="text" label="route" placeholder="" v-model="store.route" :error="store.jerrors.route" class="" required />


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
import { useVehicleRouteMapsstore } from "../store.js"
import api from "../api.js"
import { closeModal } from "@/plugins/modal.js"
import { openToast } from "@/plugins/toast"

const putRequest = inject("putRequest") // inject axios
const bindJoiErrors = inject("bindJoiErrors")

const props = defineProps({
  VehicleRouteMap: { type: Object, default: () => {} },
})

let store = useVehicleRouteMapsstore()
let working = ref(false)

// init
init()
function init() {
	store.vehicle = props.VehicleRouteMap.vehicle
	store.route = props.VehicleRouteMap.route
}
async function handleUpdate() {
  if (working.value) return
  working.value = true
  const response = await putRequest({
    ...api.edit,
    params: [props.VehicleRouteMap._id],
    data: store.form,
  })
  if (response.joiError) {
    bindJoiErrors(response.joi, "vehicle route ", store.setError,)
  } else if (response.error) {
    openToast(response.message, true)
  } else {
    openToast("vehicleroutemap updated successfully")
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
