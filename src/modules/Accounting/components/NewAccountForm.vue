<template>
  <div class="flex flex-col space-y-1 h-full items-start bg-primaryBg p-1">
    <div class="flex justify-between w-full bg-white shadow-top p-4">
      <div class="flex-grow flex justify-between items-center">
        <div class="capitalize font-semibold text-xl tracking-wider">
          {{ $t("new account") }}
        </div>
        <base-icon
          name="times"
          :size="28"
          class="hover:bg-primaryBg cursor-pointer"
          v-tippy
          content="close"
          @click="close"
        />
      </div>
    </div>
    <PerfectScrollbar class="w-full">
      <div class="p-4 bg-white space-y-4 capitalize text-2xl">
        <base-input
          v-model="store.name"
          :error="store.jerrors.name"
          label="account name"
          :size="24"
          required
          autofocus
          class="text-xl tracking-wide font-semibold"
        />
        <base-input
          label="code"
          placeholder="code"
          required
          padding="big"
          v-model="store.code"
          :error="store.jerrors.code"
          class="capitalize"
        />
        <base-switch v-model="store.side" label="side" :items="sideOptions" />
        <base-check-box
          v-model="store.isSubAccount"
          label="mark as sub account"
          class="normal-case"
        />
        <account-selector
          v-if="store.isSubAccount"
          label="parent"
          placeholder="select parent"
          class=""
          searchable
          padding="big"
          :accounts="accountsOptions"
          v-model="store.parent"
          :error="store.jerrors.parent"
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
import { inject, onBeforeMount, onBeforeUnmount, ref } from "vue"
import { useAccountstore } from "../store.js"
import api from "../api.js"
import { openToast } from "../../../plugins/toast.js"
import { PerfectScrollbar } from "vue3-perfect-scrollbar"
import AccountSelector from "./AccountSelector.vue"

const postRequest = inject("postRequest") // inject axios
const bindJoiErrors = inject("bindJoiErrors")
const emit = defineEmits("close")
let store = useAccountstore()
let working = ref(false)

const sideOptions = [
  { label: "Debit", value: "Debit" },
  { label: "Credit", value: "Credit" },
]

onBeforeMount(() => {
  store.$reset()
})
onBeforeUnmount(() => {
  store.$reset()
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
      "name code side isSubAccount parent",
      store.setError,
    )
  } else if (response.error) {
    openToast(response.message, true)
  } else {
    openToast("account created successfully")
    store.$reset()
  }

  working.value = false
}

function close() {
  emit("close")
}
</script>

<style></style>
