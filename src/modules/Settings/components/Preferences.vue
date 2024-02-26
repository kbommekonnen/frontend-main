<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex flex-col space-y-2 h-full w-full bg-primaryBg">
    <div class="w-full flex space-x-4 py-1">
      <div
        class="w-1/3 flex flex-col items-center rounded bg-white text-center p-4"
      >
        <div class="">
          <base-image
            class="w-8 h-8"
            v-if="userStore.user.profileImg"
            :src="userStore.user.profileImg"
            placeholder="image"
          />
          <base-avatar
            v-else
            :name="userStore.user.fullName"
            icon="user"
            placeholder="image"
          />
        </div>
        <div class="flex space-x-3 items-center">
          <div class="text-xl text-textDark">
            {{ userStore.user.fullName }}
          </div>
          <base-icon
            name="chevron-right"
            v-tippy="{ content: 'change password' }"
            class="cursor-pointer"
            @click="openEditUserInformation"
          />
        </div>
        <div class="">{{ userStore.user.username }}</div>
      </div>
      <div
        class="w-1/3 flex flex-col space-y-4 rounded bg-white text-center p-4"
      >
        <div class="">{{ $t("inventory valuation method") }}</div>
        <div class="flex border border-primary rounded">
          <div
            class="w-1/2 p-4 cursor-pointer"
            :class="{
              'bg-primary text-white': store.inventoryValuationMethod == 'FIFO',
            }"
            @click="toggleInventoryValuationMethod('FIFO')"
          >
            FIFO
          </div>
          <div
            class="w-1/2 p-4 cursor-pointer"
            :class="{
              'bg-primary text-white': store.inventoryValuationMethod == 'LIFO',
            }"
            @click="toggleInventoryValuationMethod('LIFO')"
          >
            LIFO
          </div>
        </div>
      </div>
      <div class="w-1/3 bg-white p-4 space-y-3">
        <div class="light-title">
          {{ $t("organization structure") }}
        </div>
        <div
          v-for="{ key, label } in organizationStructurePreferences"
          :key="key"
        >
          <div class="flex space-x-3 items-center">
            <base-check-box
              :selected="store[key]"
              v-model="store[key]"
              @toggle="togglePreference(key)"
            />
            {{ label }}
          </div>
        </div>
      </div>
    </div>
    <div class="w-full lg:flex space-x-1 flex-grow">
      <div class="w-1/2 bg-white p-3 space-y-3">
        <div class="light-title">
          {{ $t("general preferences") }}
        </div>
        <div
          v-for="({ group, ...preference }, i) in generalPreferences"
          :key="i"
        >
          <div v-if="group" class="space-y-3 border-b-2 border-primaryBg py-2">
            <div class="light-title capitalize">{{ preference.label }}</div>
            <div v-for="{ key, label } in preference.children" :key="key">
              <div class="pl-0 flex space-x-3 items-center">
                <base-check-box
                  :selected="store[key]"
                  v-model="store[key]"
                  @toggle="togglePreference(key)"
                />
                {{ label }}
              </div>
            </div>
          </div>
          <div v-else class="flex space-x-3 items-center">
            <base-check-box
              :selected="store[preference.key]"
              v-model="store[key]"
              @toggle="togglePreference(preference.key)"
            />
            {{ preference.label }}
          </div>
          <!-- {{ preference }} -->
        </div>
      </div>
      <div class="w-1/2 bg-white p-3 space-y-3">
        <div class="light-title">
          {{ $t("notifications") }}
        </div>
        <div
          v-for="({ group, ...preference }, i) in notificationPreferences"
          :key="i"
        >
          <div v-if="group" class="space-y-3">
            <div class="light-title capitalize">{{ preference.label }}</div>
            <div v-for="{ key, label } in preference.children" :key="key">
              <div class="pl-0 flex space-x-3 items-center">
                <base-check-box
                  :selected="store[key]"
                  v-model="store[key]"
                  @toggle="togglePreference(key)"
                />
                {{ label }}
              </div>
            </div>
          </div>
          <div v-else class="flex space-x-3 items-center">
            <base-check-box
              :selected="store[preference.key]"
              v-model="store[key]"
              @toggle="togglePreference(preference.key)"
            />
            {{ preference.label }}
          </div>
          <!-- {{ preference }} -->
        </div>
      </div>
      <div class=""></div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores"
import { usePreferencesStore } from "../store"
import { inject } from "vue"
import { openModal } from "../../../plugins/modal"
import { openToast } from "../../../plugins/toast"
import EditUserInformationVue from "../../Auth/components/EditUserInformation.vue"
const userStore = useUserStore()
const store = usePreferencesStore()
const putRequest = inject("putRequest")
// general preferences
const organizationStructurePreferences = [
  {
    label: "enable multiple warehouses",
    description: "",
    key: "supportsMultipleWarehouses",
  },
  {
    label: "enable multiple locations",
    description: "",
    key: "supportsMultipleLocations",
  },
]
const generalPreferences = [
  {
    label: "discount",
    group: true,
    children: [
      {
        label: "discount at transaction level",
        description: "",
        key: "supportsDiscountAtTransactionLevel",
      },
      {
        label: "discount at item level",
        description: "",
        key: "supportsDiscountAtItemLevel",
      },
    ],
  },
  {
    label: "advanced inventory tracking",
    group: true,
    children: [
      {
        label: "enable serial number tracking",
        description: "",
        key: "enableSerialNumberTracking",
      },
      {
        label: "enable batch tracking",
        description: "",
        key: "enableBatchTracking",
      },
    ],
  },
  {
    label: "item",
    group: true,
    children: [
      {
        label: "allow duplicate item names",
        description: "",
        key: "allowDuplicateItemNames",
      },
      {
        label: "allow duplicate SKU number",
        description: "",
        key: "allowDuplicateSkuNumber",
      },
      {
        label: "prevent stock from going below zero",
        description: "",
        key: "preventItemFromGoingBelowZero",
      },
      {
        label: "enable item categories",
        description: "",
        key: "supportsItemCategory",
      },
      {
        label: "enable item groups",
        description: "manage items in variant attributes",
        key: "supportsItemGroup",
      },
      {
        label: "enable item composites",
        description: "sell items in bundle",
        key: "supportsItemComposites",
      },
    ],
  },
  {
    label: "accounts",
    group: true,
    children: [
      {
        label: "enable accounts",
        description: "",
        key: "supportsAccount",
      },
      {
        label: "allow manual deposite to accounts",
        description: "",
        key: "supportsAccountManualDeposite",
      },
      {
        label: "allow manual withdrow from accounts",
        description: "",
        key: "supportsAccountManualWithdrow",
      },
      {
        label: "allow transfer between accounts",
        description: "",
        key: "supportsAccountTransfer",
      },
      {
        label: "integrate inventory to accounts",
        description: "",
        key: "integrateInventoryToAccounts",
      },
    ],
  },
  {
    label: "transaction",
    group: true,
    children: [
      {
        label: "supports multiple payment modes",
        description: "",
        key: "supportsMultiplePaymentModes",
      },
      {
        label: "enable tax calculation on transaction",
        description: "",
        key: "supportsTax",
      },
      {
        label: "enable multiple pricing scheme",
        description: "sell items in multiple price list schemes",
        key: "supportsPriceList",
      },
      {
        label: "regsiter customer information on sell transaction",
        description: "",
        key: "registerCustomerInformationOnSell",
      },
      {
        label: "regsiter supplier information on purchase transaction",
        description: "",
        key: "registerCustomerInformationOnPurchase",
      },
    ],
  },
]
const notificationPreferences = [
  {
    label: "low stock settings",
    group: true,
    children: [
      {
        label: "prevent stock from going below zero",
        description: "",
        key: "",
      },
      {
        label:
          "show an ‘Out of Stock’ warning whenever an item’s stock drops below zero",
        description:
          "Presents a warning before committing a sale with insufficient stock",
        key: "",
      },
      {
        label: "notify me when an item quantity drops below reorder point ",
        description: "get notified whenever your items reach the reorder point",
        key: "",
      },
    ],
  },
]

async function togglePreference(key) {
  const response = await putRequest({
    url: `config/preference/${key}`,
  })
  if (response && !response.error) {
    store.togglePreference(key)
    // openToast(`${key} changed successfully`)
  } else {
    openToast(response.message, true, 3)
  }
}
async function toggleInventoryValuationMethod(inventoryValuationMethod) {
  const response = await putRequest({
    url: `config/preference/inventoryValuationMethod`,
    data: {
      inventoryValuationMethod,
    },
  })
  if (response) {
    store.inventoryValuationMethod = inventoryValuationMethod
  } else {
    openToast(response.message, true, 3)
  }
}

function openEditUserInformation() {
  openModal({
    component: EditUserInformationVue,
  })
}
</script>

<style></style>
