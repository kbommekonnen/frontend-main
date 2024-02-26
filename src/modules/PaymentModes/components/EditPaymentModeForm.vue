<template>
  <div class="flex flex-col space-y-1 items-start">
    <modal-header title="edit payment mode" @close="handleClose" />

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
import { inject, ref, toRefs } from "vue"
import { usePaymentModestore } from "../store.js"
import api from "../api.js"
import { closeModal } from "@/plugins/modal.js"
import { openToast } from "../../../plugins/toast"
import AccountSelector from "../../Accounting/components/AccountSelector.vue"
import { usePreferencesStore } from "../../Settings/store"
const { supportsAccount } = toRefs(usePreferencesStore())

const putRequest = inject("putRequest") // inject axios
const bindJoiErrors = inject("bindJoiErrors")

const props = defineProps({
  PaymentMode: { type: Object, default: () => {} },
})

let store = usePaymentModestore()
let working = ref(false)

// init
init()
function init() {
  store.name = props.PaymentMode.name
  store.description = props.PaymentMode.description
  store.gl = props.PaymentMode.gl
  store.isDefault = props.PaymentMode.isDefault
}
async function handleUpdate() {
  if (working.value) return
  working.value = true
  const response = await putRequest({
    ...api.edit,
    params: [props.PaymentMode._id],
    data: store.form,
  })
  if (response.joiError) {
    bindJoiErrors(response.joi, "name gl description isDefault", store.setError)
  } else if (response.error) {
    openToast(response.message, true)
  } else {
    openToast("payment mode updated successfully")
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
