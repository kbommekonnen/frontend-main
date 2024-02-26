import eventBus from "../../eventBus"
import api from "./api"

import { openModal } from "../../plugins/modal.js"

import ChangeStatus from "@/components/card/ChangeStatus.vue"
import ConfirmDelete from "@/components/card/ConfirmDelete.vue"
import NewLocationForm from "./components/NewPriceListForm.vue"
import EditLocation from "./components/PriceLists.vue"

export const openCreateForm = function (priceList) {
  openModal({
    componentProps: { priceList },
    component: NewLocationForm,
  })
}
export const openEditForm = function (priceList) {
  openModal({
    componentProps: { priceList },
    component: EditLocation,
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
    name: "Price List",
    params: [id],
  })
}

export const deleteLocation = async function (id) {
  const response = await eventBus.request({
    ...api.delete,
    params: [id],
  })
  if (response) {
    eventBus.$emit("open-toast", {
      message: "Price List deleted successfully",
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
      title: "Delete Price List",
      message: "Are you sure to delete Price List",
      api: {
        ...api.delete,
        params: [id],
      },
      toastMessage: "Price List deleted successfully",
      params: id,
    },
    component: ConfirmDelete,
  })
}
export const changeStatus = async function (priceList) {
  openModal({
    componentProps: {
      api: api.changeStatus,
      params: [priceList.id],
      defaultStatus: priceList.status,
      options: ["Verified", "Suspended", "Closed"],
    },
    component: ChangeStatus,
  })
}
export const verify = async function (priceList) {
  openModal({
    componentProps: {
      api: api.verify,
      params: [priceList.id],
      defaultStatus: priceList.status,
      options: ["Verified", "Suspended", "Closed"],
    },
    component: ChangeStatus,
  })
}
