<template>
  <div class="cursor-pointer">
    <tippy
      trigger="click"
      theme="light"
      arrow
      placement="bottom"
      animation="scale"
      interactive
      hideOnClick
      content="switch active warehouse"
      @outSideClickHandler="closeTippy"
    >
      <div
        class="flex items-center space-x-2 py-1 px-3 rounded hover:text-primary cursor-pointer grow-active shadow-sm"
      >
        <div class="activeWarehouse">
          {{ store.activeWarehouse.label }}
        </div>
      </div>
      <template #content>
        <div
          class="py-2 px-4 space-y-2 overflow-y-auto bg-white shadow-md border border-bgPrimary w-64"
        >
          <div class="text-sm w-full flex-shrink-0">
            {{ $t("switch active warehouse") }}
          </div>
          <!-- <pre>{{ store.warehouseOptions }}</pre> -->
          <div class="grid grid-cols-2 gap-3 min-w-fit w-full">
            <div
              v-for="warehouse in store.warehouseOptions"
              :key="warehouse.value"
              class="flex space-x-3 p-3 rounded capitalize shadow-sm flex-shrink-0"
              :class="{
                'bg-primary text-white': warehouse.value == store.active,
              }"
              @click="store.setActiveWarehouse(warehouse.value)"
            >
              {{ warehouse.label }}
            </div>
          </div>
        </div>
      </template>
    </tippy>
  </div>
</template>

<script setup>
import { useActiveWarehouseStore } from "../store.js"
import { Tippy } from "vue-tippy"
import { inject, onMounted } from "vue"
import api from "../api.js"

const store = useActiveWarehouseStore()

const getRequest = inject("getRequest")
onMounted(() => {
  getRequest(api.getMyStores).then(({ items }) => {
    if (items) {
      store.setWarehouses(
        items.map(({ name, id }) => ({ label: name, value: id })),
      )
      if (!store.active && items.length > 0) {
        store.setActiveWarehouse(items[0]._id)
      }
    }
  })
  store.setActiveWarehouse(store.active)
})
</script>

<style scoped>
.activeWarehouse {
  @apply rounded flex-shrink-0 flex-grow border border-primary px-4 capitalize cursor-pointer;
}
@media (max-width: 640px) {
  .activeWarehouse {
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 20vw;
  }
}
</style>
