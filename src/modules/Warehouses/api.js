export default {
  getAll: { method: "get", url: "/store" },

  getVerified: { method: "get", url: "/store/verified" },
  getMyStores: { method: "get", url: "/store/mystore" },

  create: { method: "post", url: "/store" },

  get: { method: "get", url: "/store/detail/:id" },

  edit: { method: "put", url: "/store/:id" },

  changeStatus: { method: "put", url: "/store/changestatus/:id" },
  verify: { method: "put", url: "/store/verify/:id" },

  delete: { method: "delete", url: "/store/:id" },
}
