export default {
  getAll: { method: "get", url: "/config/price-list" },

  getVerified: { method: "get", url: "/config/price-list/verified" },

  create: { method: "post", url: "/config/price-list" },

  get: { method: "get", url: "/config/price-list/:id" },

  edit: { method: "put", url: "/config/price-list/:id" },

  changeStatus: { method: "put", url: "/config/price-list/changestatus/:id" },
  verify: { method: "put", url: "/config/price-list/verify/:id" },

  delete: { method: "delete", url: "/config/price-list/:id" },
}
