<template>
  <div class="flex flex-col space-y-3 items-start">
    <div
      class="w-full capitalize text-xl tracking-wider border-b-2 border-primaryBg py-1"
    >
      add new tax rate
    </div>
    <div class="w-full flex flex-col space-y-3">
      <div
        class="slide-right flex-grow capitalize space-y-4 content-start border-2 p-4 border-primaryBg"
      >
        <base-input
          label="name"
          placeholder="write tax name e.g. VAT, TOT"
          required
          v-model="store.name"
          :error="store.jerrors.name"
        />
        <base-input
          label="amount"
          placeholder="write tax amount"
          required
          v-model="store.amount"
          :error="store.jerrors.amount"
        />
        <base-radio
          label="How do you calculate tax amount"
          :items="rateTypeOptions"
          v-model="store.rateType"
          :error="store.jerrors.rateType"
          containerClass="grid grid-cols-2 gap-3 max-w-xl"
        >
          <template #item="{ item }">
            <div class="space-y-1">
              <div class="capitalize leading-tight flex flex-shrink-0 text-sm">
                {{ item.label }}
              </div>
              <div
                v-if="item.value == store.rateType"
                class="lowercase text-sm text-textLight"
              >
                {{ item.detail }}
              </div>
            </div>
          </template>
        </base-radio>
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
import { useTaxStore } from "../store.js"
import api from "../api.js"
import { closeModal } from "@/plugins/modal.js"
import { openToast } from "../../../plugins/toast"

const postRequest = inject("postRequest") // inject axios
const bindJoiErrors = inject("bindJoiErrors")

let store = useTaxStore()
let working = ref(false)
let rateTypeOptions = [
  { label: "flat", value: "Flat" },
  { label: "percentage", value: "Percentage" },
]

async function handleSave() {
  working.value = true
  const response = await postRequest({
    ...api.create,
    data: store.form,
  })
  if (response.joiError) {
    bindJoiErrors(response.joi, "name amount rateType", store.setError)
  } else if (response.error) {
    openToast(response.message, true)
  } else {
    openToast("tax created successfully")
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
