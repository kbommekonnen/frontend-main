<template>
  <div class="flex flex-col h-full space-y-1 items-start">
    <div
      class="flex justify-between items-center w-full capitalize text-xl tracking-wider shadow-top bg-white p-3"
    >
      <div class="text-textDark">transfer item</div>
      <div v-if="false" class="flex justify-between space-x-4">
        <base-button
          icon="times"
          label="cancel"
          type="secondary"
          @click="handleClose"
        />
        <base-button
          icon="check-circle"
          label="transfer"
          :isWorking="working"
          @click="handleSave"
        />
      </div>
    </div>
    <div
      class="flex-grow w-full flex flex-col space-y-1 bg-primaryBg overflow-y-scroll"
    >
      <div class="w-full flex space-x-1">
        <div class="p-4 w-2/3 space-y-3 bg-white">
          <div class="flex space-x-4">
            <base-select
              label="receiver warehouse"
              icon="hand-holding-usd"
              class="w-1/2 capitalize"
              placeholder="select warehouse"
              :items="warehouseOptions"
              v-model="store.destinationStore"
              :error="store.jerrors.destinationStore"
            />
            <base-input
              type="date"
              label="transfer date"
              icon="calendar"
              class="w-1/2"
              v-model="store.date"
              :error="store.jerrors.date"
            />
          </div>
        </div>
      </div>
      <new-transfer-items-table-form
        class="p-4 flex-grow w-full flex space-x-1 bg-white"
        :warehouseOptions="warehouseOptions"
        :taxOptions="taxOptions"
        >items list</new-transfer-items-table-form
      >
      <!-- if tax calculation is at transaction level -->
      <div v-if="false" class="p-4 w-full flex space-x-1 bg-white">
        taxes included,
      </div>
    </div>
    <div class="flex justify-start space-x-4 p-2 bg-white w-full">
      <base-button
        icon="check-circle"
        label="transfer"
        :isWorking="working"
        @click="handleSave"
      />
      <base-button
        icon="check-circle"
        label="save as draft"
        :isWorking="working"
        @click="handleSave"
      />
      <base-button
        icon="times"
        label="cancel"
        type="secondary"
        @click="handleClose"
      />
    </div>
  </div>
</template>

<script setup>
import { inject, ref } from "vue"
import { useTransferStore } from "../store.js"
import api from "../api.js"
import warehouseApi from "../../Warehouses/api.js"
import { closeModal } from "@/plugins/modal.js"
import { openToast } from "../../../plugins/toast"
import NewTransferItemsTableForm from "./NewTransferItemsTableForm.vue"
import { useActiveWarehouseStore } from "../../Warehouses/store.js"
const postRequest = inject("postRequest") // inject axios
const getRequest = inject("getRequest") // inject axios
const bindJoiErrors = inject("bindJoiErrors")

let store = useTransferStore()
let working = ref(false)
let warehouseOptions = ref([])

// initialize
init()

function init() {
  // get receiver warehouse options
  getRequest(warehouseApi.getVerified).then(({ items }) => {
    if (items) {
      warehouseOptions.value = items
        .map(({ id, name }) => ({
          label: name,
          value: id,
        }))
        .filter(({ _id }) => _id !== useActiveWarehouseStore().active)
    }
  })
}
async function handleSave() {
  working.value = true
  const response = await postRequest({
    ...api.create,
    data: store.form,
  })
  if (response.joiError) {
    bindJoiErrors(response.joi, "destinationWarehouse", store.setError)
  } else if (response.error) {
    openToast(response.message, true)
  } else {
    openToast("transfer transaction completed")
    store.$reset()
    store.items.value = [{ _id: 0, quantity: 1, price: 0 }]
    closeModal()
  }
  working.value = false
}
function handleClose() {
  // closeModal()
}
</script>

<style></style>
