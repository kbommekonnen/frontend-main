export default {
  getAll: { method: "get", url: "/item/group" },

  getVerified: { method: "get", url: "/item/group/verified" },

  create: { method: "post", url: "/item/group" },

  get: { method: "get", url: "/item/group/:id" },

  edit: { method: "put", url: "/item/group/:id" },

  changeStatus: { method: "put", url: "/item/group/changestatus/:id" },
  verify: { method: "put", url: "/item/group/verify/:id" },

  delete: { method: "delete", url: "/item/group/:id" },
}
