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
    idParam: true,
    shown: true,
  },
  // {
  //   label: "edit",
  //   function: openEditForm,
  //   icon: "edit",
  //   code: "LC30",
  //   idParam: true,
  // },
  // {
  //   label: "change status",
  //   function: changeStatus,
  //   icon: "info-circle",
  //   code: "LC31",
  //   fullParam: true,
  // },
  // {
  //   label: "Verify",
  //   function: verify,
  //   icon: "info-circle",
  //   code: "LC32",
  //   fullParam: true,
  // },
  // {
  //   label: "Delete",
  //   function: confirmDelete,
  //   icon: "trash",
  //   code: "LC40",
  //   idParam: true,
  // },
]