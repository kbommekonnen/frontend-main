import { defineStore } from "pinia"
import { ref } from "vue"

export const usePreferencesStore = defineStore("preferencesStore", {
  state: () => ({
    registerCustomerInformationOnSell: ref(false),
    registerCustomerInformationOnPurchase: ref(false),
    supportsMultipleLocations: ref(false),
    supportsMultipleWarehouses: ref(false),
    supportsPriceList: ref(false),
    supportsDiscountAtTransactionLevel: ref(false),
    supportsDiscountAtItemLevel: ref(false),
    supportsTax: ref(false),
    supportsItemCategory: ref(false),
    supportsItemGroup: ref(false),
    supportsItemComposites: ref(false),
    allowDuplicateItemNames: ref(false),
    allowDuplicateSkuNumber: ref(false),
    enableBatchTracking: ref(false),
    enableSerialNumberTracking: ref(false),
    preventItemFromGoingBelowZero: ref(false),
    inventoryValuationMethod: ref(false),
    supportsMultiplePaymentModes: ref(false),

    // accounting
    supportsAccount: ref(false),
    supportsAccountManualDeposite: ref(false),
    supportsAccountManualWithdrow: ref(false),
    supportsAccountTransfer: ref(false),
    integrateInventoryToAccounts: ref(false),
    
    // default accounts
    cashOnHandAccount: ref(""),
    defaultSellAccount: ref(""),
    defaultPurchaseAccount: ref(""),

    jerrors: ref({}),
  }),
  getters: {
    error() {
      return this.success && Object.values(this.errors).find((value) => value)
    },
  },
  actions: {
    togglePreference(key) {
      this[key] = !this[key]
    },
    setPreference(preferences = {}) {
      Object.entries(preferences).forEach(([key, value]) => {
        if (this[key] != undefined) this[key] = value
      })
    },
  },
})
