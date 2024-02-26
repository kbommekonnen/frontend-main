import eventBus, { router } from "../../eventBus"
import api from "./api"

import { openModal } from "../../plugins/modal.js"

import ChangeStatus from "@/components/card/ChangeStatus.vue"
import ConfirmDelete from "@/components/card/ConfirmDelete.vue"
import EditTransfer from "./components/Transfers.vue"
import ActionModal from "@/components/card/ActionModal.vue"

export const openEditForm = function (priceList) {
  openModal({
    componentProps: { priceList },
    component: EditTransfer,
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
  router.push({name: "TransferDetail", params: {id}})
}

export const deleteTransfer = async function (id) {
  const response = await eventBus.request({
    ...api.delete,
    params: [id],
  })
  if (response) {
    eventBus.$emit("open-toast", {
      message: "Transfer transaction deleted successfully",
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
      title: "Delete transfer transaction",
      message: "Are you sure to delete transfer transaction",
      api: {
        ...api.delete,
        params: [id],
      },
      toastMessage: "transfer transaction deleted successfully",
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
export const verify = async function (doc) {
  openModal({
    componentProps: {
      title: "verify transfer transaction",
      message: "are you sure to verify transfer transaction",
      label: "verify",
      icon: "check-circle",
      api: api.verify,
      params: [doc._id],
    },
    component: ActionModal,
  })
}
export const reject = async function (doc) {
  openModal({
    componentProps: {
      title: "reject transfer transaction",
      message: "are you sure to reject transfer transaction",
      label: "reject",
      icon: "times",
      api: api.reject,
      params: [doc._id],
    },
    component: ActionModal,
  })
}
export const cancel = async function (doc) {
  openModal({
    componentProps: {
      title: "cancel transfer transaction",
      message: "are you sure to cancel transfer transaction",
      label: "cancel",
      icon: "times",
      api: api.cancel,
      params: [doc._id],
    },
    component: ActionModal,
  })
}
