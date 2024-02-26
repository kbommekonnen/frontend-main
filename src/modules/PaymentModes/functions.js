import eventBus from "../../eventBus"
import api from "./api"

import { openModal } from "../../plugins/modal.js"

import ChangeStatus from "@/components/card/ChangeStatus.vue"
import ConfirmDelete from "@/components/card/ConfirmDelete.vue"
import NewPaymentModeForm from "./components/NewPaymentModeForm.vue"
import EditPaymentModeForm from "./components/EditPaymentModeForm.vue"

export const openCreateForm = function () {
  openModal({
    componentProps: { style: "p-16"},
    component: NewPaymentModeForm,
  })
}
export const openEditForm = function (PaymentMode) {
  openModal({
    componentProps: { PaymentMode },
    component: EditPaymentModeForm,
  })
}

export const edit = async function (id, form, defaultForm) {
  let data = {}
  Object.keys(form)
    .filter((key) => form[key] != defaultForm[key])
    .forEach((k) => {
      data[k] = form[k]
    })
  const response = await eventBus.request({
    ...api.edit,
    params: [id],
    data,
  })
  if (response) {
    eventBus.$emit("open-toast", {
      message: response.message,
    })
    eventBus.$emit("close-modal")
    eventBus.$emit("refresh")
  } else {
    eventBus.$emit("open-toast", {
      error: true,
      message: response.message,
    })
  }
  ;``
}

export const openDetail = async function (id) {
  eventBus.$emit("route", {
    name: "Payment Mode",
    params: [id],
  })
}

export const deletePaymentMode = async function (id) {
  const response = await eventBus.request({
    ...api.delete,
    params: [id],
  })
  if (response) {
    eventBus.$emit("open-toast", {
      message: "Payment Mode deleted successfully",
    })
    eventBus.$emit("refresh")
  } else {
    eventBus.$emit("open-toast", {
      error: true,
      message: this.berror,
    })
  }
}

export const confirmDelete = async function (id) {
  openModal({
    componentProps: {
      title: "Delete Payment Mode",
      message: "Are you sure to delete Payment Mode",
      api: {
        ...api.delete,
        params: [id],
      },
      toastMessage: "Payment Mode deleted successfully",
      params: id,
    },
    component: ConfirmDelete,
  })
}
export const changeStatus = async function (PaymentMode) {
  openModal({
    componentProps: {
      api: api.changeStatus,
      params: [PaymentMode.id],
      defaultStatus: PaymentMode.status,
      options: ["Verified", "Suspended", "Closed"],
    },
    component: ChangeStatus,
  })
}
export const verify = async function (PaymentMode) {
  openModal({
    componentProps: {
      api: api.verify,
      params: [PaymentMode.id],
      defaultStatus: PaymentMode.status,
      options: ["Verified", "Suspended", "Closed"],
    },
    component: ChangeStatus,
  })
}
