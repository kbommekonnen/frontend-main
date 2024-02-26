import {
  openDetail,
  openEditForm,
  handleChangeStatus,
  verify,
  confirmDelete,
} from "./functions"

export default [
  {
    label: "open detail",
    function: openDetail,
    icon: "eye",
    code: "AC30",
    fullParam: true,
  },
  {
    label: "edit",
    function: openEditForm,
    icon: "edit",
    shown: true,
    code: "AC30",
    fullParam: true,
  },
  {
    label: "change status",
    function: handleChangeStatus,
    icon: "info-circle",
    code: "AC31",
    fullParam: true,
  },
  {
    label: "verify",
    function: verify,
    icon: "info-circle",
    code: "AC32",
    fullParam: true,
  },
  {
    label: "delete",
    function: confirmDelete,
    icon: "trash",
    code: "AC40",
    idParam: true,
  },
]
