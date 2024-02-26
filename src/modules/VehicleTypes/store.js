import { defineStore } from "pinia"
import { ref } from "vue"

export const useVehicleTypesstore = defineStore("VehicleTypesstore", {
  state: () => ({
    name: ref(),
    roles: ref(["hello"]),
    capacity: ref([
      {
        item: "",
        unit: "",
        quantity: undefined,
      },
    ]),
    jerrors: ref({
      capacity: [
        {
          item: "",
          unit: "",
          quantity: "",
        },
      ],
    }),
  }),
  getters: {
    form() {
      return {
        name: this.name,
        roles: this.roles.filter((role) => role),
        capacity: this.capacity.filter(
          ({ item, quantity }) => item || quantity,
        ),
      }
    },
    error() {
      return this.success && Object.values(this.errors).find((value) => value)
    },
  },
  actions: {
    setError(error) {
      error.capacity = this.jerrors.capacity
      this.jerrors = error
    },
    addRole() {
      this.roles.push("")
    },
    addCapacity() {
      this.capacity.push({
        item: "",
        unit: "",
        quantity: undefined,
      })
      this.jerrors.capacity.push({
        item: "",
        unit: "",
        quantity: "",
      })
    },
    removeCapacity(index) {
      this.capacity.splice(index, 1)
      this.jerrors.capacity.splice(index, 1)
    },
  },
})
