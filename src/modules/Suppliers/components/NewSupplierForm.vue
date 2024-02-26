<template>
  <div class="flex flex-col space-y-1 items-start bg-white h-full w-full p-4">
    <div
      class="flex w-full justify-between space-x-4 border-b-2 pb-2 border-primaryBg"
    >
    <div class="inline-flex space-x-2 items-center">
      <div class="rounded-full border-2 border-primaryBg p-3 bg-primaryBg bg-opacity-50">
        <base-icon name="user" />
      </div>
      <div class="capitalize font-semibold text-xl tracking-wider">
        {{ $t("add new supplier") }}
      </div>
    </div>
      <base-button
        icon="check-circle"
        label="save"
        :isWorking="working"
        @click="handleSave"
      />
    </div>
    <div class="flex-grow w-full flex flex-col space-y-6">
      <div class="space-y-2">
        <div class="sub-title">general information</div>
        <div class="w-full capitalize columns-sm">
          <base-input
            type="text"
            label="display name"
            placeholder="Abel Guesh Kidane"
            v-model="store.name"
            :error="store.jerrors.name"
            class=""
            required
            autofocus
          />
          <base-input
            type="tel"
            label="work phone"
            placeholder="0900000000"
            v-model="store.workPhone"
            :error="store.jerrors.workPhone"
            class=""
          />
          <base-input
            type="tel"
            label="mobile number"
            placeholder="0900000000"
            v-model="store.mobileNumber"
            :error="store.jerrors.mobileNumber"
            class=""
          />

          <base-input
            type="email"
            label="email"
            placeholder="contact@example.com"
            v-model="store.email"
            :error="store.jerrors.email"
            class=""
          />
          <base-input
            type="url"
            label="website"
            placeholder="www.example.com"
            v-model="store.website"
            :error="store.jerrors.website"
            class=""
          />
        </div>
      </div>
      <div class="space-y-2">
        <div class="sub-title">address</div>
        <div class="w-full columns-2xs">
          <base-input
            label="city"
            placeholder="Mekelle"
            v-model="store.address.city"
            :error="store.jerrors.address.city"
            class=""
          />
          <base-input
            label="kebele"
            placeholder="Daero"
            v-model="store.address.kebele"
            :error="store.jerrors.address.kebele"
            class=""
          />
          <base-input
            label="block"
            placeholder="01"
            v-model="store.address.block"
            :error="store.jerrors.address.block"
            class=""
          />
          <base-input
            label="hourse number"
            placeholder="100"
            v-model="store.address.houseNumber"
            :error="store.jerrors.address.houseNumber"
            class=""
          />
        </div>
      </div>
      <div class="space-y-2">
        <div class="sub-title">contact persons</div>
        <div
          v-for="(contact, i) in store.contactPersons"
          :key="i"
          class="w-full columns-2xs rounded border-2 border-primaryBg p-4"
        >
          <base-input
            label="full name"
            placeholder=""
            v-model="store.contactPersons[i].fullName"
            :error="store.jerrors.contactPersons[i].fullName"
            class=""
          />
          <base-input
            label="email"
            placeholder="contact@example.com"
            v-model="store.contactPersons[i].email"
            :error="store.jerrors.contactPersons[i].email"
            class=""
          />
          <base-input
            label="mobile number"
            placeholder="0900000000"
            v-model="store.contactPersons[i].mobileNumber"
            :error="store.jerrors.contactPersons[i].mobileNumber"
            class=""
          />
          <div
            class="inline-flex items-end justify-center cursor-pointer py-4 px-2 bg-primary bg-opacity-10"
            v-if="i == store.contactPersons.length - 1"
            @click="store.addContactPerson"
          >
            <base-icon name="plus" :size="24" class="text-primary" />
          </div>
          <div
            class="inline-flex items-end justify-center cursor-pointer py-4 px-2 bg-error bg-opacity-10"
            @click="store.delContactPerson(i)"
            v-else
          >
            <base-icon name="minus" :size="24" class="text-error" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref } from "vue"
import { useSuppliersstore } from "../store.js"
import api from "../api.js"
import { closeModal } from "@/plugins/modal.js"
import { openToast } from "@/plugins/toast"

const postRequest = inject("postRequest") // inject axios
const bindJoiErrors = inject("bindJoiErrors")
let store = useSuppliersstore()
let working = ref(false)

async function handleSave() {

  let  data = {}
  let contactPerson = store.contactPersons
  if (contactPerson.some(({ fullName, email, mobileNumber }) => (fullName === "" && email === "" && mobileNumber === ""))) {
    ;[
      'name',
      'email',
      'mobileNumber',
      'website',
      'workPhone',
      'address'
    ].forEach((attribute) => data[attribute] = store[attribute])
  }
  else{
    data = store.form
  }

  working.value = true
  const response = await postRequest({
    ...api.create,
    data: data,
  })
  console.info('response', response)
  if (response.joiError) {
    bindJoiErrors(response.joi, "name email website mobileNumber workPhone address contactPersons", store.setError)
  } else if (response.error) {
    openToast(response.message, true)
  } else {
    openToast("supplier created successfully")
    store.$reset()
    // handleClose()
  }
  working.value = false
}
function handleClose() {
  closeModal()
}
</script>

<style scoped>
.sub-title {
  @apply font-semibold capitalize;
}
</style>
