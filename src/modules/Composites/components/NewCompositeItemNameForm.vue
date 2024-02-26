<template>
  <div class="flex flex-col space-y-3 items-start">
    <div
      class="w-full capitalize text-xl tracking-wider border-b-2 border-primaryBg py-1"
    >
      create new composite
    </div>
    <div class="w-full flex flex-col space-y-6">
      <div class="">
        organize your inventory by setting prices, adding barcodes, tracking
        across warehouses and much more
      </div>
      <div
        class="slide-right flex-grow capitalize space-y-4 content-start border-2 p-4 py-6 border-primaryBg"
      >
        <base-input
          label="composite name"
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
          :iconRight="true"
          label="proceed"
          :isWorking="working"
          @click="handleProceed"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCompositestore } from "../store.js"
import { closeModal } from "@/plugins/modal.js"

import { useRouter } from "vue-router"
const router = useRouter()

let store = useCompositestore()

async function handleProceed() {
  handleClose()
  router.push({
    name: "AddNewComposite",
  })
}
function handleClose() {
  closeModal()
}
</script>

<style></style>
