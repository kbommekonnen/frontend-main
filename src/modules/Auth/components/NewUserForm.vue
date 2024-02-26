<template>
  <div class="h-full flex flex-col bg-primaryBg space-y-1">
    <div
      class="flex justify-between items-center space-x-3 capitalize shadow-top bg-white p-2"
    >
      <div class="flex space-x-2 items-center">
        <base-icon
          content="back"
          name="arrow-left"
          class="text-textLight cursor-pointer"
          @click="goBack"
        />
        <div class="light-title">create new user</div>
      </div>
    </div>

    <div class="w-full flex-grow flex flex-col space-y-3 bg-white p-4">
      <scroll class="flex-grow flex max-h-full w-full space-x-0.5 bg-primaryBg">
        <div
          class="flex-grow grid grid-cols-2 gap-3 capitalize content-start p-4 bg-white"
        >
          <div class="text-center self-center row-span-2">browse</div>
          <base-input
            label="first name"
            placeholder="e.g. kahsay"
            required
            v-model="store.firstName"
            :error="store.jerrors.firstName"
          />
          <base-input
            label="last name"
            placeholder="e.g. kahsay"
            required
            v-model="store.lastName"
            :error="store.jerrors.lastName"
          />
          <base-input
            label="username"
            placeholder="username"
            required
            class=""
            v-model="store.username"
            :error="store.jerrors.username"
          />
          <base-input
            label="email"
            placeholder="email"
            required
            class=""
            v-model="store.email"
            :error="store.jerrors.email"
          />
          <base-select
            label="role"
            placeholder="select role"
            required
            class=""
            :items="roleOptions"
            v-model="store.role"
            :error="store.jerrors.role"
          />
          <base-input
            type="password"
            label="password"
            placeholder="password"
            required
            class=""
            v-model="store.password"
            :error="store.jerrors.password"
          />
          <base-input
            type="password"
            label="confirm password"
            :icon="
              store.password && store.password == store.confirmPassword
                ? 'check-circle'
                : ''
            "
            placeholder="confirm password"
            required
            class=""
            v-model="store.confirmPassword"
            :error="store.jerrors.confirmPassword"
          />
        </div>
        <div class="p-4 bg-white">
          <div class="">
            <div
              class="border-b-2 border-primaryBg py-3 overflow-x-clip text-ellipsis text-15 break-words"
            >
              select which warehouses can access and operate on
            </div>
            <scroll class="relative overlow-hidden space-y-2 capitalize py-2">
              <div
                v-for="({ label, value }, i) in warehousesOptions"
                :key="value"
              >
                <base-check-box
                  :label="label"
                  :value="value"
                  v-model="warehousesOptions[i].selected"
                />
              </div>
            </scroll>
            <div class="border-t-2 border-primaryBg py-3">
              <div class="flex justify-between space-x-4">
                <div class="capitalize">
                  {{ $t("total allowed warehouses") }}
                </div>
                <div class="">{{ store.store.length }}</div>
              </div>
            </div>
          </div>
        </div>
      </scroll>
      <div class="w-full bg-white">
        <grant-and-revoke-actions />
      </div>
      <div class="flex justify-start space-x-4 px-4">
        <base-button
          icon="check-circle"
          label="create"
          :isWorking="working"
          @click="handleSave"
        />
        <base-button
          icon="check-circle"
          label="cancel"
          type="secondary"
          @click="goBack"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import GrantAndRevokeActions from "../../Actions/components/GrantAndRevokeActions.vue"

import { inject, ref, watch } from "vue"
import { useAuthStore } from "../store.js"
import api from "../api.js"
import warehousesApi from "../../Warehouses/api.js"
import roleApi from "../../Roles/api.js"
import { closeModal } from "@/plugins/modal.js"
import { openToast } from "../../../plugins/toast"
import { useRouter } from "vue-router"
import { useGrantAndRevokeActionStore } from "../../Actions/store"

const postRequest = inject("postRequest") // inject axios
const getRequest = inject("getRequest") // inject axios
const bindJoiErrors = inject("bindJoiErrors")

let store = useAuthStore()
let working = ref(false)
let roleOptions = ref([])
let warehousesOptions = ref([])
let grantedActionsStore = useGrantAndRevokeActionStore()
const router = useRouter()

watch(
  () => store.role,
  (role) => {
    if (role) {
      const roleAuthorizedActions = roleOptions.value.find(
        ({ value }) => value == role,
      ).authorizedActions
      grantedActionsStore.authorizedActions = roleAuthorizedActions || []
    }
  },
  {},
)
watch(
  () => warehousesOptions.value,
  () => {
    store.store = warehousesOptions.value
      .filter(({ selected }) => selected)
      .map(({ value }) => value)
  },
  {
    deep: true,
    immediate: false,
  },
)

getRequest(warehousesApi.getVerified).then(({ items }) => {
  if (items) {
    warehousesOptions.value = items.map(({ name, _id }) => ({
      label: name,
      value: _id,
      selected: false,
    }))
  }
})
getRequest(roleApi.getAll).then(({ items }) => {
  if (items) {
    roleOptions.value = items.map(({ roleName, _id, authorizedActions }) => ({
      label: roleName,
      value: _id,
      authorizedActions,
    }))
  }
})

async function handleSave() {
  working.value = true
  const response = await postRequest({
    ...api.create,
    data: {
      ...store.form,
      authorizedActions: grantedActionsStore.authorizedActions,
    },
  })
  if (response.joiError) {
    bindJoiErrors(
      response.joi,
      "fullName username password store email role photo",
      store.setError,
    )
  } else if (response.error) {
    openToast(response.message, true)
  } else {
    openToast("user created successfully")
    store.$reset()
    closeModal()
  }
  working.value = false
}
function goBack() {
  router.push("/settings/auth")
}
</script>

<style></style>
