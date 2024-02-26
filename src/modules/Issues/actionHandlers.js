import {
  openDetail,
  openNewPurchase,
  openNewPurchaseOrder,
  openEditForm,
  changeStatus,
  verify,
  confirmDelete,
} from "./functions"

export default [
  {
    label: "detail",
    function: openDetail,
    icon: "eye",
    code: "LC30",
    idParam: true,
    shown: true,
  },
  {
    label: "purchase",
    function: openNewPurchase,
    icon: "plus",
    code: "LC30",
    fullParam: true,
    shown: true,
  },
  {
    label: "order",
    function: openNewPurchaseOrder,
    icon: "donate",
    code: "LC30",
    fullParam: true,
    shown: true,
  },
  {
    label: "edit",
    function: openEditForm,
    icon: "edit",
    code: "LC30",
    fullParam: true,
  },
  {
    label: "Change status",
    function: changeStatus,
    icon: "info-circle",
    code: "LC31",
    fullParam: true,
  },
  {
    label: "Verify",
    function: verify,
    icon: "info-circle",
    code: "LC32",
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
