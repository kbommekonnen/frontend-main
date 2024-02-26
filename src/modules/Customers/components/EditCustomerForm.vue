<template>
  <div class="flex flex-col space-y-1 items-start">
    <modal-header title="add new Customer" @close="handleClose" />

    <div class="w-full flex flex-col space-y-3">
      <div
        class="slide-right flex-grow capitalize space-y-4 content-start px-4 border-primaryBg"
      >

      <base-input type="text" label="name" placeholder="" v-model="store.name" :error="store.jerrors.name" class="" required autofocus />

      <base-input type="tel" label="tel" placeholder="" v-model="store.tel" :error="store.jerrors.tel" class="" required />

      <base-input type="text" label="location" placeholder="" v-model="store.location" :error="store.jerrors.location" class="" />


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
import { useCustomersstore } from "../store.js"
import api from "../api.js"
import { closeModal } from "@/plugins/modal.js"
import { openToast } from "@/plugins/toast"

const putRequest = inject("putRequest") // inject axios
const bindJoiErrors = inject("bindJoiErrors")

const props = defineProps({
  Customer: { type: Object, default: () => {} },
})

let store = useCustomersstore()
let working = ref(false)

// init
init()
function init() {
	store.name = props.Customer.name
	store.tel = props.Customer.tel
	store.location = props.Customer.location
}
async function handleUpdate() {
  if (working.value) return
  working.value = true
  const response = await putRequest({
    ...api.edit,
    params: [props.Customer._id],
    data: store.form,
  })
  if (response.joiError) {
    bindJoiErrors(response.joi, "name tel location ", store.setError,)
  } else if (response.error) {
    openToast(response.message, true)
  } else {
    openToast("customer updated successfully")
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
