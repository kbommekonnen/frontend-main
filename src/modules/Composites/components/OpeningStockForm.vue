<template>
  <div
    class="flex flex-col space-y-3 items-start"
    @mouseenter="showAddWarehouse = true"
    @mouseleave="showAddWarehouse = false"
  >
    <div
      class="w-full capitalize text-xl tracking-wider border-b-2 border-primaryBg py-1"
    >
      opening stock
    </div>
    <div class="w-full flex flex-col space-y-0">
      <div class="text-3xl border-b-2 border-primaryBg px-4 py-2">
        {{ store.openingStockTotalAmount }}
      </div>
      <div class="space-y-4">
        <div class="flex w-full text-sm opacity-75">
          <div class="w-2/3">warehouse</div>
          <div class="w-1/3">amount</div>
        </div>
        <div class="slide-right flex-grow capitalize space-y-2 content-start">
          <div
            v-for="warehouse in store.openingStockOnWarehouses"
            :key="warehouse.warehouse"
            class="flex w-full space-x-4"
          >
            <div class="w-2/3 flex-grow">
              {{ warehouse.name }}
            </div>
            <input
              v-model="warehouse.amount"
              type="number"
              class="w-1/3 border-none custom-input border-white bg-primary"
            />
          </div>
        </div>
      </div>
      <div class="flex justify-end space-x-4 pt-2">
        <button
          v-if="warehouseOptions.length > 0"
          icon=""
          class="cursor-pointer"
          @click="handleClose"
        >
          add more
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCompositestore } from "../store.js"
import { closeModal } from "@/plugins/modal.js"
import warehouseApi from "../../Warehouses/api.js"
import { useRouter } from "vue-router"
import { computed, inject, ref } from "vue"

let store = useCompositestore()

const router = useRouter()
const getRequest = inject("getRequest")
let showAddWarehouse = ref(false)
let warehouses = ref([])

getRequest(warehouseApi.getVerified).then(({ error, composites }) => {
  if (composites) {
    warehouses.value = composites.map(({ id, name }) => ({
      label: name,
      value: id,
    }))
  }

  if (composites.length < 5) {
    store.openingStockOnWarehouses = warehouses.value.map(
      ({ label, value }) => ({
        name: ref(label),
        warehouse: ref(value),
        amount: ref(0),
      }),
    )
  } else {
    store.openingStockOnWarehouses = warehouses.value
      .slice(0, 3)
      .map(({ label, value }) => ({
        name: ref(label),
        warehouse: ref(value),
        amount: ref(0),
      }))
  }
})

const warehouseOptions = computed(() =>
  warehouses.value.filter(
    ({ value }) =>
      !store.openingStockOnWarehouses.find(
        ({ warehouse }) => warehouse == value,
      ),
  ),
)
function handleClose() {
  closeModal()
}
</script>

<style></style>
