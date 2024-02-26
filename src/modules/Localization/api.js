export default {
  getAll: { method: "get", url: "/config/localization" },

  getVerified: { method: "get", url: "/config/localization/verified" },

  create: { method: "post", url: "/config/localization" },

  get: { method: "get", url: "/config/localization/:id" },

  edit: { method: "put", url: "/config/localization/:id" },

  changeStatus: { method: "put", url: "/config/localization/changestatus/:id" },
  verify: { method: "put", url: "/config/localization/verify/:id" },

  delete: { method: "delete", url: "/config/localization/:id" },
}
