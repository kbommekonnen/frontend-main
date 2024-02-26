<template>
  <div class="flex flex-col space-y-1 h-full items-start bg-primaryBg">
    <modal-header title="withdrow form" @close="close" class="shadow-top"/>
    <PerfectScrollbar class="w-full">
      <div class="p-4 bg-white space-y-4 capitalize text-2xl">
        <account-selector
          label="account"
          placeholder="select account"
          class=""
          searchable
          padding="big"
          :accounts="accountsOptions"
          v-model="Form.account"
          :error="errors.account"
        />
        <base-input
          type="number"
          v-model="Form.amount"
          :error="errors.amount"
          label="amount"
          :size="24"
          required
          autofocus
          class="text-xl tracking-wide font-semibold"
        />
        <base-text-area
          label="reason"
          placeholder="reason"
          required
          v-model="Form.reason"
          :error="errors.reason"
          class=""
        />
        <div class="flex justify-center px-4 py-8 flex-shrink-0">
          <base-button
            :isWorking="working"
            label="save"
            :iconSize="18"
            icon="check-circle"
            class="px-3 py-1 rounded text-2xl w-full"
            @click="handleSave"
          />
        </div>
      </div>
    </PerfectScrollbar>
  </div>
</template>

<script setup>
import { inject, ref } from "vue"
import api from "../api.js"
import { openToast } from "../../../plugins/toast.js"
import { PerfectScrollbar } from "vue3-perfect-scrollbar"
import AccountSelector from "./AccountSelector.vue"

const postRequest = inject("postRequest") // inject axios
const bindJoiErrors = inject("bindJoiErrors")
const emit = defineEmits("close")

let Form = ref({
  account: "",
  amount: undefined,
  reason: ""
})
let errors = ref({})

let errorMessage = ref("")
let working = ref(false)

async function handleSave() {
  working.value = true
  setError({})
  errorMessage.value = ""
  const response = await postRequest({
    ...api.withdrow,
    data: Form.value,
  })
  if (response.joiError) {
    bindJoiErrors(response.joi, "account amount reason", setError)
  } else if (response.error) {
    errorMessage.value = response.message
  } else {
    openToast("withdrown successfully")
    resetForm()
  }

  working.value = false
}

function setError(error) {
  errors.value = error
}
function resetForm() {
  // console.info(Form.amount.value, Form.reason.value)
  Form.value.amount = 0
  Form.value.reason = ''
}
function close() {
  emit("close")
}
</script>

<style></style>
