import eventBus from "../../eventBus"
import api from "./api"

import { openModal } from "../../plugins/modal.js"

import ChangeStatus from "@/components/card/ChangeStatus.vue"
import ConfirmDelete from "@/components/card/ConfirmDelete.vue"
import EditComposite from "./components/CompositeItems.vue"
import NewCompositeNameForm from "./components/NewCompositeItemNameForm.vue"

export const openCreateForm = function () {
  openModal({
    component: NewCompositeNameForm,
  })
}
export const openEditForm = function (composite) {
  openModal({
    componentProps: { composite },
    component: EditComposite,
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
    name: "Composite",
    params: [id],
  })
}

export const deleteComposite = async function (id) {
  const response = await eventBus.request({
    ...api.delete,
    params: [id],
  })
  if (response) {
    eventBus.$emit("open-toast", {
      message: "Composite deleted successfully",
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
      title: "Delete Composite",
      message: "Are you sure to delete Composite",
      api: {
        ...api.delete,
        params: [id],
      },
      toastMessage: "Composite deleted successfully",
      params: id,
    },
    component: ConfirmDelete,
  })
}
export const changeStatus = async function (composite) {
  openModal({
    componentProps: {
      api: api.changeStatus,
      params: [composite.id],
      defaultStatus: composite.status,
      options: ["Verified", "Suspended", "Closed"],
    },
    component: ChangeStatus,
  })
}
export const verify = async function (composite) {
  openModal({
    componentProps: {
      api: api.verify,
      params: [composite.id],
      defaultStatus: composite.status,
      options: ["Verified", "Suspended", "Closed"],
    },
    component: ChangeStatus,
  })
}
