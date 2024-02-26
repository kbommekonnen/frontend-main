<template>
  <div class="p-4 flex flex-col space-y-3 capitalize bg-white">
    <div class="text-lg border-b-2 border-primaryBg py-2">
      {{ $t("stock on hand") }}
    </div>
    <div class="space-y-2 tracking-wider text-lg">
      <div v-for="item in itemsOnStock" :key="item.id" class="item-on-stock">
        <div class="">
          {{ item.store.name }}
        </div>
        <div class="text-end">
          {{ formateNumber(item.quantity) }}
        </div>
      </div>
      <div class="item-on-stock light-title">
        <div class="uppercase">total</div>
        <div class="text-end">{{ formateNumber(totalItemsCount) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, ref, toRefs } from "vue"
import { usePreferencesStore } from "../../Settings/store"
import { useActiveWarehouseStore } from "../../Warehouses/store"
import api from "../api"
import { formateNumber } from "../../../utils"
const props = defineProps(["itemId"])
const activeWarehouseStore = useActiveWarehouseStore()
const { supportsMultipleWarehouses } = toRefs(usePreferencesStore())
const activeApi =
  supportsMultipleWarehouses.value && activeWarehouseStore.active
    ? api.getItemStoreStockOnHand
    : api.getItemOrganizationStockOnHand

let itemsOnStock = ref([])
let totalItemsCount = computed(() =>
  itemsOnStock.value.reduce((sum, { quantity = 0 }) => (sum += quantity), 0),
)
const getRequest = inject("getRequest")
getRequest({ ...activeApi, params: [props.itemId] }).then(({ items }) => {
  itemsOnStock.value = items
})
</script>

<style>
.item-on-stock {
  @apply flex justify-between space-x-5 bg-secondaryBg p-3;
}
</style>
