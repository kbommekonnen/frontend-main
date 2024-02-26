export default {
  getAll: { method: "get", url: "/config/tax" },

  getVerified: { method: "get", url: "/config/tax/verified" },

  create: { method: "post", url: "/config/tax" },

  get: { method: "get", url: "/config/tax/:id" },

  edit: { method: "put", url: "/config/tax/:id" },

  changeStatus: { method: "put", url: "/config/tax/changestatus/:id" },
  verify: { method: "put", url: "/config/tax/verify/:id" },

  delete: { method: "delete", url: "/config/tax/:id" },
}
