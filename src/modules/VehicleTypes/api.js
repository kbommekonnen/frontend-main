export default {
  getAll: { method: "get", url: "/distribution/vehicle-type" },

  getVerified: { method: "get", url: "/distribution/vehicle-type/verified" },

  create: { method: "post", url: "/distribution/vehicle-type" },

  get: { method: "get", url: "/distribution/vehicle-type/:id" },

  edit: { method: "put", url: "/distribution/vehicle-type/:id" },

  changeStatus: {
    method: "put",
    url: "/distribution/vehicle-type/changestatus/:id",
  },

  verify: { method: "put", url: "/distribution/vehicle-type/verify/:id" },

  delete: { method: "delete", url: "/distribution/vehicle-type/:id" },
}
