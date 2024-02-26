export default {
  getAll: { method: "get", url: "/supplier" },

  getVerified: { method: "get", url: "/supplier/verified" },

  create: { method: "post", url: "/supplier" },

  get: { method: "get", url: "/supplier/:id" },

  edit: { method: "put", url: "/supplier/:id" },

  changeStatus: {
    method: "put",
    url: "/supplier/changestatus/:id",
  },

  verify: { method: "put", url: "/supplier/verify/:id" },

  delete: { method: "delete", url: "/supplier/:id" },
}
