import eventBus from "../../eventBus"
import api from "./api"

import { openModal } from "../../plugins/modal.js"

import ChangeStatus from "@/components/card/ChangeStatus.vue"
import ConfirmDelete from "@/components/card/ConfirmDelete.vue"
import NewLocalizationForm from "./components/NewLocalizationForm.vue"
import EditLocalization from "./components/Localizations.vue"

export const openCreateForm = function (localization) {
  openModal({
    componentProps: { localization },
    component: NewLocalizationForm,
  })
}
export const openEditForm = function (localization) {
  openModal({
    componentProps: { localization },
    component: EditLocalization,
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
    key: "Localization",
    params: [id],
  })
}

export const deleteLocalization = async function (id) {
  const response = await eventBus.request({
    ...api.delete,
    params: [id],
  })
  if (response) {
    eventBus.$emit("open-toast", {
      message: "localization deleted successfully",
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
      title: "Delete localization",
      message: "Are you sure to delete localization",
      api: {
        ...api.delete,
        params: [id],
      },
      toastMessage: "localization deleted successfully",
      params: id,
    },
    component: ConfirmDelete,
  })
}
export const changeStatus = async function (localization) {
  openModal({
    componentProps: {
      api: api.changeStatus,
      params: [localization.id],
      defaultStatus: localization.status,
      options: ["Verified", "Suspended", "Closed"],
    },
    component: ChangeStatus,
  })
}
export const verify = async function (localization) {
  openModal({
    componentProps: {
      api: api.verify,
      params: [localization.id],
      defaultStatus: localization.status,
      options: ["Verified", "Suspended", "Closed"],
    },
    component: ChangeStatus,
  })
}
