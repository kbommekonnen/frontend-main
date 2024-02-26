export default {
  getAll: { method: "get", url: "/location" },

  getVerified: { method: "get", url: "/location/verified" },

  create: { method: "post", url: "/location" },

  get: { method: "get", url: "/location/:id" },

  edit: { method: "put", url: "/location/:id" },

  changeStatus: { method: "put", url: "/location/changestatus/:id" },
  verify: { method: "put", url: "/location/verify/:id" },

  delete: { method: "delete", url: "/location/:id" },
}
