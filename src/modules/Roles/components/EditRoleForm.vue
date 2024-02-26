<template>
  <div class="h-full space-y-1 items-start bg-primaryBg">
    <div
      class="flex w-full justify-between items-center space-x-3 capitalize shadow-top bg-white p-2"
    >
      <div class="flex space-x-2 items-center">
        <base-icon
          content="back"
          name="arrow-left"
          class="text-textLight cursor-pointer"
          @click="handleClose"
        />
        <div class="light-title">{{ $t("edit role") }}</div>
      </div>
    </div>
    <div class="flex-grow w-full flex flex-col space-y-3 bg-white">
      <div
        class="relative overflow-y-auto max-h-full flex-grow flex flex-col space-y-3"
      >
        <div
          class="slide-right flex flex-col flex-grow capitalize space-y-4 content-start border-2 p-4 border-primaryBg"
        >
          <base-input
            label="role name"
            placeholder="write role name"
            required
            v-model="store.roleName"
            :error="store.jerrors.roleName"
          />
          <base-text-area
            label="description"
            placeholder="write role description"
            class=""
            v-model="store.description"
            :error="store.jerrors.description"
          />
        </div>
        <grant-and-revoke-actions class="flex-grow" />
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
          label="update"
          :isWorking="working"
          @click="handleSave"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import GrantAndRevokeActions from "../../Actions/components/GrantAndRevokeActions.vue"
import { useGrantAndRevokeActionStore } from "../../Actions/store.js"
import { inject, ref } from "vue"
import { useRoleStore } from "../store.js"
import api from "../api.js"
import { openToast } from "../../../plugins/toast"
import { useRoute, useRouter } from "vue-router"

const putRequest = inject("putRequest") // inject axios
const getRequest = inject("getRequest") // inject axios
const bindJoiErrors = inject("bindJoiErrors")

let store = useRoleStore()
let grantedActionsStore = useGrantAndRevokeActionStore()
let working = ref(false)
const router = useRouter()
const route = useRoute()

const roleId = route.params.id

getRequest({ ...api.get, params: [roleId] }).then(({ item }) => {
  if (item) {
    store.roleName = item.roleName
    store.description = item.description
    grantedActionsStore.authorizedActions = item.authorizedActions
  }
})

async function handleSave() {
  if (working.value) return
  working.value = true
  const response = await putRequest({
    ...api.edit,
    params: [roleId],
    data: {
      ...store.form,
      authorizedActions: grantedActionsStore.authorizedActions,
    },
  })
  if (response.joiError) {
    bindJoiErrors(response.joi, "roleName description", store.setError)
  } else if (response.error) {
    openToast(response.message, true)
  } else {
    openToast("role updated successfully")
    store.$reset()
    handleClose()
  }
  working.value = false
}
function handleClose() {
  router.back()
}
</script>

<style></style>
