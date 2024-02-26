export default {
  getAll: { method: "get", url: "/transaction/itemtransfer" },

  getVerified: { method: "get", url: "/transaction/itemtransfer/verified" },

  create: { method: "post", url: "/transaction/itemtransfer" },

  get: { method: "get", url: "/transaction/itemtransfer/detail/:id" },

  getItemTransfers: {
    method: "get",
    url: "/transaction/itemtransfer/item/:id",
  },

  edit: { method: "put", url: "/transaction/itemtransfer/:id" },

  changeStatus: {
    method: "put",
    url: "/transaction/itemtransfer/changestatus/:id",
  },
  verify: { method: "put", url: "/transaction/itemtransfer/verify/:id" },
  reject: { method: "put", url: "/transaction/itemtransfer/reject/:id" },
  cancel: { method: "put", url: "/transaction/itemtransfer/cancel/:id" },

  delete: { method: "delete", url: "/transaction/itemtransfer/:id" },
}
