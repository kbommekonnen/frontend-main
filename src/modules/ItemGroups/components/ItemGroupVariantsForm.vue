<template>
  <div class="">
    <data-table
      :headers="ItemGroupVariantsFormHeaders"
      :items="store.itemGroupVariants"
    >
      <template #header_sku="{ label }">
        <div class="">
          <div class="">{{ $t(label) }}</div>
          <base-button
            type="plain"
            :label="$t('generate sku')"
            class="capitalize"
            @click="generateSKU"
          />
        </div>
      </template>

      <template
        v-for="header in ['header_cost', 'header_reorderPoint']"
        :key="header"
        #[header]="{ label, key }"
      >
        <div class="">
          <div class="">{{ $t(label) }}</div>
          <base-button
            type="plain"
            icon="copy"
            :label="$t('copy to all')"
            class="capitalize"
            @click="copyToAll(key)"
          />
        </div>
      </template>
      <template #header_price="{ label, key }">
        <div class="space-y-2">
          <div class="flex justify-center space-x-4">
            {{ $t(label) }}
          </div>
          <div
            class="flex justify-around p-1 border-t border-x border-textMedium"
          >
            <div v-for="{ label, value } in priceLists" :key="value">
              {{ label }}
              <base-button
                type="plain"
                icon="copy"
                :label="$t('copy to all')"
                class="capitalize"
                @click="copyPricingToAll(value)"
              />
            </div>
          </div>
        </div>
      </template>
      <template #name="{ value }">
        <div>{{ store.name + value }}</div>
      </template>
      <template #sku="{ index }">
        <base-input v-model="store.itemGroupVariants[index].sku" />
      </template>
      <template #reorderPoint="{ index }">
        <base-input
          type="number"
          v-model="store.itemGroupVariants[index].reorderPoint"
        />
      </template>
      <template #cost="{ index }">
        <base-input v-model="store.itemGroupVariants[index].cost" />
      </template>
      <template #price="{ index }">
        <div class="flex space-x-4">
          <base-input
            v-for="(priceList, i) in priceLists"
            :key="i"
            type="number"
            v-model="store.itemGroupVariants[index].pricing[i].price"
          />
        </div>
      </template>
    </data-table>
    <!-- <pre>{{ store.itemGroupVariants }}</pre> -->
  </div>
</template>
<script setup>
import { inject, ref, watch } from "vue"
import DataTable from "@/components/table/DataTable.vue"
import { useItemGroupstore } from "../store"
import priceListApi from "../../PriceLists/api.js"
import { ItemGroupVariantsFormHeaders } from "../headers"

const getRequest = inject("getRequest")
const store = useItemGroupstore()
let priceLists = ref([])
getRequest(priceListApi.getVerified).then(({ items }) => {
  if (items) {
    priceLists.value = items.map(({ id, name }) => ({ label: name, value: id }))
    store.addPriceListToItemVariants(priceLists.value)
  }
})

// generate SKU number to all item variants
function generateSKU() {
  store.generateAllItemsSkuNumber()
}

// copy first item data to all other elements
// @params key = header key of the item to be copied and paste
function copyToAll(key) {
  store.copyToAll(key)
}

function copyPricingToAll(priceList) {
  store.copyPricingToAll(priceList)
}

watch(
  () => store.attributes,
  (attributes) => {
    if (attributes.length > 0) {
      let variants = []
      let indexes = attributes.map(({ options }) => ({
        current: 0,
        length: options.length,
        active: false,
      }))
      indexes[indexes.length - 1].active = true
      let activeIndex = indexes.length > 0 ? indexes.length - 1 : 0
      let switchIndex = indexes.length > 1 ? indexes.length - 2 : 0
      const variantsSize = indexes.reduce(
        (size, { length }) => (size *= length),
        1,
      )
      for (let i = 0; i < variantsSize; i++) {
        const name = indexes.reduce(
          (acc, { current }, j) =>
            (acc = acc + "-" + attributes[j].options[current]),
          "",
        )

        variants.push({
          name,
        })
        const index = indexes.findIndex(({ active }) => active)
        if (indexes[index].current == indexes[index].length - 1) {
          if (
            activeIndex > 0 &&
            indexes[activeIndex].current ==
            indexes[activeIndex].length - 1
          ) {
            --activeIndex
          }
          if (switchIndex == activeIndex) {
            if (
              switchIndex > 0 &&
              indexes[switchIndex].current == indexes[switchIndex].length - 1
            ) {
              --switchIndex
            }
            activeIndex = indexes.length - 1
            indexes[switchIndex].current += 1
            // reset
            indexes = indexes.map((item, k) => {
              if (k > switchIndex) {
                item.current = 0
              }
              return item
            })
          } else {
            indexes[activeIndex].current += 1
            indexes = indexes.map((item, k) => {
              if (k > activeIndex) {
                item.current = 0
              }
              return item
            })
          }
        } else indexes[index].current += 1

        // else if (indexes[activeIndex].current > indexes[activeIndex].length) {
        //   indexes[activeIndex].current = 0
        // }
      }
      indexes = indexes.map((index) => {
        index.current = 0
        return index
      })
      store.setItemGroupVariants(variants, priceLists.value)
    } else return
  },
  { immediate: true, deep: true },
)
</script>
