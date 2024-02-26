<template>
  <div class="flex flex-col space-y-1 h-full items-start bg-primaryBg p-1">
    <modal-header title="edit withdrow" @close="close" class="shadow-top"/>
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
            label="update"
            :iconSize="18"
            icon="check-circle"
            class="px-3 py-1 rounded text-2xl w-full"
            @click="handleUpdate"
          />
        </div>
      </div>
    </PerfectScrollbar>
  </div>
</template>

<script setup>
import { inject, onMounted, ref } from "vue"
import api from "../api.js"
import { openToast } from "../../../plugins/toast.js"
import { PerfectScrollbar } from "vue3-perfect-scrollbar"
import AccountSelector from "./AccountSelector.vue"

const putRequest = inject("putRequest") // inject axios
const bindJoiErrors = inject("bindJoiErrors")
const emit = defineEmits("close")

const props = defineProps(["_id", "account", "amount", "reason"])


let Form = ref({
  account: props.account,
  amount: props.amount,
  reason: props.reason,
})

onMounted(()=> {
  // populate data
  // Form.value.account = props.account;
  // Form.value.amount = props.amount;
  // Form.value.reason = props.reason;
})

let errors = ref({})

let errorMessage = ref("")
let working = ref(false)

async function handleUpdate() {
  working.value = true
  setError({})
  errorMessage.value = ""
  // send only updated values
  const data = Object.entries(Form.value).reduce((acc, [key, value])=> value != props[key] ? {...acc, [key]: value} : acc, {})
  const response = await putRequest({
    ...api.updateWithdrow,
    params: [props._id],
    data,
  })
  if (response.joiError) {
    bindJoiErrors(response.joi, "account amount reason", setError)
  } else if (response.error) {
    errorMessage.value = response.message
  } else {
    openToast("updated successfully")
    close()
  }

  working.value = false
}

function setError(error) {
  errors.value = error
}
function close() {
  emit("close")
}
</script>

<style></style>
