export default {
  getAll: { method: "get", url: "/distribution/uservehicleroute" },

  getVerified: { method: "get", url: "/distribution/uservehicleroute/verified" },

  create: { method: "post", url: "/distribution/uservehicleroute" },

  get: { method: "get", url: "/distribution/uservehicleroute/:id" },

  edit: { method: "put", url: "/distribution/uservehicleroute/:id" },

  changeStatus: {
    method: "put",
    url: "/distribution/uservehicleroute/changestatus/:id",
  },

  verify: { method: "put", url: "/distribution/uservehicleroute/verify/:id" },

  delete: { method: "delete", url: "/distribution/uservehicleroute/:id" },
}
