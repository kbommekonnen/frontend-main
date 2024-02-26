<template>
  <div class="flex flex-col h-full space-y-1 items-start">
    <div
      class="flex justify-between items-center w-full capitalize text-xl tracking-wider shadow-top bg-white p-3"
    >
      <div class="flex-grow flex space-x-2 items-center">
        <router-link :to="{ name: 'IssuesList' }">
          <base-icon
            content="back"
            name="arrow-left"
            class="cursor-pointer"
            @click="goBack"
          />
        </router-link>

        <div class="capitalize text-xl tracking-wider">
          {{ $t("new empty issue") }}
        </div>
      </div>
      <div class="px-4 flex-grow grid grid-cols-2 gap-3 bg-white text-center">
        <div class="space-y-0">
          <div class="text-xl">{{ store.items.length - 1 }}</div>
          <div class="capitalize text-sm">{{ $t("total items") }}</div>
        </div>
        <div class="space-y-0">
          <strong class="text-xl">{{ formateNumber(totalQuantity) }}</strong>
          <div class="capitalize text-sm">{{ $t("quantity") }}</div>
        </div>
      </div>
    </div>

    <PerfectScrollbar class="flex-grow w-full flex flex-col space-y-0">
      <div
        class="issue-form-container border-b border-primaryBg bg-white w-full"
      >
        <div
          class="px-4 py-2 flex-grow-0 flex flex-col md:flex-row md:space-x-4 items-start flex-shrink-0"
        >
          <base-input
            label="issue number"
            placeholder="100000"
            required
            :autofocus="true"
            v-model="store.issueNumber"
            :error="store.jerrors.issueNumber"
            class="capitalize"
          />
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
        </div>
      </div>
      <new-issue-items-table-form
        class="p-4 flex-grow w-full flex space-x-1 bg-white"
        :priceListOptions="priceListOptions"
        :taxOptions="taxOptions"
      />
      <!-- if tax calculation is at transaction level -->
    </PerfectScrollbar>
    <div class="flex-grow-0 flex justify-start space-x-4 p-2 bg-white w-full">
      <base-button
        icon="check-circle"
        label="issue"
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
import { computed, inject, onBeforeUnmount, ref, toRefs } from "vue"
import { useIssueStore } from "../store.js"
import api from "../api.js"
import { openToast } from "../../../plugins/toast"
import NewIssueItemsTableForm from "./NewIssueItemsTableForm.vue"
import { usePreferencesStore } from "../../Settings/store.js"
import CustomerSelector from "../../Customers/components/CustomerSelector.vue"
import { PerfectScrollbar } from "vue3-perfect-scrollbar"
import { formateNumber } from "../../../utils"
import { useRouter } from "vue-router"

const postRequest = inject("postRequest") // inject axios
const bindJoiErrors = inject("bindJoiErrors")
const { registerCustomerInformationOnSell } = toRefs(usePreferencesStore())
let store = useIssueStore()
let working = ref(false)
let priceListOptions = ref([])
let taxOptions = ref([])

const totalQuantity = computed(() =>
  store.items.reduce((acc, { quantity = 0 }) => (acc += quantity), 0),
)

async function handleSave() {
  working.value = true
  const response = await postRequest({
    ...api.create,
    data: store.form,
  })
  if (response.joiError) {
    bindJoiErrors(response.joi, "name issueNumber description", store.setError)
  } else if (response.error) {
    openToast(response.message, true)
  } else {
    openToast("issue transaction completed")
    store.$reset()
    store.items.value = [{ _id: 0, quantity: 0, price: 0 }]
  }
  working.value = false
}
function handleClose() {
  useRouter().push({ name: "Sales" })
  // closeModal()
}
onBeforeUnmount(() => {
  store.$reset()
  store.items.value = [{ _id: 0, quantity: 0, price: 0 }]
})
</script>

<style scoped>
.issue-form-container {
  @apply w-full flex;
}
@media (max-width: 640px) {
  .issue-form-container {
    @apply flex-col space-y-1;
  }
}
@media (min-width: 640px) {
  .issue-form-container {
    @apply space-x-1;
  }
}
</style>
