import { appStorage } from "../../services/storageService"
const activeWarehouse = appStorage.getItem("active_warehouse")
import {
  openDetail,
  openEditForm,
  reject,
  verify,
  cancel,
  confirmDelete,
} from "./functions"

export default [
  {
    label: "open detail",
    function: openDetail,
    icon: "eye",
    code: "LC30",
    idParam: true,
  },
  {
    label: "edit",
    function: openEditForm,
    icon: "edit",
    code: "LC30",
    shown: true,
    filter: ({ status, sourceStore }) =>
      status == "Pending" && sourceStore == activeWarehouse,
    fullParam: true,
  },
  {
    label: "cancel",
    function: cancel,
    icon: "edit",
    code: "LC30",
    shown: true,
    filter: ({ status, sourceStore }) =>
      status == "Pending" && sourceStore == activeWarehouse,
    fullParam: true,
  },
  // {
  //   label: "Change status",
  //   function: changeStatus,
  //   icon: "info-circle",
  //   code: "LC31",
  //   fullParam: true,
  // },
  {
    label: "verify",
    function: verify,
    icon: "info-circle",
    code: "LC32",
    shown: true,
    filter: ({ status, destinationStore }) =>
      status == "Pending" && destinationStore == activeWarehouse,
    fullParam: true,
  },
  {
    label: "reject",
    function: reject,
    icon: "times",
    code: "LC32",
    shown: true,
    filter: ({ status, destinationStore }) =>
      status == "Pending" && destinationStore == activeWarehouse,
    fullParam: true,
  },
  {
    label: "Delete",
    function: confirmDelete,
    icon: "trash",
    code: "LC40",
    idParam: true,
  },
]
