import eventBus, { router } from "../../eventBus"
import api from "./api"
import { openModal } from "../../plugins/modal.js"

import ChangeStatus from "@/components/card/ChangeStatus.vue"
import ConfirmDelete from "@/components/card/ConfirmDelete.vue"
// import NewItemNameForm from "./components/NewItemNameForm.vue"

export const openCreateForm = function () {
  // openModal({
  //   component: NewItemNameForm,
  // })
  router.push({
    name: "AddNewItem",
  })
}
export const openEditForm = function (id) {
  router.push({ name: "EditNewItem", params: { id } })
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

export const openDetail = async function ({ id }) {
  router.push(`/inventory/items/${id}`)
}

export const deleteItem = async function (id) {
  const response = await eventBus.request({
    ...api.delete,
    params: [id],
  })
  if (response) {
    eventBus.$emit("open-toast", {
      message: "Item deleted successfully",
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
      title: "Delete Item",
      message: "Are you sure to delete Item",
      api: {
        ...api.delete,
        params: [id],
      },
      toastMessage: "Item deleted successfully",
      params: id,
    },
    component: ConfirmDelete,
  })
}
export const changeStatus = async function (item) {
  openModal({
    componentProps: {
      api: api.changeStatus,
      params: [item.id],
      defaultStatus: item.status,
      options: ["Verified", "Suspended", "Closed"],
    },
    component: ChangeStatus,
  })
}
export const verify = async function (item) {
  openModal({
    componentProps: {
      api: api.verify,
      params: [item.id],
      defaultStatus: item.status,
      options: ["Verified", "Suspended", "Closed"],
    },
    component: ChangeStatus,
  })
}
