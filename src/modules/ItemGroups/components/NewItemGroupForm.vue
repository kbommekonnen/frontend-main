<!-- TODO purchasing cost and selling price are not saving -->
<template>
  <div class="flex flex-col space-y-1 h-full max-h-full items-start">
    <div
      class="flex flex-shrink-0 justify-between w-full bg-white shadow-top p-4"
    >
      <div class="flex-grow flex space-x-2 items-center">
        <base-icon
          content="back"
          name="arrow-left"
          class="cursor-pointer"
          @click="goBack"
        />

        <div class="capitalize text-xl tracking-wider">
          {{ $t("new item group") }}
        </div>
      </div>
      <base-button
        icon="check-circle"
        label="save"
        :isWorking="working"
        @click="handleSave"
      />
    </div>
    <PerfectScrollbar
      class="bg-primaryBg flex flex-col space-y-1 flex-grow overflow-hidden relative w-full"
    >
      <div class="w-full flex space-x-1 pr-4">
        <div class="w-3/5 p-4 bg-white space-y-3">
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
                class="tracking-wide text-primary"
              />
              <div v-else class="">{{ store.name }}</div>
            </div>
          </div>
          <div
            class="grid lg:grid-cols-3 grid-cols-2 gap-x-6 gap-y-2 grid-flow-row capitalize"
          >
            <!-- <base-input
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
            /> -->
            <base-select
              v-if="supportsItemCategory"
              label="category"
              placeholder="select category"
              class=""
              padding="small"
              :items="itemCategoryOptions"
              v-model="store.category"
              :error="store.jerrors.category"
            />
            <base-input
              label="manufacturer"
              placeholder=""
              class="row-span-1"
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
            <div class="lg:col-span-3 col-span-2">
              <base-text-area
                v-if="false"
                label="description"
                placeholder=""
                required
                :rows="2"
                padding="small"
                v-model="store.description"
                :error="store.jerrors.description"
              />
            </div>
          </div>
          <div class="flex-grow w-full flex space-x-1 pr-4">
            <item-measurement-unit-form
              class="w-full p-4 bg-white border border-primaryBg rounded"
            ></item-measurement-unit-form>
          </div>
        </div>
        <attributes-and-options-form class="w-2/5 p-4 bg-white" />
      </div>

      <!-- gl accounts -->
      <div
        v-if="false"
        class="w-full lg:flex grid grid-cols-2 space-y-3 lg:space-y-0 justify-between space-x-2 p-4 bg-white capitalize"
      >
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
      <item-group-variants-form />
    </PerfectScrollbar>
  </div>
</template>

<script setup>
import { inject, ref, toRefs } from "vue"
import { useItemGroupstore } from "../store.js"
import api from "../api.js"
import itemCategoryApi from "../../ItemCategory/api.js"
import { openToast } from "../../../plugins/toast"
// import { openModal } from "../../../plugins/modal.js"
// import NewItemGroupNameForm from "./NewItemGroupNameForm.vue"

import AttributesAndOptionsForm from "./AttributesAndOptionsForm.vue"
import ItemMeasurementUnitForm from "./ItemMeasurementUnitForm.vue"
import ItemGroupVariantsForm from "./ItemGroupVariantsForm.vue"
import { useRouter } from "vue-router"
import { PerfectScrollbar } from "vue3-perfect-scrollbar"
import { usePreferencesStore } from "../../Settings/store.js"
const { supportsItemCategory } = toRefs(usePreferencesStore())

const postRequest = inject("postRequest") // inject axios
const getRequest = inject("getRequest") // inject axios
const bindJoiErrors = inject("bindJoiErrors")
let store = useItemGroupstore()
store.$reset()
let working = ref(false)
let itemCategoryOptions = ref([])
let editName = ref(false)
const router = useRouter()

// if (!store.name) {
//   openModal({
//     component: NewItemGroupNameForm,
//   })
// }
if (supportsItemCategory.value)
  getRequest(itemCategoryApi.getVerified).then(({ items }) => {
    if (items) {
      itemCategoryOptions.value = items.map(({ _id, name }) => ({
        label: name,
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
    bindJoiErrors(response.joi, "name description", store.setError)
  } else if (response.error) {
    openToast(response.message, true)
  } else {
    openToast("item group created successfully")
    store.$reset()
  }
  working.value = false
}
function goBack() {
  router.back()
}
</script>

<style></style>
