<template>
  <div class="flex flex-col space-y-3 itemGroups-start">
    <div
      class="w-full capitalize text-xl tracking-wider border-b-2 border-primaryBg py-1"
    >
      create new item group
    </div>
    <div class="w-full flex flex-col space-y-6">
      <div class="">
        create multiple variants of the same item using item groups
      </div>
      <div
        class="slide-right flex-grow capitalize space-y-4 content-start border-2 p-4 py-6 border-primaryBg"
      >
        <base-input
          label="item group name"
          placeholder=""
          required
          v-model="store.name"
          @enter="handleProceed"
          :error="store.jerrors.name"
        />
      </div>
      <div class="flex justify-end space-x-4">
        <base-button
          icon=""
          label="cancel"
          type="secondary"
          @click="handleClose"
        />
        <base-button
          icon="chevron-right"
          iconRight
          label="proceed"
          :isWorking="working"
          @click="handleProceed"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useItemGroupstore } from "../store.js"
import { closeModal } from "@/plugins/modal.js"

import { useRouter } from "vue-router"
const router = useRouter()

let store = useItemGroupstore()

async function handleProceed() {
  handleClose()
  router.push({
    name: "AddNewItemGroup",
  })
}
function handleClose() {
  closeModal()
}
</script>

<style></style>
