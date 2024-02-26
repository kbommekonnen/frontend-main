import { openEditForm, changeStatus, confirmDelete } from "./functions"

export default [
  {
    label: "edit",
    function: openEditForm,
    icon: "edit",
    code: "30",
    fullParam: true,
    shown: true,
  },
  {
    label: "change status",
    function: changeStatus,
    icon: "info-circle",
    code: "31",
    fullParam: true,
  },
  {
    label: "delete",
    function: confirmDelete,
    icon: "trash",
    code: "40",
    idParam: true,
  },
]
