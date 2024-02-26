import eventBus from "../../eventBus"
import api from "./api"

import { openModal } from "../../plugins/modal.js"

import ChangeStatus from "@/components/card/ChangeStatus.vue"
import ConfirmDelete from "@/components/card/ConfirmDelete.vue"
import NewWarehouseForm from "./components/NewWarehouseForm.vue"
import EditWarehouse from "./components/EditWarehouseForm.vue"

export const openCreateForm = function (warehouse) {
  openModal({
    componentProps: { warehouse },
    component: NewWarehouseForm,
  })
}
export const openEditForm = function (id) {
  openModal({
    componentProps: { id },
    component: EditWarehouse,
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
    name: "Warehouse",
    params: [id],
  })
}

export const deleteWarehouse = async function (id) {
  const response = await eventBus.request({
    ...api.delete,
    params: [id],
  })
  if (response) {
    eventBus.$emit("open-toast", {
      message: "Warehouse deleted successfully",
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
      title: "Delete Warehouse",
      message: "Are you sure to delete Warehouse",
      action: deleteWarehouse,
      api: {
        ...api.delete,
        params: [id],
      },
      toastMessage: "Warehouse deleted successfully",
      params: id,
    },
    component: ConfirmDelete,
  })
}
export const changeStatus = async function (warehouse) {
  openModal({
    componentProps: {
      api: api.changeStatus,
      params: [warehouse.id],
      defaultStatus: warehouse.status,
      options: ["Active", "Inactive"],
    },
    component: ChangeStatus,
  })
}
export const verify = async function (warehouse) {
  openModal({
    componentProps: {
      api: api.verify,
      params: [warehouse.id],
      defaultStatus: warehouse.status,
      options: ["Active", "Inactive"],
    },
    component: ChangeStatus,
  })
}
