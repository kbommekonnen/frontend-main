<template>
  <div class="flex flex-col space-y-1 items-start">
    <modal-header title="add new VehicleType" @close="handleClose" />

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
          icon="edit"
          label="update"
          :isWorking="working"
          @click="handleUpdate"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref } from "vue"
import { useVehicleTypesstore } from "../store.js"
import api from "../api.js"
import roleApi from "../../Roles/api.js"
import { closeModal } from "@/plugins/modal.js"
import { openToast } from "@/plugins/toast"
import ItemSelector from "../../Items/components/ItemSelector.vue"
import MeasurementUnitSelector from "../../MeasurementUnits/components/MeasurementUnitSelector.vue"

const getRequest = inject("getRequest") // inject axios
const putRequest = inject("putRequest") // inject axios
const bindJoiErrors = inject("bindJoiErrors")

const props = defineProps({
  VehicleType: { type: Object, default: () => {} },
})

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

// init
init()
function init() {
  store.name = props.VehicleType.name
  store.roles = props.VehicleType.roles.map(({ _id }) => _id)
  store.capacity = props.VehicleType.capacity.map(
    ({ item, quantity, unit }) => ({
      item: item._id,
      quantity,
      unit: unit._id,
    }),
  )
  store.jerrors.capacity = props.VehicleType.capacity.map((_) => ({
    item: "",
    unit: "",
    quantity: "",
  }))
}
async function handleUpdate() {
  if (working.value) return
  working.value = true
  const response = await putRequest({
    ...api.edit,
    params: [props.VehicleType._id],
    data: store.form,
  })
  if (response.joiError) {
    bindJoiErrors(
      response.joi,
      "name product measurement amount ",
      store.setError,
    )
  } else if (response.error) {
    openToast(response.message, true)
  } else {
    openToast("vehicletype updated successfully")
    store.$reset()
    closeModal()
  }
  working.value = false
}
function handleClose() {
  closeModal()
}
</script>

<style></style>
