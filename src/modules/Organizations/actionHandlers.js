import {
  openOrganizationDetail,
  openEditOrganizationForm,
  changeStatus,
  verify,
  confirmDelete,
} from "./functions"

export default [
  {
    label: "Open detail",
    function: openOrganizationDetail,
    icon: "eye",
    code: "OR30",
    fullParam: true,
  },
  {
    label: "Edit",
    function: openEditOrganizationForm,
    icon: "edit",
    code: "OR30",
    fullParam: true,
  },
  {
    label: "Change status",
    function: changeStatus,
    icon: "info-circle",
    code: "OR31",
    fullParam: true,
  },
  {
    label: "Verify",
    function: verify,
    icon: "info-circle",
    code: "OR32",
    fullParam: true,
  },
  {
    label: "Delete",
    function: confirmDelete,
    icon: "trash",
    code: "OR40",
    idParam: true,
  },
]
