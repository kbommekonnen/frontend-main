<template>
  <div class="flex flex-col space-y-1 items-start">
    <modal-header title="add new Route" @close="handleClose" />

    <div class="w-full flex flex-col space-y-3">
      <div
        class="slide-right flex-grow capitalize space-y-4 content-start px-4 border-primaryBg"
      >
        <base-input
          type="text"
          label="name"
          placeholder="route x"
          v-model="store.name"
          :error="store.jerrors.name"
          class=""
          required
          autofocus
        />

        <base-text-area
          label="description"
          placeholder="detail description"
          v-model="store.description"
          :error="store.jerrors.description"
          class=""
          required
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
import { useRoutestore } from "../store.js"
import api from "../api.js"
import { closeModal } from "@/plugins/modal.js"
import { openToast } from "@/plugins/toast"

const putRequest = inject("putRequest") // inject axios
const bindJoiErrors = inject("bindJoiErrors")

const props = defineProps({
  Route: { type: Object, default: () => {} },
})

let store = useRoutestore()
let working = ref(false)

// init
init()
function init() {
  store.name = props.Route.name
  store.description = props.Route.description
}
async function handleUpdate() {
  if (working.value) return
  working.value = true
  const response = await putRequest({
    ...api.edit,
    params: [props.Route._id],
    data: store.form,
  })
  if (response.joiError) {
    bindJoiErrors(response.joi, "name description ", store.setError)
  } else if (response.error) {
    openToast(response.message, true)
  } else {
    openToast("route updated successfully")
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
