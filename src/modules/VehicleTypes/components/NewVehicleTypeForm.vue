<template>
  <div class="flex flex-col space-y-1 items-start">
    <modal-header title="add new Vehicle Type" @close="handleClose" />

    <div class="w-full flex flex-col space-y-3">
      <div
        class="slide-right flex-grow capitalize space-y-4 content-start px-4 border-primaryBg"
      >
        <base-input
          type="text"
          label="name"
          placeholder="Isuzu"
          v-model="store.name"
          :error="store.jerrors.name"
          class=""
          required
          autofocus
        />
        <div class="">
          <p class="capitalize">{{ $t("permitted roles") }}</p>
          <div class="space-y-2 pl-4">
            <div class="md:grid md:grid-cols-3 md:gap-x-4 gap-y-2 p-3 shadow-md">
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

        <div class="">
          <p class="capitalize">{{ $t("capacity") }}</p>
          <div class="space-y-2 pl-4">
            <div
              v-for="(_, i) in store.capacity"
              :key="i"
              class="md:grid md:grid-cols-3 md:gap-x-4 p-3 shadow-md"
            >
              <item-selector
                searchable
                label="item"
                placeholder="select item"
                v-model="store.capacity[i].item"
                :error="store.jerrors.capacity[i].item"
                class=""
                required
              />

              <base-input
                type="number"
                label="quantity"
                placeholder="999"
                v-model="store.capacity[i].quantity"
                :error="store.jerrors.capacity[i].quantity"
                class=""
                required
              />
              <measurement-unit-selector
                label="measurement"
                placeholder=""
                v-model="store.capacity[i].unit"
                :error="store.jerrors.capacity[i].unit"
                class=""
                required
              />
            </div>
          </div>
          <div
            class="inline-flex items-center text-sm text-blue-500 hover:underline hover:text-blue-600 cursor-pointer focus:border border-blue-400 p-2 pl-4"
            @click="store.addCapacity"
          >
            <base-icon name="plus" :size="11" />{{
              $t("add capacity measurement")
            }}
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
import { inject, onBeforeUnmount, ref } from "vue"
import { useVehicleTypesstore } from "../store.js"
import api from "../api.js"
import roleApi from "../../Roles/api.js"
import { closeModal } from "@/plugins/modal.js"
import { openToast } from "@/plugins/toast"
import ItemSelector from "../../Items/components/ItemSelector.vue"
import MeasurementUnitSelector from "../../MeasurementUnits/components/MeasurementUnitSelector.vue"
const postRequest = inject("postRequest") // inject axios
const getRequest = inject("getRequest") // inject axios
const bindJoiErrors = inject("bindJoiErrors")
let store = useVehicleTypesstore()
let working = ref(false)
const roleOptions = ref([])
getRequest(roleApi.getAll).then(({ items }) => {
  if (items) {
    roleOptions.value = items.map(({ roleName, _id }) => ({
      label: roleName,
      value: _id,
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
    bindJoiErrors(response.joi, "name capacity roles ", store.setError)
  } else if (response.error) {
    openToast(response.message, true)
  } else {
    openToast("vehicletype created successfully")
    store.$reset()
    handleClose()
  }
  working.value = false
}
function handleClose() {
  closeModal()
}
onBeforeUnmount(() => {
  store.$reset()
})
</script>

<style></style>
