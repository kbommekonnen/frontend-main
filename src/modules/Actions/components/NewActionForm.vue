<template>
  <div class="flex flex-col space-y-3 items-start">
    <div
      class="w-full capitalize text-xl tracking-wider border-b-2 border-primaryBg py-1"
    >
      add new action
    </div>
    <div class="w-full flex flex-col space-y-3">
      <div
        class="slide-right flex-grow capitalize space-y-4 content-start border-2 p-4 border-primaryBg"
      >
        <base-input
          label="action name"
          placeholder="write action name"
          required
          v-model="store.actionName"
          :error="store.jerrors.actionName"
        />
        <base-input
          label="action code"
          placeholder="write action code"
          required
          v-model="store.actionCode"
          :error="store.jerrors.actionCode"
        />
        <base-select
          label="module"
          placeholder="select module"
          required
          :items="moduleOptions"
          v-model="store.module"
          :error="store.jerrors.module"
        />
        <base-multi-select
          label="required actions"
          placeholder="select actions"
          searchable
          :items="actionOptions"
          v-model="store.requiredActions"
          :error="store.jerrors.requiredActions"
        />
        <base-text-area
          label="description"
          placeholder="write action description"
          class=""
          :rows="2"
          v-model="store.description"
          :error="store.jerrors.description"
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
import { useActionStore } from "../store.js"
import api from "../api.js"
// import moduleApi from "../../Modules/api.js"

import { closeModal } from "@/plugins/modal.js"
import { openToast } from "../../../plugins/toast"

const postRequest = inject("postRequest") // inject axios
const getRequest = inject("getRequest") // inject axios
const bindJoiErrors = inject("bindJoiErrors")

let store = useActionStore()
let actionOptions = ref([])
let working = ref(false)

// initialize
// getRequest(moduleApi.getVerified).then(({ items }) => {
//   if (items) {
//     moduleOptions.value = items.map(({ name, _id }) => ({
//       label: name,
//       value: _id,
//     }))
//   }
// })
getRequest(api.getVerified).then(({ items }) => {
  if (items) {
    actionOptions.value = items.map(({ actionName, _id }) => ({
      label: actionName,
      value: _id,
    }))
  }
})

async function handleSave() {
  working.value = true
  const response = await postRequest({
    ...api.create,
    data: store.form,
  })
  if (response.joiError) {
    bindJoiErrors(
      response.joi,
      "actionName actionCode module requiredActions description",
      store.setError,
    )
  } else if (response.error) {
    openToast(response.message, true)
  } else {
    openToast("action created successfully")
    closeModal()
  }
  working.value = false
}
function handleClose() {
  closeModal()
}
</script>

<style></style>
