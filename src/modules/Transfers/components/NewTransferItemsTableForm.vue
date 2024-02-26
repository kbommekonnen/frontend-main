<template>
  <div class="flex flex-col h-full">
    <data-table
      :showHeader="false"
      :headers="transferItemsFormHeaders"
      :items="store.items"
      class="flex-grow w-full h-full"
    >
    <template #_id="{ value, item }">
        <base-select
          v-if="value == 0"
          placeholder="type or click to select an item"
          icon="image"
          :items="itemsOptions"
          v-model="transferItem"
        >
          <template #search>
            <div class="flex space-x-2 items-start p-2">
              <div class="space-y-2 flex-grow">
                <base-input
                  v-model="searchInput"
                  placeholder="type and hit enter "
                  padding="small"
                  @enter="searchItems"
                  @input="searchItems"
                >
                </base-input>
                <div class="flex space-x-3">
                  <div
                    v-for="schema in searchingSchemaOptions"
                    :key="schema"
                    class="px-3 cursor-pointer hover:bg-primaryBg hover:text-primary hover:scale-125 rounded"
                    :class="{
                      'bg-primaryBg text-primary': schema == searchingSchema,
                    }"
                    @click="searchingSchema = schema"
                  >
                    {{ schema }}
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template #option="{ item }">
            <div
              class="w-full item flex space-x-2 px-1 rounded cursor-pointer border-b border-primaryBg"
            >
              <div class="border border-primaryBg p-3">
                <base-icon name="image" />
              </div>
              <div class="flex-grow space-y-0">
                <div class="">
                  {{ item.label.name }}
                </div>
                <div class="flex space-x-3 justify-between">
                  <div class="text-sm">sku {{ item.label.sku }}</div>
                  <div class="flex-shrink-0 text-sm px-2 bg-primaryBg">
                    brand
                    <span class="px-4 text-textDark">{{
                      item.label.brand
                    }}</span>
                  </div>
                  <div
                    v-if="item.label.size"
                    class="flex-shrink-0 text-sm px-2 bg-primaryBg"
                  >
                    size
                    <span class="px-4 text-textDark">{{
                      `${item.label.size} ${item.label.unit.shortName}`
                    }}</span>
                  </div>
                  <div class="flex-shrink-0 text-sm px-2 bg-primaryBg">
                    on hand
                    <span class="px-4 text-textDark">{{
                      item.label.stockDetail.quantity
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </base-select>
        <div v-else>
          <div
            class="w-full bg-secondaryBg flex space-x-2 px-1 rounded cursor-pointer border-b border-primaryBg"
          >
            <div class="border border-primaryBg p-3">
              <base-icon name="image" />
            </div>
            <div class="flex-grow space-y-0">
              <div class="text-xl">
                {{ item.name }}
              </div>
              <div class="flex space-x-3 justify-between">
                <div class="text-sm">sku {{ item.sku }}</div>
                <div class="flex-shrink-0 text-sm px-2 bg-primaryBg">
                  brand
                  <span class="px-4 text-textDark">{{ item.brand }}</span>
                </div>
                <div
                  v-if="item.size"
                  class="flex-shrink-0 text-sm px-2 bg-primaryBg"
                >
                  size
                  <span class="px-4 text-textDark">{{
                    `${item.size} ${item.unit.shortName}`
                  }}</span>
                </div>
                <div class="flex-shrink-0 text-sm px-2 bg-primaryBg">
                  on hand
                  <span class="px-4 text-textDark">{{
                    item.stockDetail.quantity
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #quantity="{ index, item }">
        <div v-if="item._id" class="flex space-x-2">
          <base-input
            class="max-w-fit"
            type="number"
            v-model="store.items[index].quantity"
            padding="small"
          />
          <base-select
            placeholder="unit"
            v-model="store.items[index].unit"
            :items="getUnitsOptions(store.items[index].units)"
            padding="small"
          >
            <template #option="{ item }">
              <div>
                {{ item.label.name }}
              </div>
            </template>
            <template #default="{ item }">
              <div>
                {{ item.label.shortName }}
              </div>
            </template></base-select
          >
        </div>
      </template>
      <template #actions="{ index, item }">
        <div v-if="item._id" class="flex space-x-2">
          <base-button type="danger" icon="times" @click="removeItem(index)" />
        </div>
      </template>
    </data-table>
  </div>
</template>

<script setup>
import { transferItemsFormHeaders } from "../headers"
import DataTable from "@/components/table/DataTable.vue"
import api from "../../Items/api.js"
import unitsApi from "../../MeasurementUnits/api.js"
import { useTransferStore } from "../store"
import { inject, ref, watch } from "vue"

const store = useTransferStore()

let searchInput = ref("")
let transferItem = ref("")
let searching = ref(false)
let searchingSchema = ref("name")

const searchingSchemaOptions = ["name", "sku", "barcode"]

watch(
  () => transferItem.value,
  (item) => {
    if (item && item._id) {
      store.addItem(item)
      // reset active selected item , to select another item
      transferItem.value = ""
      // exclude item from selectable itemsoptions since it is already selected
      itemsOptions.value.splice(
        itemsOptions.value.indexOf(({ _id }) => _id == item._id),
        1,
      )
    }
  },
  {
    deep: true,
  },
)

const getRequest = inject("getRequest")

// options displayed on add item selector excluding selected items
let itemsOptions = ref([])
let unitsOptions = ref([])

//initially search all items
searchItems()

// search items by name, sku and/or barcode
function searchItems() {
  searching.value = true
  getRequest({
    ...api.search,
    query: { keyword: searchInput.value, searchWith: searchingSchema.value },
  }).then((response) => {
    console.log(response)
    if (response.items) {
      itemsOptions.value = response.items
        .filter(({ _id }) => !store.items.find((item) => item._id == _id))
        .map(({ _id, ...rest }) => ({ label: rest, value: { _id, ...rest } }))
    }
    searching.value = false
  })
}

// fetch measurement units

getRequest(unitsApi.getAll).then((response) => {
  if (response.items) {
    unitsOptions.value = response.items
  }
})

// remove item from selected list and add to itemsOptions list
function removeItem(index) {
  const deletedItems = store.removeItem(index)
  // add deleted items to selectable items options
  itemsOptions.value.push(
    ...deletedItems.map(({ _id, ...rest }) => ({
      label: rest,
      value: { _id, ...rest },
    })),
  )
}

function getUnitsOptions(units) {
  return units.map(({ unit, quantity }) => ({
    value: unit,
    label: { quantity, ...unitsOptions.value.find(({ _id }) => _id == unit) },
  }))
}
</script>

<style></style>
