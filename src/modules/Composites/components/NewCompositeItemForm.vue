<template>
  <div class="flex flex-col space-y-1 h-full items-start">
    <div class="flex justify-between w-full bg-white shadow-top p-4">
      <div class="capitalize text-xl tracking-wider">new composite</div>
      <base-button
        icon="check-circle"
        label="save"
        :isWorking="working"
        @click="handleSave"
      />
    </div>
    <scroll class="flex flex-col w-full space-y-1 bg-primaryBg">
      <div class="w-full flex space-x-1 pr-4">
        <div class="w-2/3 p-4 bg-white space-y-3">
          <div
            class="space-y-2"
            @mouseenter="editName = true"
            @mouseleave="editName = false"
          >
            <div class="text-sm capitalize">name</div>

            <div class="text-2xl tracking-wide text-primary">
              <base-input
                v-if="editName"
                v-model="store.name"
                :error="store.jerrors.name"
                :size="24"
                class="tracking-wide text-primary"
              />
              <div v-else class="">{{ store.name }}</div>
            </div>
          </div>
          <div
            class="grid lg:grid-cols-3 grid-cols-2 gap-x-6 gap-y-4 capitalize"
          >
            <base-input
              label="SKU"
              placeholder=""
              required
              padding="small"
              v-model="store.sku"
              :error="store.jerrors.sku"
            />
            <base-input
              label="barcode"
              placeholder=""
              class=""
              padding="small"
              v-model="store.barcode"
              :error="store.jerrors.barcode"
            />
            <base-input
              label="purchasing cost"
              placeholder=""
              class=""
              padding="small"
              v-model="store.purchasingCost"
              :error="store.jerrors.purchasingCost"
            />
            <base-input
              label="category"
              placeholder=""
              class=""
              padding="small"
              v-model="store.category"
              :error="store.jerrors.category"
            />
            <base-input
              label="manufacturer"
              placeholder=""
              class=""
              padding="small"
              v-model="store.manufacturer"
              :error="store.jerrors.manufacturer"
            />
            <base-input
              label="brand"
              placeholder=""
              class=""
              padding="small"
              v-model="store.brand"
              :error="store.jerrors.brand"
            />
          </div>
        </div>
        <div class="w-1/3 p-4 bg-white">image source</div>
      </div>

      <div class="flex-grow w-full flex space-x-1 pr-4">
        <composite-measurement-unit-form
          class="w-1/3 p-4 bg-white"
        ></composite-measurement-unit-form>
        <composite-pricing-form
          class="w-1/3 p-4 bg-white"
        ></composite-pricing-form>
        <opening-stock-form
          class="w-1/3 p-4 bg-primary text-white"
        ></opening-stock-form>
      </div>
      <div
        class="w-full lg:flex grid grid-cols-2 space-y-3 lg:space-y-0 justify-between space-x-2 p-4 bg-white capitalize"
      >
        <base-input
          type="number"
          v-model="store.reorderPoint"
          label="reorder point"
          padding="small"
          class="lg:w-1/6"
        />
        <base-select
          v-model="store.inventoryAccount"
          label="inventory account"
          padding="small"
          class="lg:w-1/4"
        />
        <base-select
          v-model="store.salesGlAccount"
          label="sales account"
          padding="small"
          class="lg:w-1/4"
        />
        <base-select
          v-model="store.purchaseGlAccount"
          label="purchase account"
          padding="small"
          class="lg:w-1/4"
        />
      </div>
    </scroll>
  </div>
</template>

<script setup>
import { inject, ref } from "vue"
import { useCompositestore } from "../store.js"
import api from "../api.js"
import { openToast } from "../../../plugins/toast"
import { openModal } from "../../../plugins/modal.js"
import NewCompositeNameForm from "./NewCompositeItemNameForm.vue"

import OpeningStockForm from "./OpeningStockForm.vue"
import CompositePricingForm from "./CompositeItemPricingForm.vue"
import CompositeMeasurementUnitForm from "./CompositeItemMeasurementUnitForm.vue"

const postRequest = inject("postRequest") // inject axios
const bindJoiErrors = inject("bindJoiErrors")

let store = useCompositestore()
let working = ref(false)
let editName = ref(false)

if (!store.name) {
  openModal({
    component: NewCompositeNameForm,
  })
}

async function handleSave() {
  working.value = true
  const response = await postRequest({
    ...api.create,
    data: store.form,
  })
  if (response.joiError) {
    bindJoiErrors(response.joi, "name description", store.setError)
  } else if (response.error) {
    openToast(response.message, true)
  } else {
    openToast("composite created successfully")
  }
  working.value = false
}
</script>

<style></style>
