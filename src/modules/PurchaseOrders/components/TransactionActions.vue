<template>
  <base-drop-down label="Transactions">
    <div class="">
      <ul
        class="p-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownDividerButton"
      >
        <li>
          <div
          @click="handleOrderConfirmed"
          class="block cursor-pointer hover:font-semibold px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
        >
          Confirm
        </div>
        </li>
        <li>
          <div
          @click="handleOrderInTransit"
          class="block cursor-pointer hover:font-semibold px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
        >
          In transit
        </div>
        </li>
        
      </ul>
      <div class="border-t border-primaryBg p-2">
        <div
          @click="handleOrderReceived"
          class="block cursor-pointer hover:font-semibold px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
        >
          Received
        </div>
        <pre></pre>
      </div>
    </div>
  </base-drop-down>
</template>

<script>
import ActionInput from "../../../components/card/ActionInput.vue"
import { openModal } from "../../../plugins/modal"
import api from "../api"

export default {
  props: {
    transaction: { type: Object, default: () => ({}) },
  },
  methods: {
    async handleOrderConfirmed() {
        openModal({
        componentProps: {
          title: "Order confirmed",
          icon: "file-invoice-dollar",
          message:
            "Are you sure ordered transaction is confirmed",
          label: "invoiceNumber",
          placeholder: "invoice number",
          api: { ...api.changeConfirmed, params: [this.transaction._id] },
          successMessage: "",
          actionLabel: "Yes, Confirmed",
        },
        component: ActionInput,
        width: 480,
      })
    },
    async handleOrderInTransit() {
        openModal({
        componentProps: {
          title: "Order Intransit",
          icon: "car",
          message:
            "Are you sure ordered transaction is in transit",
          api: { ...api.changeIntransit, params: [this.transaction._id] },
          label: "plateNumber",
          placeholder: "plate number",
          successMessage: "",
          actionLabel: "Yes, In transit",
        },
        component: ActionInput,
        width: 480,
      })
    },
    async handleOrderReceived() {
      openModal({
        componentProps: {
          title: "Order received",
          message:
            "Are you sure ordered transaction is received to destination store",
          api: { ...api.changeToPurchase, params: [this.transaction._id] },
          successMessage: "",
          actionLabel: "Yes, Received",
        },
        component: ActionInput,
        width: 480,
      })
    },
  },
}
</script>

<style></style>
