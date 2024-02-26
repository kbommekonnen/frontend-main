import eventBus from "../../eventBus"
import api from "./api"

import { openModal } from "../../plugins/modal.js"

import ChangeStatus from "@/components/card/ChangeStatus.vue"
import ConfirmDelete from "@/components/card/ConfirmDelete.vue"
import EditOrganization from "./components/Organization.vue"

export const openEditOrganizationForm = function (organization) {
  openModal({
    componentProps: { organization },
    component: EditOrganization,
  })
}

export const editOrganization = async function (id, form, defaultForm) {
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

export const openOrganizationDetail = async function (id) {
  eventBus.$emit("route", {
    name: "Organization",
    params: [id],
  })
}

export const deleteOrganization = async function (id) {
  const response = await eventBus.request({
    ...api.delete,
    params: [id],
  })
  if (response) {
    eventBus.$emit("open-toast", {
      message: "Organization deleted successfully",
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
      title: "Delete Organization",
      message: "Are you sure to delete Organization",
      action: deleteOrganization,
      params: id,
    },
    component: ConfirmDelete,
  })
}
export const changeStatus = async function (organization) {
  openModal({
    componentProps: {
      api: api.changeStatus,
      params: [organization.id],
      defaultStatus: organization.status,
      options: ["Verified", "Suspended", "Closed"],
    },
    component: ChangeStatus,
  })
}
export const verify = async function (organization) {
  openModal({
    componentProps: {
      api: api.verify,
      params: [organization.id],
      defaultStatus: organization.status,
      options: ["Verified", "Suspended", "Closed"],
    },
    component: ChangeStatus,
  })
}
