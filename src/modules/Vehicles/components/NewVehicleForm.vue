<template>
  <div class="flex flex-col space-y-1 items-start">
    <modal-header title="add new Vehicle" @close="handleClose" />

    <div class="w-full flex flex-col space-y-3">
      <div
        class="slide-right flex-grow capitalize space-y-4 content-start px-4 border-primaryBg"
      >
        <base-input
          type="text"
          label="name"
          placeholder="write name"
          v-model="store.name"
          :error="store.jerrors.name"
          class=""
          required
          autofocus
        />

        <base-input
          type="text"
          label="plate number"
          placeholder="001212"
          v-model="store.plateNumber"
          :error="store.jerrors.plateNumber"
          class=""
          required
        />

        <base-input
          type="text"
          label="side number"
          placeholder="0101"
          v-model="store.sideNumber"
          :error="store.jerrors.sideNumber"
          class=""
        />
        <div class="md:flex md:space-x-3">
          <base-select
            label="type"
            placeholder="select vehicle type"
            v-model="store.type"
            :error="store.jerrors.type"
            :items="vehicleTypeOptions"
            class="md:w-1/2"
            searchable
          />

          <base-select
            label="availability"
            placeholder="select"
            v-model="store.availability"
            :error="store.jerrors.availability"
            :items="availabilityOptions"
            class="md:w-1/2"
          >
            <template #option="{ item }">
              <div
                class="flex items-center space-x-2 p-1"
                :class="`hover:bg-opacity-30 hover:bg-[${getStatusColor(
                  item.value,
                )}] hover:text-[${getStatusColor(item.value)}]`"
              >
                <div
                  class="h-3 w-3 text-lg p-2"
                  :class="`bg-[${getStatusColor(item.value)}]`"
                ></div>
                <div class="text-lg">
                  {{ item.label }}
                </div>
              </div>
            </template>
            <template #item="itemSelected">
              <div class="flex space-x-2">
                <div
                  class="h-3 w-3 text-lg p-2"
                  :class="`bg-[${getStatusColor(itemSelected.value)}]`"
                ></div>
                <div class="text-lg">
                  {{ itemSelected.label }}
                </div>
              </div>
            </template>
          </base-select>
        </div>
        <div class="">
          <p class="capitalize">{{ $t("permitted roles") }}</p>
          <div class="space-y-2 pl-4">
            <div
              class="md:grid md:grid-cols-3 md:gap-x-4 gap-y-2 p-3 shadow-md"
              v-if="store.roles.length"
            >
              <base-select
                v-for="(_, i) in store.roles"
                :key="i"
                searchable
                label=""
                placeholder="select role"
                v-model="store.roles[i]"
                :error="store.jerrors.roles"
                :items="roleOptions"
                class=""
                required
              />
            </div>
          </div>
          <div
            class="inline-flex items-center text-sm text-blue-500 hover:underline hover:text-blue-600 cursor-pointer focus:border border-blue-400 p-2 pl-4"
            @click="store.addRole"
          >
            <base-icon name="plus" :size="11" />{{ $t("add role") }}
          </div>
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
import { inject, onBeforeUnmount, ref, watch } from "vue"
import { useVehiclesstore } from "../store.js"
import api from "../api.js"
import roleApi from "../../Roles/api.js"
import vehicleTypesApi from "../../VehicleTypes/api.js"
import { closeModal } from "@/plugins/modal.js"
import { openToast } from "@/plugins/toast"
import { getStatusColor } from "../../../utils"

const postRequest = inject("postRequest") // inject axios
const getRequest = inject("getRequest") // inject axios
const bindJoiErrors = inject("bindJoiErrors")
let store = useVehiclesstore()
let working = ref(false)

const availabilityOptions = [
  { label: "Open", value: "Open" },
  { label: "In route", value: "In route" },
  { label: "In rest", value: "In rest" },
]

const roleOptions = ref([])
const vehicleTypeOptions = ref([])

watch(
  () => store.type,
  () => {
    if (store.type) {
      store.roles = vehicleTypeOptions.value.find(({ value }) => value).roles
    }
  },
  {
    deep: true,
    immediate: false,
  },
)
getRequest(roleApi.getAll).then(({ items }) => {
  if (items) {
    roleOptions.value = items.map(({ roleName, _id }) => ({
      label: roleName,
      value: _id,
    }))
  }
})
getRequest({
  ...vehicleTypesApi.getAll,
  query: { limit: Number.POSITIVE_INFINITY },
}).then(({ items }) => {
  if (items) {
    vehicleTypeOptions.value = items.map(({ name, _id, roles }) => ({
      label: name,
      value: _id,
      roles: roles.map(({ _id }) => _id),
    }))
  }
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
      "name plateNumber sideNumber type availability roles",
      store.setError,
    )
  } else if (response.error) {
    openToast(response.message, true)
  } else {
    openToast("vehicle registered successfully")
    store.$reset()
    handleClose()
  }
  working.value = false
}
onBeforeUnmount(() => {
  store.$reset()
})
function handleClose() {
  closeModal()
}
</script>

<style></style>
