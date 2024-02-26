export default {
  getAll: { method: "get", url: "/transaction/adjustment" },

  getVerified: { method: "get", url: "/transaction/adjustment/verified" },

  create: { method: "post", url: "/transaction/adjustment" },

  get: { method: "get", url: "/transaction/adjustment/:id" },

  getItemAdjustments: {
    method: "get",
    url: "/transaction/adjustment/item/:id",
  },

  edit: { method: "put", url: "/transaction/adjustment/:id" },

  changeStatus: {
    method: "put",
    url: "/transaction/adjustment/changestatus/:id",
  },
  verify: { method: "put", url: "/transaction/adjustment/verify/:id" },

  delete: { method: "delete", url: "/transaction/adjustment/:id" },
}
