<template>
  <div class="flex flex-col space-y-1 items-start">
    <modal-header title="add new Boarding" @close="handleClose" />

    <div class="w-full flex flex-col space-y-3">
      <div
        class="slide-right flex-grow capitalize space-y-4 content-start px-4 border-primaryBg"
      >

      <base-input type="text" label="route" placeholder="" v-model="store.route" :error="store.jerrors.route" class="" required autofocus />

      <base-input type="text" label="vehicle" placeholder="" v-model="store.vehicle" :error="store.jerrors.vehicle" class="" required />

      <base-input type="text" label="items" placeholder="" v-model="store.items" :error="store.jerrors.items" class="" required />

      <base-input type="text" label="users" placeholder="" v-model="store.users" :error="store.jerrors.users" class="" required />


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
import { useBoardingsstore } from "../store.js"
import api from "../api.js"
import { closeModal } from "@/plugins/modal.js"
import { openToast } from "@/plugins/toast"

const putRequest = inject("putRequest") // inject axios
const bindJoiErrors = inject("bindJoiErrors")

const props = defineProps({
  Boarding: { type: Object, default: () => {} },
})

let store = useBoardingsstore()
let working = ref(false)

// init
init()
function init() {
	store.route = props.Boarding.route
	store.vehicle = props.Boarding.vehicle
	store.items = props.Boarding.items
	store.users = props.Boarding.users
}
async function handleUpdate() {
  if (working.value) return
  working.value = true
  const response = await putRequest({
    ...api.edit,
    params: [props.Boarding._id],
    data: store.form,
  })
  if (response.joiError) {
    bindJoiErrors(response.joi, "route vehicle items users ", store.setError,)
  } else if (response.error) {
    openToast(response.message, true)
  } else {
    openToast("boarding updated successfully")
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
