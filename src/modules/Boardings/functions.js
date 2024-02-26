import eventBus from "@/eventBus"
import api from "./api"  
import { openModal } from "@/plugins/modal.js"

import ChangeStatus from "@/components/card/ChangeStatus.vue"
import ConfirmDelete from "@/components/card/ConfirmDelete.vue"
import NewBoardingForm from "./components/NewBoardingForm.vue"
import EditBoardingForm from "./components/EditBoardingForm.vue"

export const openCreateForm = function () {
  openModal({
    componentProps: { style: "p-16"},
    component: NewBoardingForm,
  })
}
export const openEditForm = function (Boarding) {
  openModal({
    componentProps: { Boarding },
    component: EditBoardingForm,
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
  ;
}

export const openDetail = async function (id) {
  eventBus.$emit("route", {
    name: "Boarding",
    params: [id],
  })
}

export const deleteBoarding = async function (id) {
  const response = await eventBus.request({
    ...api.delete,
    params: [id],
  })
  if (response) {
    eventBus.$emit("open-toast", {
      message: "Boarding deleted successfully",
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
      title: "Delete Boarding",
      message: "Are you sure to delete Boarding",
      api: {
        ...api.delete,
        params: [id],
      },
      toastMessage: "Boarding deleted successfully",
      params: id,
    },
    component: ConfirmDelete,
  })
}
export const changeStatus = async function (Boarding) {
  openModal({
    componentProps: {
      api: api.changeStatus,
      params: [Boarding.id],
      defaultStatus: Boarding.status,
      options: ["Active", "Inactive"],
    },
    component: ChangeStatus,
  })
}
export const verify = async function (Boarding) {
  openModal({
    componentProps: {
      api: api.verify,
      params: [Boarding.id],
      defaultStatus: Boarding.status,
      options: ["Active", "Inactive"],
    },
    component: ChangeStatus,
  })
}
  