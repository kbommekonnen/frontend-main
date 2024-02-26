import eventBus from "@/eventBus"
import api from "./api"  
import { openModal } from "@/plugins/modal.js"

import ChangeStatus from "@/components/card/ChangeStatus.vue"
import ConfirmDelete from "@/components/card/ConfirmDelete.vue"
import NewVehicleForm from "./components/NewVehicleForm.vue"
import EditVehicleForm from "./components/EditVehicleForm.vue"

export const openCreateForm = function () {
  openModal({
    componentProps: { style: "p-16"},
    component: NewVehicleForm,
  })
}
export const openEditForm = function (Vehicle) {
  openModal({
    componentProps: { Vehicle },
    component: EditVehicleForm,
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
    name: "Vehicle",
    params: [id],
  })
}

export const deleteVehicle = async function (id) {
  const response = await eventBus.request({
    ...api.delete,
    params: [id],
  })
  if (response) {
    eventBus.$emit("open-toast", {
      message: "Vehicle deleted successfully",
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
      title: "Delete Vehicle",
      message: "Are you sure to delete Vehicle",
      api: {
        ...api.delete,
        params: [id],
      },
      toastMessage: "Vehicle deleted successfully",
      params: id,
    },
    component: ConfirmDelete,
  })
}
export const changeStatus = async function (Vehicle) {
  openModal({
    componentProps: {
      api: api.changeStatus,
      params: [Vehicle.id],
      defaultStatus: Vehicle.status,
      options: ["Active", "Inactive"],
    },
    component: ChangeStatus,
  })
}
export const verify = async function (Vehicle) {
  openModal({
    componentProps: {
      api: api.verify,
      params: [Vehicle.id],
      defaultStatus: Vehicle.status,
      options: ["Active", "Inactive"],
    },
    component: ChangeStatus,
  })
}
  