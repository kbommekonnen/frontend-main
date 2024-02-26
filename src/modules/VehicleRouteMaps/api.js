export default {
  getAll: { method: "get", url: "/distribution/vehicleroutemap" },

  getVerified: { method: "get", url: "/distribution/vehicleroutemap/verified" },

  create: { method: "post", url: "/distribution/vehicleroutemap" },

  get: { method: "get", url: "/distribution/vehicleroutemap/:id" },

  edit: { method: "put", url: "/distribution/vehicleroutemap/:id" },

  changeStatus: {
    method: "put",
    url: "/distribution/vehicleroutemap/changestatus/:id",
  },

  verify: { method: "put", url: "/distribution/vehicleroutemap/verify/:id" },

  delete: { method: "delete", url: "/distribution/vehicleroutemap/:id" },
}
