import eventBus from "../../eventBus"
import api from "./api"

import { openModal } from "../../plugins/modal.js"

import ChangeStatus from "@/components/card/ChangeStatus.vue"
import ConfirmDelete from "@/components/card/ConfirmDelete.vue"
import NewMeasurementUnitForm from "./components/NewMeasurementUnitForm.vue"
import EditMeasurementUnitForm from "./components/EditMeasurementUnitForm.vue"

export const openCreateForm = function (measurementUnit) {
  openModal({
    componentProps: { measurementUnit },
    component: NewMeasurementUnitForm,
  })
}
export const openEditForm = function (measurementUnit) {
  openModal({
    componentProps: { measurementUnit },
    component: EditMeasurementUnitForm,
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
    name: "Measurement Unit",
    params: [id],
  })
}

export const deleteMeasurementUnit = async function (id) {
  const response = await eventBus.request({
    ...api.delete,
    params: [id],
  })
  if (response) {
    eventBus.$emit("open-toast", {
      message: "Measurement Unit deleted successfully",
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
      title: "Delete Measurement Unit",
      message: "Are you sure to delete Measurement Unit",
      api: {
        ...api.delete,
        params: [id],
      },
      toastMessage: "Measurement Unit deleted successfully",
      params: id,
    },
    component: ConfirmDelete,
  })
}
export const changeStatus = async function (measurementUnit) {
  openModal({
    componentProps: {
      api: api.changeStatus,
      params: [measurementUnit.id],
      defaultStatus: measurementUnit.status,
      options: ["Verified", "Suspended", "Closed"],
    },
    component: ChangeStatus,
  })
}
export const verify = async function (measurementUnit) {
  openModal({
    componentProps: {
      api: api.verify,
      params: [measurementUnit.id],
      defaultStatus: measurementUnit.status,
      options: ["Verified", "Suspended", "Closed"],
    },
    component: ChangeStatus,
  })
}
