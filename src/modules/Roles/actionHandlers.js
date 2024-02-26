import {
  openDetail,
  openEditForm,
  changeStatus,
  verify,
  confirmDelete,
} from "./functions"

export default [
  {
    label: "Open detail",
    function: openDetail,
    icon: "eye",
    code: "RL30",
    fullParam: true,
  },
  {
    label: "Edit",
    function: openEditForm,
    icon: "edit",
    code: "RL30",
    shown: true,
    idParam: true,
  },
  {
    label: "Change status",
    function: changeStatus,
    icon: "info-circle",
    code: "RL31",
    fullParam: true,
  },
  {
    label: "Verify",
    function: verify,
    icon: "info-circle",
    code: "RL32",
    fullParam: true,
  },
  {
    label: "Delete",
    function: confirmDelete,
    icon: "trash",
    code: "RL40",
    idParam: true,
  },
]
