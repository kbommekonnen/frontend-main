import {
  openDetail,
  openEditForm,
  changeStatus,
  verify,
  confirmDelete,
} from "./functions"

export default [
  {
    label: "open detail",
    function: openDetail,
    icon: "eye",
    code: "LC30",
    fullParam: true,
  },
  {
    label: "edit",
    function: openEditForm,
    icon: "edit",
    shown: true,
    code: "LC30",
    idParam: true,
  },
  {
    label: "change status",
    function: changeStatus,
    icon: "info-circle",
    code: "LC31",
    fullParam: true,
  },
  {
    label: "verify",
    function: verify,
    icon: "info-circle",
    code: "LC32",
    fullParam: true,
  },
  {
    label: "delete",
    function: confirmDelete,
    icon: "trash",
    code: "LC40",
    idParam: true,
  },
]
