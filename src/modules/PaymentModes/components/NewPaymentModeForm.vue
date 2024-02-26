<template>
  <div class="flex flex-col space-y-1 items-start">
    <modal-header title="add new payment mode" @close="handleClose" />

    <div class="w-full flex flex-col space-y-3">
      <div
        class="slide-right flex-grow capitalize space-y-4 content-start px-4 border-primaryBg"
      >
        <base-input
          label="name"
          placeholder="cash, cheque, telebirr ..."
          required
          v-model="store.name"
          :error="store.jerrors.name"
          autofocus
          class="text-xl text-textDark"
        />
        <base-text-area
          label="description"
          placeholder=""
          class=""
          v-model="store.description"
          :error="store.jerrors.description"
        />
        <account-selector
          v-if="supportsAccount"
          label="account"
          placeholder="select account"
          class=""
          searchable
          padding="big"
          v-model="store.gl"
          :error="store.jerrors.gl"
        />
        <div class="flex space-x-4">
          <switch-button
            v-model="store.isDefault"
            :error="store.jerrors.isDefault"
          />
          <div class="">{{ $t("make default") }}</div>
        </div>
      </div>
      <div class="flex justify-end space-x-4">
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
import { usePaymentModestore } from "../store.js"
import api from "../api.js"
import { closeModal } from "@/plugins/modal.js"
import { openToast } from "../../../plugins/toast"
import { usePreferencesStore } from "../../Settings/store.js"
import AccountSelector from "../../Accounting/components/AccountSelector.vue"

const postRequest = inject("postRequest") // inject axios
const bindJoiErrors = inject("bindJoiErrors")
const { supportsAccount } = toRefs(usePreferencesStore())
let store = usePaymentModestore()
let working = ref(false)

async function handleSave() {
  working.value = true
  const response = await postRequest({
    ...api.create,
    data: store.form,
  })
  if (response.joiError) {
    bindJoiErrors(response.joi, "name gl description isDefault", store.setError)
  } else if (response.error) {
    openToast(response.message, true)
  } else {
    openToast("payment mode created successfully")
    store.$reset()
    handleClose()
  }
  working.value = false
}
function handleClose() {
  closeModal()
}
</script>

<style></style>
