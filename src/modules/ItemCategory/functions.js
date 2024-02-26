import eventBus from "../../eventBus"
import api from "./api"

import { openModal } from "../../plugins/modal.js"

import ChangeStatus from "@/components/card/ChangeStatus.vue"
import ConfirmDelete from "@/components/card/ConfirmDelete.vue"
import NewItemCategoryForm from "./components/NewItemCategoryForm.vue"
import EditItemCategory from "./components/ItemCategories.vue"

export const openCreateForm = function (category) {
  openModal({
    componentProps: { category },
    component: NewItemCategoryForm,
  })
}
export const openEditForm = function (category) {
  openModal({
    componentProps: { category },
    component: EditItemCategory,
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
    name: "Item Category",
    params: [id],
  })
}

export const deleteItemCategory = async function (id) {
  const response = await eventBus.request({
    ...api.delete,
    params: [id],
  })
  if (response) {
    eventBus.$emit("open-toast", {
      message: "Item Category deleted successfully",
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
      title: "Delete Item Category",
      message: "Are you sure to delete Item Category",
      api: {
        ...api.delete,
        params: [id],
      },
      toastMessage: "Item Category deleted successfully",
      params: id,
    },
    component: ConfirmDelete,
  })
}
export const changeStatus = async function (category) {
  openModal({
    componentProps: {
      api: api.changeStatus,
      params: [category.id],
      defaultStatus: category.status,
      options: ["Verified", "Suspended", "Closed"],
    },
    component: ChangeStatus,
  })
}
export const verify = async function (category) {
  openModal({
    componentProps: {
      api: api.verify,
      params: [category.id],
      defaultStatus: category.status,
      options: ["Verified", "Suspended", "Closed"],
    },
    component: ChangeStatus,
  })
}
