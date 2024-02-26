export default {
  getAll: { method: "get", url: "/distribution/vehicle" },

  getVerified: { method: "get", url: "/distribution/vehicle/verified" },

  create: { method: "post", url: "/distribution/vehicle" },

  get: { method: "get", url: "/distribution/vehicle/:id" },

  edit: { method: "put", url: "/distribution/vehicle/:id" },

  changeStatus: {
    method: "put",
    url: "/distribution/vehicle/changestatus/:id",
  },

  verify: { method: "put", url: "/distribution/vehicle/verify/:id" },

  delete: { method: "delete", url: "/distribution/vehicle/:id" },
}
