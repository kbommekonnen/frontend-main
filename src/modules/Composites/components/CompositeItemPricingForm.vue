<template>
  <div
    class="flex flex-col space-y-3 h-full items-start"
    @mouseenter="showAddWarehouse = true"
    @mouseleave="showAddWarehouse = false"
  >
    <div
      class="w-full capitalize text-xl tracking-wider border-b-2 border-primaryBg py-1"
    >
      pricing
    </div>
    <div
      class="slide-right flex-grow w-full px-2 capitalize space-y-2 flex flex-col justify-center"
    >
      <div
        v-for="priceList in store.pricing"
        :key="priceList.priceList"
        class="grid md:grid-cols-2 gap-3 w-full"
      >
        <div class="flex-grow">
          {{ priceList.name }}
        </div>
        <base-input
          type="number"
          v-model="priceList.price"
          padding="small"
          class=""
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCompositestore } from "../store.js"
import priceListApi from "../../PriceLists/api.js"
import { inject, ref } from "vue"

let store = useCompositestore()

const getRequest = inject("getRequest")
let showAddWarehouse = ref(false)
let priceLists = ref([])

getRequest(priceListApi.getAll).then(({ error, composites }) => {
  if (composites) {
    priceLists.value = composites.map(({ id, name }) => ({
      label: name,
      value: id,
    }))
  }

  if (composites.length < 5) {
    store.pricing = priceLists.value.map(({ label, value }) => ({
      name: ref(label),
      priceList: ref(value),
      price: ref(0),
    }))
  } else {
    store.pricing = priceLists.value.slice(0, 3).map(({ label, value }) => ({
      name: ref(label),
      priceList: ref(value),
      price: ref(0),
    }))
  }
})
</script>

<style></style>
