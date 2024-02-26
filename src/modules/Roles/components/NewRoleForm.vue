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
          @click="goBack"
        />
        <div class="light-title">{{ $t("create new role") }}</div>
      </div>
    </div>
    <div class="flex-grow w-full flex flex-col space-y-3 bg-white">
      <div
        class="flex-grow relative overflow-y-auto max-h-full flex-grow flex flex-col space-y-3"
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
      <div class="flex-grow-0 flex justify-between space-x-4 p-5">
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
import GrantAndRevokeActions from "../../Actions/components/GrantAndRevokeActions.vue"
import { useGrantAndRevokeActionStore } from "../../Actions/store.js"
import { inject, ref } from "vue"
import { useRoleStore } from "../store.js"
import api from "../api.js"
import { closeModal } from "@/plugins/modal.js"
import { openToast } from "../../../plugins/toast"
import { useRouter } from "vue-router"

const postRequest = inject("postRequest") // inject axios
const bindJoiErrors = inject("bindJoiErrors")

let store = useRoleStore()
let grantedActionsStore = useGrantAndRevokeActionStore()
let working = ref(false)
const router = useRouter()

async function handleSave() {
  if (working.value) return
  working.value = true
  const response = await postRequest({
    ...api.create,
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
    openToast("role created successfully")
    store.$reset()
    closeModal()
  }
  working.value = false
}
function handleClose() {
  closeModal()
}
function goBack() {
  router.push("/settings/auth")
}
</script>

<style></style>
