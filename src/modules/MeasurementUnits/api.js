export default {
  getAll: { method: "get", url: "/config/measurement-unit" },

  getVerified: { method: "get", url: "/config/measurement-unit/verified" },

  create: { method: "post", url: "/config/measurement-unit" },

  get: { method: "get", url: "/config/measurement-unit/:id" },

  edit: { method: "put", url: "/config/measurement-unit/:id" },

  changeStatus: {
    method: "put",
    url: "/config/measurement-unit/changestatus/:id",
  },
  verify: { method: "put", url: "/config/measurement-unit/verify/:id" },

  delete: { method: "delete", url: "/config/measurement-unit/:id" },
}
