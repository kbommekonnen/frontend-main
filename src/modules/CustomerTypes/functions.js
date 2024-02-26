import eventBus from "../../eventBus"
import api from "./api"

import { openModal } from "../../plugins/modal.js"

import ChangeStatus from "@/components/card/ChangeStatus.vue"
import ConfirmDelete from "@/components/card/ConfirmDelete.vue"
import NewCustomerTypeForm from "./components/NewCustomerTypeForm.vue"
import EditCustomerTypeForm from "./components/EditCustomerTypeForm.vue"

export const openCreateForm = function () {
  openModal({
    componentProps: { style: "p-16"},
    component: NewCustomerTypeForm,
  })
}
export const openEditForm = function (CustomerType) {
  openModal({
    componentProps: { CustomerType },
    component: EditCustomerTypeForm,
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
    name: "Customer Type",
    params: [id],
  })
}

export const deleteCustomerType = async function (id) {
  const response = await eventBus.request({
    ...api.delete,
    params: [id],
  })
  if (response) {
    eventBus.$emit("open-toast", {
      message: "Customer Type deleted successfully",
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
      title: "Delete Customer Type",
      message: "Are you sure to delete Customer Type",
      api: {
        ...api.delete,
        params: [id],
      },
      toastMessage: "Customer Type deleted successfully",
      params: id,
    },
    component: ConfirmDelete,
  })
}
export const changeStatus = async function (CustomerType) {
  openModal({
    componentProps: {
      api: api.changeStatus,
      params: [CustomerType.id],
      defaultStatus: CustomerType.status,
      options: ["Verified", "Suspended", "Closed"],
    },
    component: ChangeStatus,
  })
}
export const verify = async function (CustomerType) {
  openModal({
    componentProps: {
      api: api.verify,
      params: [CustomerType.id],
      defaultStatus: CustomerType.status,
      options: ["Verified", "Suspended", "Closed"],
    },
    component: ChangeStatus,
  })
}
