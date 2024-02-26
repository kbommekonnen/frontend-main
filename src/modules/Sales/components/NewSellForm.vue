<template>
  <div class="flex flex-col h-full space-y-1 items-start">
    <div
      class="flex justify-between items-center w-full capitalize text-xl tracking-wider shadow-top bg-white p-3"
    >
      <div class="flex-grow flex space-x-2 items-center">
        <router-link :to="{ name: 'Sales' }">
          <base-icon
            content="back"
            name="arrow-left"
            class="cursor-pointer"
            @click="goBack"
          />
        </router-link>

        <div class="capitalize text-xl tracking-wider">
          {{ $t("sell item") }}
        </div>
      </div>
      <!-- <div class="text-textDark">{{ $t("purchase item") }}</div> -->
      <div
        v-if="true"
        class="flex justify-between text-base items-start space-x-4"
      >
        <base-button
          icon="times"
          label="cancel"
          type="secondary"
          @click="$router.push({ name: 'SalesList' })"
          class="hidden-sm"
          shortcut="alt_x"
        />
        <base-button
          icon="check-circle"
          label="sell"
          :isWorking="working"
          @click="handleSave"
          shortcut="alt_s"
        />
      </div>
    </div>

    <div
      class="flex-grow w-full flex flex-col space-y-1 bg-primaryBg overflow-y-scroll"
    >
      <div class="sell-form-container">
        <div
          class="p-4 flex-grow-0 grid gap-3 items-start flex-shrink-0 bg-white"
          :class="{
            // 'grid-cols-2':
            //   registerCustomerInformationOnSell && supportsPriceList,
            'grid-cols-4':
              (registerCustomerInformationOnSell || true) && !supportsPriceList,
            'md:grid-cols-3': supportsPriceList,
            'grid-cols-2':
              !(registerCustomerInformationOnSell || true) &&
              !supportsPriceList,
            'lg:w-1/2':
              (registerCustomerInformationOnSell || true) && supportsPriceList,
          }"
        >
          <!-- purchaser information -->
          <!-- TODO check preference -->
          <template v-if="true || registerCustomerInformationOnSell">
            <customer-selector
              placeholder="full name"
              class=""
              required
              icon="user-alt"
              v-model="store.customer"
              :error="store.jerrors.customer"
            />
            <!-- <base-input
              label="phone number"
              placeholder="phone number"
              class=""
              icon="phone-alt"
              v-model="store.tel"
              :error="store.jerrors.tel"
            /> -->
          </template>
          <base-select
            v-if="supportsPriceList"
            label="price schema"
            icon="hand-holding-usd"
            class="capitalize"
            placeholder="select price schema"
            :items="priceListOptions"
            v-model="store.priceList"
            :error="store.jerrors.priceList"
          />
          <payment-mode-selector
            v-model="store.paymentMode"
            :error="store.jerrors.paymentMode"
          />
          <base-input
            v-if="false"
            type="date"
            label="date"
            icon="calendar"
            class="flex-shrink-0 first-letter:capitalize"
            v-model="store.date"
            :error="store.jerrors.date"
          />
        </div>
        <div
          class="p-4 flex-grow flex-shrink-0 bg-white text-center"
          :class="{
            'grid grid-cols-2 gap-3':
              registerCustomerInformationOnSell && supportsPriceList,
            'grid grid-cols-2 gap-3 lg:flex justify-around': !(
              registerCustomerInformationOnSell && supportsPriceList
            ),
          }"
        >
          <div class="space-y-1">
            <div class="text-2xl">{{ store.totalTax }}</div>
            <div class="">tax</div>
          </div>
          <div class="space-y-1">
            <div class="text-2xl">{{ store.totalAmount }}</div>
            <div class="">sub total</div>
          </div>
          <div class="space-y-1">
            <div class="text-2xl">{{ store.totalDiscountedAmount }}</div>
            <div class="">discounted</div>
          </div>
          <div class="space-y-1">
            <div class="text-2xl">{{ store.totalPayAmount }}</div>
            <div class="">total</div>
          </div>
        </div>
      </div>
      <new-sell-items-table-form
        class="p-4 flex-grow w-full flex space-x-1 bg-white"
        :priceListOptions="priceListOptions"
        :taxOptions="taxOptions"
        >items list</new-sell-items-table-form
      >
      <!-- if tax calculation is at transaction level -->
      <div v-if="false" class="p-4 w-full flex space-x-1 bg-white">
        taxes included,
      </div>
    </div>
    <div class="flex justify-start space-x-4 p-2 bg-white w-full">
      <base-button
        icon="check-circle"
        label="sell"
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
import { inject, ref, toRefs } from "vue"
import { useSellStore } from "../store.js"
import api from "../api.js"
import priceListApi from "../../PriceLists/api.js"
import taxApi from "../../TaxRates/api.js"
import { closeModal } from "@/plugins/modal.js"
import { openToast } from "../../../plugins/toast"
import NewSellItemsTableForm from "./NewSellItemsTableForm.vue"
import { usePreferencesStore } from "../../Settings/store.js"
import { useRouter } from "vue-router"
import PaymentModeSelector from "../../PaymentModes/components/PaymentModeSelector.vue"
import CustomerSelector from "../../Customers/components/CustomerSelector.vue"
// import { useRouter } from "vue-router"
const postRequest = inject("postRequest") // inject axios
const getRequest = inject("getRequest") // inject axios
const bindJoiErrors = inject("bindJoiErrors")
const { registerCustomerInformationOnSell, supportsPriceList, supportsTax } =
  toRefs(usePreferencesStore())
let store = useSellStore()
let working = ref(false)
let priceListOptions = ref([])
let taxOptions = ref([])

// initialize
init()

function init() {
  // get price list options
  if (supportsPriceList.value)
    getRequest(priceListApi.getVerified).then(({ items }) => {
      if (items) {
        priceListOptions.value = items.map(({ id, name }) => ({
          label: name,
          value: id,
        }))
        if (items.length > 0) {
          store.priceList = items[0].id
        }
      }
    })
  // get tax options
  if (supportsTax.value)
    getRequest(taxApi.getVerified).then(({ items }) => {
      if (items) {
        taxOptions.value = items.map(({ id, name, ...rest }) => ({
          label: name,
          value: id,
          ...rest,
        }))
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
      "name priceList paymentMode description",
      store.setError,
    )
  } else if (response.error) {
    openToast(response.message, true)
  } else {
    openToast("sell transaction completed")
    store.$reset()
    store.items.value = [{ _id: 0, quantity: 1, price: 0 }]
    // useRouter().go(-1)
    // closeModal()
  }
  working.value = false
}
function handleClose() {
  // useRouter().push({ name: "Sales" })
  // closeModal()
}
</script>

<style scoped>
.sell-form-container {
  @apply w-full flex;
}
@media (max-width: 640px) {
  .sell-form-container {
    @apply flex-col space-y-1;
  }
}
@media (min-width: 640px) {
  .sell-form-container {
    @apply space-x-1;
  }
}
</style>
