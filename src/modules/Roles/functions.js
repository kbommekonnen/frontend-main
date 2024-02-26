import eventBus, { router } from "../../eventBus"
import api from "./api"

import { openModal } from "../../plugins/modal.js"

import ChangeStatus from "@/components/card/ChangeStatus.vue"
import ConfirmDelete from "@/components/card/ConfirmDelete.vue"
import NewRoleForm from "./components/NewRoleForm.vue"

export const openCreateForm = function (role) {
  openModal({
    componentProps: { role },
    component: NewRoleForm,
  })
}
export const openEditForm = function (id) {
  router.push({ name: "EditRoleForm", params: { id } })
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
    name: "Role",
    params: [id],
  })
}

export const deleteRole = async function (id) {
  const response = await eventBus.request({
    ...api.delete,
    params: [id],
  })
  if (response) {
    eventBus.$emit("open-toast", {
      message: "role deleted successfully",
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
      title: "Delete role",
      message: "Are you sure to delete role",
      api: {
        ...api.delete,
        params: [id],
      },
      toastMessage: "role deleted successfully",
      params: id,
    },
    component: ConfirmDelete,
  })
}
export const changeStatus = async function (role) {
  openModal({
    componentProps: {
      api: api.changeStatus,
      params: [role.id],
      defaultStatus: role.status,
      options: ["Active", "Inactive"],
    },
    component: ChangeStatus,
  })
}
export const verify = async function (role) {
  openModal({
    componentProps: {
      api: api.verify,
      params: [role.id],
      defaultStatus: role.status,
      options: ["Active", "Inactive"],
    },
    component: ChangeStatus,
  })
}
