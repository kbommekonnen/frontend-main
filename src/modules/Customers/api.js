export default {
  getAll: { method: "get", url: "/customer" },

  getVerified: { method: "get", url: "/customer/verified" },

  create: { method: "post", url: "/customer" },

  get: { method: "get", url: "/customer/:id" },

  edit: { method: "put", url: "/customer/:id" },

  changeStatus: {
    method: "put",
    url: "/customer/changestatus/:id",
  },

  verify: { method: "put", url: "/customer/verify/:id" },

  delete: { method: "delete", url: "/customer/:id" },
}
