<template>
  <div class="flex flex-col space-y-1 h-full items-start bg-primaryBg p-1">
    <div class="flex justify-between w-full bg-white shadow-top p-4">
      <div class="flex-grow flex space-x-2 items-center">
        <base-icon
          content="back"
          name="arrow-left"
          class="cursor-pointer"
          @click="goBack"
        />

        <div class="capitalize text-xl tracking-wider">
          {{ $t("edit item") }}
        </div>
      </div>
      <base-button
        icon="check-circle"
        label="update"
        :isWorking="working"
        @click="handleUpdate"
      />
    </div>
    <PerfectScrollbar class="w-full flex flex-col space-y-1 pr-4 h-full">
      <div class="w-full grid lg:grid-cols-2 gap-1 flex-grow">
        <div
          class="lg:col-span-2 lg:flex lg:flex-row-reverse bg-primaryBg space-y-1 lg:space-x-1"
        >
          <div class="p-4 lg:px-12 bg-white">
            <image-input label="item image" v-model="store.image" />
          </div>

          <div class="lg:flex-grow p-4 bg-white space-y-3">
            <div
              class="space-y-2"
              @mouseenter="editName = true"
              @mouseleave="editName = false"
            >
              <div class="text-sm capitalize">name</div>

              <div class="text-2xl tracking-wide text-primary">
                <base-input
                  v-if="editName || !store.name"
                  v-model="store.name"
                  :error="store.jerrors.name"
                  :size="24"
                  autofocus
                  class="tracking-wide text-primary"
                />
                <div v-else class="">{{ store.name }}</div>
              </div>
            </div>
            <div
              class="grid lg:grid-cols-2 md:grid-cols-2 gap-x-6 gap-y-4 capitalize"
            >
              <base-input
                label="SKU"
                placeholder="SKU or barcode"
                required
                padding="big"
                v-model="store.sku"
                :error="store.jerrors.sku"
              />
              <base-input
                v-if="false"
                label="barcode"
                placeholder=""
                class=""
                padding="big"
                v-model="store.barcode"
                :error="store.jerrors.barcode"
              />
              <base-select
                v-if="supportsItemCategory"
                label="category"
                placeholder="select category"
                class=""
                searchable
                padding="big"
                :items="itemCategoryOptions"
                v-model="store.category"
                :error="store.jerrors.category"
              />
              <base-input
                label="manufacturer"
                placeholder=""
                class=""
                padding="big"
                v-model="store.manufacturer"
                :error="store.jerrors.manufacturer"
              />
              <base-input
                label="brand"
                placeholder=""
                class=""
                padding="big"
                v-model="store.brand"
                :error="store.jerrors.brand"
              />
              <base-input
                type="number"
                v-model="store.reorderPoint"
                label="reorder point"
                placeholder="Reorder notification level"
                padding="big"
                class=""
              />
            </div>
          </div>
        </div>
        <item-measurement-unit-form
          class="p-4 bg-white h-full"
        ></item-measurement-unit-form>
        <item-pricing-form class="p-4 bg-white row-span-2"></item-pricing-form>
      </div>

      <div
        class="w-full lg:flex grid grid-cols-2 space-y-3 lg:space-y-0 justify-between space-x-2 p-4 bg-white capitalize"
      >
        <account-selector
          v-model="store.inventoryAccount"
          label="inventory account"
          padding="small"
          searchable
          class="lg:w-1/4"
        />
        <account-selector
          v-model="store.salesGlAccount"
          label="sales account"
          padding="small"
          searchable
          class="lg:w-1/4"
        />
        <account-selector
          v-model="store.purchaseGlAccount"
          label="purchase account"
          padding="small"
          searchable
          class="lg:w-1/4"
        />
      </div>
    </PerfectScrollbar>

  </div>
</template>

<script setup>
import { inject, ref, toRefs } from "vue"
import { useItemstore } from "../store.js"
import api from "../api.js"
import itemCategoryApi from "../../ItemCategory/api.js"
import { openToast } from "../../../plugins/toast"
import { PerfectScrollbar } from "vue3-perfect-scrollbar"

import ItemPricingForm from "./ItemPricingForm.vue"
import ItemMeasurementUnitForm from "./ItemMeasurementUnitForm.vue"
import AccountSelector from "../../Accounting/components/AccountSelector.vue"
import { useRoute, useRouter } from "vue-router"
import { usePreferencesStore } from "../../Settings/store.js"
const router = useRouter()
const { supportsItemCategory } = toRefs(usePreferencesStore())

const putRequest = inject("putRequest") // inject axios
const upload = inject("upload") // inject axios
const getRequest = inject("getRequest") // inject axios
const bindJoiErrors = inject("bindJoiErrors")

let store = useItemstore()
let working = ref(false)
let itemCategoryOptions = ref([])
let editName = ref(false)
let itemDetail = ref({})
const itemId = useRoute().params.id

getRequest({ ...api.get, params: [itemId] }).then(({ item }) => {
  if (item) {
    Object.assign(store.$state, item)
    store.purchasingCost = item.purchaseInfo.cost || 0
    itemDetail.value = item
    itemDetail.value = item.purchaseInfo.cost
  }
})
if (supportsItemCategory.value) {
  getRequest(itemCategoryApi.getVerified).then(({ items }) => {
    if (items) {
      itemCategoryOptions.value = items.map(({ _id, name }) => ({
        label: name,
        value: _id,
      }))
    }
  })
}
async function handleUpdate() {
  if (working.value) return
  working.value = true
  let data = Object.keys(store.form).reduce(
    (acc, key) =>
      store.form[key] == "" && store.form[key] != itemDetail.value[key]
        ? acc
        : { ...acc, [key]: store.form[key] },
    {},
  )
  delete data.image
  const response = await putRequest({
    ...api.edit,
    params: [itemId],
    data,
  })
  if (response.joiError) {
    bindJoiErrors(
      response.joi,
      "name sku barcode unit units category itemType brand description",
      store.setError,
    )
  } else if (response.error) {
    openToast(response.message, true)
  } else {
    if (store.image && store.image != itemDetail.value.image) {
      updateItemImage(response.item._id)
    } else {
      openToast("item updated successfully")
      store.$reset()
      goBack()
    }
  }
  working.value = false
}
async function updateItemImage(id) {
  let data = new FormData()
  data.append("image", store.image)
  const response = await upload({
    ...api.edit,
    method: "put",
    params: [id],
    data,
  })
  if (response.joiError) {
    bindJoiErrors(response.joi, "image", store.setError)
  } else if (response.error) {
    openToast(response.message, true)
  } else {
    openToast("item created successfully")
    store.$reset()
  }
  working.value = false
}

function goBack() {
  router.back()
}
</script>

<style></style>
