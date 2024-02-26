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
    en: "RL30",
    fullParam: true,
  },
  {
    label: "Edit",
    function: openEditForm,
    icon: "edit",
    en: "RL30",
    fullParam: true,
  },
  {
    label: "Change status",
    function: changeStatus,
    icon: "info-circle",
    en: "RL31",
    fullParam: true,
  },
  {
    label: "Verify",
    function: verify,
    icon: "info-circle",
    en: "RL32",
    fullParam: true,
  },
  {
    label: "Delete",
    function: confirmDelete,
    icon: "trash",
    en: "RL40",
    idParam: true,
  },
]
