<template>
  <div class="flex flex-col space-y-3 items-start">
    <modal-header title="add new item category" @close="handleClose" />
    <div class="w-full flex flex-col space-y-3">
      <div
        class="slide-right flex-grow capitalize space-y-4 content-start border-2 p-4 border-primaryBg"
      >
        <base-input
          label="category name"
          placeholder="write category name"
          required
          v-model.trim="store.name"
          :error="store.jerrors.name"
          class="font-semibold"
          style="font-size: 2rem"
          autofocus
          padding="big"
          @enter="handleSave"
        />
        <base-text-area
          :rows="2"
          label="description"
          placeholder="write category description"
          bordered
          v-model="store.description"
          :error="store.jerrors.description"
        />
      </div>
      <div class="flex justify-between space-x-4">
        <base-button
          icon="times"
          label="close"
          type=""
          class="bg-primaryBg"
          @click="handleClose"
        />
        <base-button
          icon="check-circle"
          label="save"
          :isWorking="working"
          @click="handleSave"
          class="text-xl"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref } from "vue"
import { useItemCategoriestore } from "../store.js"
import api from "../api.js"
import { closeModal } from "@/plugins/modal.js"
import { openToast } from "../../../plugins/toast"
import ModalHeader from "../../../components/card/modal/ModalHeader.vue"
import { onKeyPressed } from "@vueuse/core"
const postRequest = inject("postRequest") // inject axios
const bindJoiErrors = inject("bindJoiErrors")

let store = useItemCategoriestore()
let working = ref(false)

onKeyPressed("n", (e) => {
  e.preventDefault()
  if (e.ctrlKey) handleSave
})

async function handleSave() {
  if (working.value) return
  working.value = true
  const response = await postRequest({
    ...api.create,
    data: store.form,
  })
  if (response.joiError) {
    bindJoiErrors(response.joi, "name description", store.setError)
  } else if (response.error) {
    openToast(response.message, true)
  } else {
    openToast("category created successfully")
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
