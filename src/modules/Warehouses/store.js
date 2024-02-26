import { defineStore } from "pinia"
import { ref } from "vue"
import { setActiveWarehouseHeader } from "../../plugins/axios"
import { appStorage } from "../../services/storageService"

export const useWarehouseStore = defineStore("warehouseStore", {
  state: () => ({
    name: ref(""),
    location: ref(""),
    parent: ref(""),
    users: ref([]),
    jerrors: ref({}),
  }),
  getters: {
    form() {
      return {
        name: this.name,
        location: this.location,
        parent: this.parent,
        users: this.users,
      }
    },
    error() {
      return this.success && Object.values(this.errors).find((value) => value)
    },
  },
  actions: {
    setError(error) {
      this.jerrors = error
    },
  },
})
export const useActiveWarehouseStore = defineStore("activeWarehouseStore", {
  state: () => ({
    active: ref(appStorage.getItem("active_warehouse")),
    warehouses: ref([]),
  }),
  getters: {
    warehouseOptions() {
      return [{ label: "all", value: "" }, ...this.warehouses]
    },
    activeWarehouse() {
      return (
        this.warehouseOptions.find(({ value }) => value == this.active) || {}
      )
    },
  },
  actions: {
    setWarehouses(warehouses = []) {
      this.warehouses = warehouses
    },
    setActiveWarehouse(warehouse) {
      appStorage.setItem("active_warehouse", warehouse)
      setActiveWarehouseHeader(warehouse)
      this.active = warehouse
    },
  },
})
