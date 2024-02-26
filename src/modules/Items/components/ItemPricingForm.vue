<template>
  <div
    class="flex flex-col space-y-3 h-full items-start"
    @mouseenter="showAddWarehouse = true"
    @mouseleave="showAddWarehouse = false"
  >
    <div
      class="w-full capitalize text-xl tracking-wider border-b-2 border-primaryBg py-1"
    >
      {{ $t("pricing") }}
    </div>
    <div
      class="slide-right flex-grow w-full px-2 capitalize space-y-3 flex flex-col justify-start"
    >
      <base-input
        label="purchasing cost"
        placeholder=""
        class=""
        padding="big"
        v-model="store.purchasingCost"
        :error="store.jerrors.purchasingCost"
      />

      <div
        v-for="priceList in store.pricing"
        :key="priceList.priceList"
        class="w-full"
      >
        <base-input
          type="number"
          :label="priceList.name"
          v-model="priceList.price"
          padding="big"
          class=""
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useItemstore } from "../store.js"
import priceListApi from "../../PriceLists/api.js"
import { inject, ref } from "vue"

let store = useItemstore()

const getRequest = inject("getRequest")
let showAddWarehouse = ref(false)
let priceLists = ref([])

getRequest(priceListApi.getAll).then(({ error, items }) => {
  if (items) {
    priceLists.value = items.map(({ id, name }) => ({ label: name, value: id }))
  }

  if (items.length < 5) {
    store.pricing = priceLists.value.map(({ label, value }) => ({
      name: ref(label),
      priceList: ref(value),
      price: ref(0),
    }))
  } else {
    // slice first 3 or 4 price lists
    store.pricing = priceLists.value.map(({ label, value }) => ({
      name: ref(label),
      priceList: ref(value),
      price: ref(0),
    }))
  }
})
</script>

<style></style>
