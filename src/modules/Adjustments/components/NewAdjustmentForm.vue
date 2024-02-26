<template>
  <div class="flex flex-col h-full space-y-1 items-start">
    <div
      class="flex justify-between items-center w-full capitalize text-xl tracking-wider shadow-top bg-white p-3"
    >
      <div class="text-textDark">items adjustment</div>
      <div v-if="false" class="flex justify-between space-x-4">
        <base-button
          icon="times"
          label="cancel"
          type="secondary"
          @click="handleClose"
        />
        <base-button
          icon="check-circle"
          label="adjust items"
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
              label="warehouse"
              icon="hand-holding-usd"
              class="w-1/2 capitalize"
              placeholder="select warehouse"
              :items="warehouseOptions"
              v-model="store.warehouse"
              :error="store.jerrors.warehouse"
            />
            <base-input
              type="date"
              label="adjustment date"
              icon="calendar"
              class="w-1/2"
              v-model="store.date"
              :error="store.jerrors.date"
            />
          </div>
          <div class="flex space-x-4">
            <base-select
              label="reason"
              required
              icon="hand-holding-usd"
              class="w-1/2 capitalize"
              placeholder="select reason"
              :items="adjustmentReasonOptions"
              v-model="store.reason"
              :error="store.jerrors.reason"
            />
            <base-input
              label="reference number"
              icon="hand-holding-usd"
              class="w-1/2 capitalize"
              placeholder="reference number"
              v-model="store.referenceNumber"
              :error="store.jerrors.referenceNumber"
            />
          </div>
        </div>
        <div class="p-4 w-1/3 space-y-3 bg-white capitalize">
          <base-radio
            label="mode of adjustment"
            v-model="store.adjustmentType"
            :error="store.jerrors.adjustmentType"
            :items="adjustmentTypeOptions"
          />
          <base-text-area
            label="description"
            :rows="1"
            v-model="store.description"
            :error="store.jerrors.description"
          />
        </div>
      </div>
      <new-adjustment-items-table-form
        class="p-4 flex-grow w-full flex space-x-1 bg-white scroll-y-auto"
        >items list</new-adjustment-items-table-form
      >
    </div>
    <div class="flex justify-start space-x-4 p-2 bg-white w-full">
      <base-button
        icon="check-circle"
        label="save adjustment"
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
import { inject, onBeforeUnmount, ref } from "vue"
import { useAdjustmentStore } from "../store.js"
import api from "../api.js"
import warehouseApi from "../../Warehouses/api.js"
import { openToast } from "../../../plugins/toast"
import NewAdjustmentItemsTableForm from "./NewAdjustmentItemsTableForm.vue"
import { useActiveWarehouseStore } from "../../Warehouses/store.js"
const postRequest = inject("postRequest") // inject axios
const getRequest = inject("getRequest") // inject axios
const bindJoiErrors = inject("bindJoiErrors")

let store = useAdjustmentStore()
let working = ref(false)
let warehouseOptions = ref([])

const adjustmentTypeOptions = [
  { label: "quantity adjustment", value: "Quantity" },
  { label: "value adjustment", value: "Value" },
]
const adjustmentReasonOptions = [
  { label: "Fire", value: "Fire" },
  { label: "Leakage", value: "Leakage" },
  { label: "Expired", value: "Expired" },
  { label: "Other", value: "Other" },
]

// initialize
init()

function init() {
  // get receiver warehouse options
  getRequest(warehouseApi.getMyStores).then(({ items }) => {
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
    bindJoiErrors(
      response.joi,
      "destinationWarehouse reason referenceNumber ",
      store.setError,
    )
  } else if (response.error) {
    openToast(response.message, true)
  } else {
    openToast("adjustment transaction completed")
    store.$reset()
    store.items.value = [{ _id: 0, quantity: 0, price: 0, newQuantityOnHand: 0, quantityAdjusted: 0 }]
  }
  working.value = false
}
function handleClose() {
  store.$reset()
}
onBeforeUnmount(() => {
  store.$reset()
})
</script>

<style></style>
