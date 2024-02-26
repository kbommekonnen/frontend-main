import eventBus from "../../eventBus"
import api from "./api"

import { openModal } from "../../plugins/modal.js"

import ChangeStatus from "@/components/card/ChangeStatus.vue"
import ConfirmDelete from "@/components/card/ConfirmDelete.vue"
import NewFrequencyForm from "./components/NewFrequencyForm.vue"
import EditFrequencyForm from "./components/EditFrequencyForm.vue"

export const openCreateForm = function () {
  openModal({
    componentProps: { style: "p-16"},
    component: NewFrequencyForm,
  })
}
export const openEditForm = function (Frequency) {
  openModal({
    componentProps: { Frequency },
    component: EditFrequencyForm,
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
    name: "Frequency",
    params: [id],
  })
}

export const deleteFrequency = async function (id) {
  const response = await eventBus.request({
    ...api.delete,
    params: [id],
  })
  if (response) {
    eventBus.$emit("open-toast", {
      message: "Frequency deleted successfully",
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
      title: "Delete Frequency",
      message: "Are you sure to delete Frequency",
      api: {
        ...api.delete,
        params: [id],
      },
      toastMessage: "Frequency deleted successfully",
      params: id,
    },
    component: ConfirmDelete,
  })
}
export const changeStatus = async function (Frequency) {
  openModal({
    componentProps: {
      api: api.changeStatus,
      params: [Frequency.id],
      defaultStatus: Frequency.status,
      options: ["Verified", "Suspended", "Closed"],
    },
    component: ChangeStatus,
  })
}
export const verify = async function (Frequency) {
  openModal({
    componentProps: {
      api: api.verify,
      params: [Frequency.id],
      defaultStatus: Frequency.status,
      options: ["Verified", "Suspended", "Closed"],
    },
    component: ChangeStatus,
  })
}
