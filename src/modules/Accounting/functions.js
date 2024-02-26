import eventBus, { router } from "../../eventBus"
import api from "./api"
import { openModal } from "../../plugins/modal.js"

import ChangeStatusCard from "@/components/card/ChangeStatus.vue"
import ConfirmDelete from "@/components/card/ConfirmDelete.vue"
// import NewAccountNameForm from "./components/NewAccountNameForm.vue"

// routes to account creation form
export const openCreateForm = function () {
  router.push({
    name: "AddNewAccount",
  })
}

export const openEditForm = function (id) {
  router.push({ name: "EditNewAccount", params: { id } })
}

export const handleEdit = async function (id, form, defaultForm) {
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

export const openDetail = async function ({ id }) {
  router.push(`/inventory/accounts/${id}`)
}

export const deleteAccount = async function (id) {
  const response = await eventBus.request({
    ...api.deleteApi,
    params: [id],
  })
  if (response) {
    eventBus.$emit("open-toast", {
      message: "Account deleted successfully",
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
      title: "Delete Account",
      message: "Are you sure to delete Account",
      api: {
        ...api.deleteApi,
        params: [id],
      },
      toastMessage: "Account deleted successfully",
      params: id,
    },
    component: ConfirmDelete,
  })
}
export const handleChangeStatus = async function (account) {
  openModal({
    componentProps: {
      api: api.verify,
      params: [account.id],
      defaultStatus: account.status,
      options: ["Active", "Inactive"],
    },
    component: ChangeStatusCard,
  })
}
export const verify = async function (account) {
  openModal({
    componentProps: {
      api: api.verify,
      params: [account.id],
      defaultStatus: account.status,
      options: ["Active", "Inactive"],
    },
    component: ChangeStatusCard,
  })
}
