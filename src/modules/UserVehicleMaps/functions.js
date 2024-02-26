import eventBus from "@/eventBus"
import api from "./api"  
import { openModal } from "@/plugins/modal.js"

import ChangeStatus from "@/components/card/ChangeStatus.vue"
import ConfirmDelete from "@/components/card/ConfirmDelete.vue"
import NewUserVehicleMapForm from "./components/NewUserVehicleMapForm.vue"
import EditUserVehicleMapForm from "./components/EditUserVehicleMapForm.vue"

export const openCreateForm = function () {
  openModal({
    componentProps: { style: "p-16"},
    component: NewUserVehicleMapForm,
  })
}
export const openEditForm = function (UserVehicleMap) {
  openModal({
    componentProps: { UserVehicleMap },
    component: EditUserVehicleMapForm,
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
    name: "UserVehicleMap",
    params: [id],
  })
}

export const deleteUserVehicleMap = async function (id) {
  const response = await eventBus.request({
    ...api.delete,
    params: [id],
  })
  if (response) {
    eventBus.$emit("open-toast", {
      message: "UserVehicleMap deleted successfully",
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
      title: "Delete UserVehicleMap",
      message: "Are you sure to delete UserVehicleMap",
      api: {
        ...api.delete,
        params: [id],
      },
      toastMessage: "UserVehicleMap deleted successfully",
      params: id,
    },
    component: ConfirmDelete,
  })
}
export const changeStatus = async function (UserVehicleMap) {
  openModal({
    componentProps: {
      api: api.changeStatus,
      params: [UserVehicleMap.id],
      defaultStatus: UserVehicleMap.status,
      options: ["Active", "Inactive"],
    },
    component: ChangeStatus,
  })
}
export const verify = async function (UserVehicleMap) {
  openModal({
    componentProps: {
      api: api.verify,
      params: [UserVehicleMap.id],
      defaultStatus: UserVehicleMap.status,
      options: ["Active", "Inactive"],
    },
    component: ChangeStatus,
  })
}
  