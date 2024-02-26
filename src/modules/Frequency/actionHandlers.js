import { openEditForm, changeStatus, confirmDelete } from "./functions"

export default [
  {
    label: "edit",
    function: openEditForm,
    icon: "edit",
    code: "LC30",
    fullParam: true,
    shown: true,
  },
  {
    label: "change status",
    function: changeStatus,
    icon: "info-circle",
    code: "LC31",
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
