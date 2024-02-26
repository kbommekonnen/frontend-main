import eventBus, { router } from "../../eventBus"
import api from "./api"

import { openModal } from "../../plugins/modal.js"

import ChangeStatus from "@/components/card/ChangeStatus.vue"
import ConfirmDelete from "@/components/card/ConfirmDelete.vue"
// import NewUserForm from "./components/NewUserForm.vue"

export const openCreateForm = function () {
  router.push("/settings/auth/new-user")
}
export const openEditForm = function (id) {
  router.push({ name: "EditUserForm", params: { id } })
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
    name: "User",
    params: [id],
  })
}

export const deleteUser = async function (id) {
  const response = await eventBus.request({
    ...api.delete,
    params: [id],
  })
  if (response) {
    eventBus.$emit("open-toast", {
      message: "User deleted successfully",
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
      title: "Delete User",
      message: "Are you sure to delete User",
      api: {
        ...api.delete,
        params: [id],
      },
      toastMessage: "User deleted successfully",
      params: id,
    },
    component: ConfirmDelete,
  })
}
export const changeStatus = async function (user) {
  openModal({
    componentProps: {
      api: api.changeStatus,
      params: [user.id],
      defaultStatus: user.status,
      options: ["Pending", "Active", "Vacation", "Suspended", "Request Reset"],
    },
    component: ChangeStatus,
  })
}
export const verify = async function (user) {
  openModal({
    componentProps: {
      api: api.verify,
      params: [user.id],
      defaultStatus: user.status,
      options: ["Pending", "Active", "Vacation", "Suspended", "Request Reset"],
    },
    component: ChangeStatus,
  })
}
