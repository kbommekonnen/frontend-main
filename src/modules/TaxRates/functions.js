import eventBus from "../../eventBus"
import { openToast } from "../../plugins/toast"
import api from "./api"

import { openModal } from "../../plugins/modal.js"

import ChangeStatus from "@/components/card/ChangeStatus.vue"
import ConfirmDelete from "@/components/card/ConfirmDelete.vue"
import NewTaxForm from "./components/NewTaxRateForm.vue"
import EditTax from "./components/NewTaxRateForm.vue"

export const openCreateForm = function (tax) {
  openModal({
    componentProps: { tax },
    component: NewTaxForm,
  })
}
export const openEditForm = function (tax) {
  openModal({
    componentProps: { tax },
    component: EditTax,
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
    name: "Tax",
    params: [id],
  })
}

export const deleteTax = async function (id) {
  const response = await eventBus.request({
    ...api.delete,
    params: [id],
  })
  if (response) {
    openToast("Tax deleted successfully")
    // eventBus.$emit("refresh")
  } else {
    openToast(response, true)
  }
}

export const confirmDelete = async function (id) {
  openModal({
    componentProps: {
      title: "Delete Tax",
      message: "Are you sure to delete Tax",
      action: deleteTax,
      params: id,
    },
    component: ConfirmDelete,
  })
}
export const changeStatus = async function (tax) {
  openModal({
    componentProps: {
      api: api.changeStatus,
      params: [tax.id],
      defaultStatus: tax.status,
      options: ["Verified", "Suspended", "Closed"],
    },
    component: ChangeStatus,
  })
}
export const verify = async function (tax) {
  openModal({
    componentProps: {
      api: api.verify,
      params: [tax.id],
      defaultStatus: tax.status,
      options: ["Verified", "Suspended", "Closed"],
    },
    component: ChangeStatus,
  })
}
