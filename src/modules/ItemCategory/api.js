export default {
  getAll: { method: "get", url: "/item/category" },

  getVerified: { method: "get", url: "/item/category/verified" },

  create: { method: "post", url: "/item/category" },

  get: { method: "get", url: "/item/category/:id" },

  edit: { method: "put", url: "/item/category/:id" },

  changeStatus: { method: "put", url: "/item/category/changestatus/:id" },
  verify: { method: "put", url: "/item/category/verify/:id" },

  delete: { method: "delete", url: "/item/category/:id" },
}
