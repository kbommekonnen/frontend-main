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
          @click="handleClose"
        />
        <div class="light-title">{{ $t("edit user") }}</div>
      </div>
    </div>

    <div class="w-full flex-grow flex flex-col space-y-3 bg-white p-4">
      <scroll class="flex-grow flex max-h-full w-full space-x-0.5 bg-primaryBg">
        <pre class="w-full">{{ store }}</pre>
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
            class="col-span-2"
            :items="roleOptions"
            v-model="store.role"
            :error="store.jerrors.role"
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
        <grant-and-revoke-actions v-if="false" />
      </div>
      <div class="flex justify-start space-x-4 px-4">
        <base-button
          icon="check-circle"
          label="update"
          :isWorking="working"
          @click="handleUpdate"
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
import { openToast } from "../../../plugins/toast"
import { useRoute, useRouter } from "vue-router"
import { useGrantAndRevokeActionStore } from "../../Actions/store"

const putRequest = inject("putRequest") // inject axios
const getRequest = inject("getRequest") // inject axios
const bindJoiErrors = inject("bindJoiErrors")

let store = useAuthStore()
let working = ref(false)
let roleOptions = ref([])
let warehousesOptions = ref([])
let grantedActionsStore = useGrantAndRevokeActionStore()
const router = useRouter()

const userId = useRoute().params.id

getRequest({ ...api.get, params: [userId] }).then(({ item }) => {
  if (item) {
    ;[store.firstName, store.lastName] = item.fullName.split(" ")
    store.username = item.username
    store.email = item.email
    store.role = item.role
    store.photo = item.photo
    grantedActionsStore.authorizedActions = item.authorizedActions
  }
  getRequest(warehousesApi.getVerified).then(({ items }) => {
    if (items) {
      const stores = item.stores.map(({ id }) => id)
      console.info(stores)
      warehousesOptions.value = items.map(({ name, _id }) => ({
        label: name,
        value: _id,
        selected: stores.includes(_id),
      }))
    }
  })
})

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
  {
    immediate: false,
  },
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
getRequest(roleApi.getAll).then(({ items }) => {
  if (items) {
    roleOptions.value = items.map(({ roleName, _id, authorizedActions }) => ({
      label: roleName,
      value: _id,
      authorizedActions,
    }))
  }
})

async function handleUpdate() {
  working.value = true
  const response = await putRequest({
    ...api.edit,
    params: [userId],
    data: {
      fullName: store.firstName + " " + store.lastName,
      username: store.username,
      email: store.email,
      store: store.store,
      role: store.role,
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
    openToast("user updated successfully")
    store.$reset()
    grantedActionsStore.$reset()
    handleClose()
  }
  working.value = false
}
function handleClose() {
  router.push({ name: "UsersAndRoles" })
}
</script>

<style></style>
