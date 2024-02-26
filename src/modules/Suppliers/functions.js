import eventBus from "@/eventBus"
import api from "./api"  
import { openModal } from "@/plugins/modal.js"

import ChangeStatus from "@/components/card/ChangeStatus.vue"
import ConfirmDelete from "@/components/card/ConfirmDelete.vue"
import NewSupplierForm from "./components/NewSupplierForm.vue"
import EditSupplierForm from "./components/EditSupplierForm.vue"

export const openCreateForm = function () {
  openModal({
    componentProps: { style: "p-16"},
    component: NewSupplierForm,
  })
}
export const openEditForm = function (Supplier) {
  openModal({
    componentProps: { Supplier },
    component: EditSupplierForm,
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
    name: "Supplier",
    params: [id],
  })
}

export const deleteSupplier = async function (id) {
  const response = await eventBus.request({
    ...api.delete,
    params: [id],
  })
  if (response) {
    eventBus.$emit("open-toast", {
      message: "Supplier deleted successfully",
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
      title: "Delete Supplier",
      message: "Are you sure to delete Supplier",
      api: {
        ...api.delete,
        params: [id],
      },
      toastMessage: "Supplier deleted successfully",
      params: id,
    },
    component: ConfirmDelete,
  })
}
export const changeStatus = async function (Supplier) {
  openModal({
    componentProps: {
      api: api.changeStatus,
      params: [Supplier.id],
      defaultStatus: Supplier.status,
      options: ["Active", "Inactive"],
    },
    component: ChangeStatus,
  })
}
export const verify = async function (Supplier) {
  openModal({
    componentProps: {
      api: api.verify,
      params: [Supplier.id],
      defaultStatus: Supplier.status,
      options: ["Active", "Inactive"],
    },
    component: ChangeStatus,
  })
}
  