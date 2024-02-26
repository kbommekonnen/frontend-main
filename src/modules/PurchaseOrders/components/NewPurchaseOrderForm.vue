<template>
  <div
    class="flex flex-col max-h-full h-full w-full space-y-1 items-start overflow-clip"
  >
    <div
      class="flex-grow-0 flex justify-between items-center w-full capitalize text-xl tracking-wider bg-white px-3 shadow-xs"
    >
      <div class="flex-grow flex space-x-2 items-center">
        <router-link :to="{ name: 'PurchaseOrders' }">
          <base-icon content="back" name="arrow-left" class="cursor-pointer" />
        </router-link>
        <base-icon name="bag-shopping" />
        <strong class="capitalize text-xl tracking-wider">
          {{ $t("new purchase order item") }}
        </strong>
      </div>
      <!-- <div class="text-textDark">{{ $t("purchase item") }}</div> -->
      <div v-if="false" class="flex justify-between space-x-4">
        <base-button
          icon="times"
          label="cancel"
          type="secondary"
          @click="handleClose"
          class="hidden-sm"
        />
        <base-button
          icon="check-circle"
          label="purchase"
          :isWorking="working"
          @click="handleSave"
        />
      </div>
      <div class="px-4 flex-grow grid md:grid-cols-3 gap-3 bg-white text-center">
        <div class="space-y-0">
          <div class="text-xl">{{ store.items.length - 1 }}</div>
          <div class="capitalize text-sm">{{ $t("total items") }}</div>
        </div>
        <div class="space-y-0">
          <strong class="text-xl">{{ formateNumber(totalQuantity) }}</strong>
          <div class="capitalize text-sm">{{ $t("total quantity") }}</div>
        </div>
        <div class="space-y-0">
          <strong class="text-xl">{{
            formateNumber(store.totalAmount)
          }}</strong>
          <div class="capitalize text-sm">{{ $t("total amount") }}</div>
        </div>
      </div>
    </div>
    <PerfectScrollbar class="flex-grow w-full flex flex-col space-y-0">
      <div class="purchase-form-container">
        <div class="p-4 space-y-3 bg-white bg-opacity-50">
          <div class="flex space-x-4">
            <supplier-selector
              placeholder="full name"
              class="w-1/2"
              required
              icon="user-alt"
              v-model="store.supplier"
              :error="store.jerrors.supplier"
            />
            <base-input
              label="invoice number"
              icon="file-invoice-dollar"
              class="w-1/2 capitalize"
              placeholder="1234"
              v-model="store.invoiceNumber"
              :error="store.jerrors.invoiceNumber"
            />
            <base-input
              label="plate number"
              icon="car"
              class="w-1/2 capitalize"
              placeholder="0214545"
              v-model="store.plateNumber"
              :error="store.jerrors.plateNumber"
            />
          </div>
          <div class="flex space-x-4">
            <base-input
              label="order number"
              icon="bag-shopping"
              class="w-1/2 capitalize"
              placeholder="123"
              v-model="store.orderNumber"
              :error="store.jerrors.orderNumber"
            />
            <base-input
              label="issue number"
              icon="bag-shopping"
              class="w-1/2 capitalize"
              placeholder="123"
              v-model="store.issueNumber"
              :error="store.jerrors.issueNumber"
            />
            <base-input
              label="reference number"
              icon="file-invoice"
              class="w-1/2 capitalize"
              placeholder="123"
              v-model="store.referenceNumber"
              :error="store.jerrors.referenceNumber"
            />
          </div>
          <div v-if="false" class="flex space-x-4">
            <base-input
              label="phone number"
              placeholder="phone number"
              class="w-1/2"
              icon="phone-alt"
              v-model="store.tel"
              :error="store.jerrors.tel"
            />
            <base-input
              type="date"
              label="purchase date"
              icon="calendar"
              class="w-1/2"
              v-model="store.date"
              :error="store.jerrors.date"
            />
          </div>
        </div>
      </div>
      <new-purchase-order-items-table-form
        class="py-4 px-1 flex-grow w-full flex space-x-1 bg-white"
        >{{ $t("items list") }}</new-purchase-order-items-table-form
      >
      <!-- if tax calculation is at transaction level -->
      <div v-if="false" class="p-4 w-full flex space-x-1 bg-white">
        taxes included,
      </div>
    </PerfectScrollbar>
    <div class="flex-grow-0 flex justify-start space-x-4 p-2 bg-white w-full">
      <base-button
        icon="check-circle"
        label="order"
        :isWorking="working"
        @click="handleSave"
      />
      <!-- <base-button
        icon="check-circle"
        label="save as draft"
        :isWorking="working"
        @click="handleSave"
      /> -->
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
import { computed, inject, onBeforeUnmount, onMounted, ref } from "vue"
import { usePurchaseStore } from "../store.js"
import api from "../api.js"
import { openToast } from "../../../plugins/toast"
import { PerfectScrollbar } from "vue3-perfect-scrollbar"
import NewPurchaseOrderItemsTableForm from "./NewPurchaseOrderItemsTableForm.vue"
import SupplierSelector from "../../Suppliers/components/SupplierSelector.vue"
import { useRoute, useRouter } from "vue-router"
import { formateNumber } from "../../../utils"
const postRequest = inject("postRequest") // inject axios
const bindJoiErrors = inject("bindJoiErrors")

let store = usePurchaseStore()
let working = ref(false)
const totalQuantity = computed(() =>
  store.items.reduce((acc, { quantity = 0 }) => (acc += quantity), 0),
)

const router = useRouter()
async function handleSave() {
  working.value = true
  const response = await postRequest({
    ...api.create,
    data: store.form,
  })
  if (response.joiError) {
    bindJoiErrors(
      response.joi,
      "name invoiceNumber plateNumber orderNumber issueNumber referenceNumber description",
      store.setError,
    )
  } else if (response.error) {
    openToast(response.message, true)
  } else {
    openToast("purchase transaction completed")
    handleClose()
  }
  working.value = false
}
onMounted(() => {
  const query = useRoute().query
  if (query.issueNumber) store.issueNumber = query.issueNumber
})
onBeforeUnmount(() => {
  store.$reset()
  store.items.value = [{ _id: 0, quantity: 0, price: 0 }]
})
function handleClose() {
  router.back()
  store.$reset()
  store.items.value = [{ _id: 0, quantity: 0, price: 0 }]
}
</script>

<style scoped>
.purchase-form-container {
  @apply w-full flex;
}
@media (max-width: 640px) {
  .purchase-form-container {
    @apply flex-col space-y-1;
  }
}
@media (min-width: 640px) {
  .purchase-form-container {
    @apply space-x-0;
  }
}
</style>
