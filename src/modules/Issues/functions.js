import eventBus, { router } from "../../eventBus"
import api from "./api"

import { openModal } from "../../plugins/modal.js"

import ChangeStatus from "@/components/card/ChangeStatus.vue"
import ConfirmDelete from "@/components/card/ConfirmDelete.vue"
import EditIssue from "./components/Issues.vue"

export const openEditForm = function (priceList) {
  openModal({
    componentProps: { priceList },
    component: EditIssue,
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
  router.push({ name: "IssueDetail", params: { id } })
}
export const openNewPurchase = async function ({ issueNumber }) {
  router.push({ name: "NewPurchaseForm", query: { issueNumber } })
}
export const openNewPurchaseOrder = async function ({ issueNumber }) {
  router.push({ name: "NewPurchaseOrderForm", query: { issueNumber } })
}

export const deleteSell = async function (id) {
  const response = await eventBus.request({
    ...api.delete,
    params: [id],
  })
  if (response) {
    eventBus.$emit("open-toast", {
      message: "issue transaction deleted successfully",
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
      title: "Delete issue transaction",
      message: "Are you sure to delete issue transaction",
      api: {
        ...api.delete,
        params: [id],
      },
      toastMessage: "issue transaction deleted successfully",
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
