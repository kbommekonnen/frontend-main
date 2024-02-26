import eventBus from "@/eventBus"
import api from "./api"  
import { openModal } from "@/plugins/modal.js"

import ChangeStatus from "@/components/card/ChangeStatus.vue"
import ConfirmDelete from "@/components/card/ConfirmDelete.vue"
import NewCustomerForm from "./components/NewCustomerForm.vue"
import EditCustomerForm from "./components/EditCustomerForm.vue"

export const openCreateForm = function () {
  openModal({
    componentProps: { style: "p-16"},
    component: NewCustomerForm,
  })
}
export const openEditForm = function (Customer) {
  openModal({
    componentProps: { Customer },
    component: EditCustomerForm,
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
  ;
}

export const openDetail = async function (id) {
  eventBus.$emit("route", {
    name: "Customer",
    params: [id],
  })
}

export const deleteCustomer = async function (id) {
  const response = await eventBus.request({
    ...api.delete,
    params: [id],
  })
  if (response) {
    eventBus.$emit("open-toast", {
      message: "Customer deleted successfully",
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
      title: "Delete Customer",
      message: "Are you sure to delete Customer",
      api: {
        ...api.delete,
        params: [id],
      },
      toastMessage: "Customer deleted successfully",
      params: id,
    },
    component: ConfirmDelete,
  })
}
export const changeStatus = async function (Customer) {
  openModal({
    componentProps: {
      api: api.changeStatus,
      params: [Customer.id],
      defaultStatus: Customer.status,
      options: ["Active", "Inactive"],
    },
    component: ChangeStatus,
  })
}
export const verify = async function (Customer) {
  openModal({
    componentProps: {
      api: api.verify,
      params: [Customer.id],
      defaultStatus: Customer.status,
      options: ["Active", "Inactive"],
    },
    component: ChangeStatus,
  })
}
  