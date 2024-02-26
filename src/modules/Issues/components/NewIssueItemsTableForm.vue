<template>
  <div class="flex flex-col h-full">
    <data-table
      :showHeader="false"
      :headers="issueItemsFormHeaders"
      :items="store.items"
      class="flex-grow w-full h-full"
    >
      <template #_id="{ value, item }">
        <base-select
          v-if="value == 0"
          placeholder="type or click to select an item"
          icon="image"
          :items="itemsOptions"
          v-model="issueItem"
        >
          <template #search>
            <div class="flex space-x-2 items-start p-2">
              <div class="space-y-2 flex-grow">
                <base-input
                  v-model="searchInput"
                  placeholder="type and hit enter "
                  padding="small"
                  :autofocus="true"
                  @enter="searchItems"
                  @input="searchItems"
                >
                </base-input>
                <div v-if="false" class="flex space-x-3">
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
                <div
                  class="inline-flex space-x-3 w-full justify-between max-h-fit"
                >
                  <div class="inline-flex text-sm">
                    sku {{ item.label.sku }}
                  </div>
                  <p
                    v-if="item.label.brand"
                    class="inline-flex flex-shrink-0 text-sm px-2 border border-primaryBg"
                  >
                    brand
                    <span class="px-4 text-textDark">{{
                      item.label.brand
                    }}</span>
                  </p>
                  <p
                    v-if="item.label.size"
                    class="flex-shrink-0 text-sm px-2 bg-primaryBg"
                  >
                    size
                    <span class="px-4 text-textDark">{{
                      `${item.label.size} ${item.label.unit.shortName}`
                    }}</span>
                  </p>
                  <p
                    class="inline-flex flex-shrink-0 text-sm px-2 rounded border border-primaryBg"
                  >
                    on hand
                    <span class="px-4 text-textDark">{{
                      formateNumber(item.label.stockDetail.quantity)
                    }}</span>
                  </p>
                </div>
              </div>
            </div>
          </template>
        </base-select>
        <div v-else>
          <base-accordion class="border border-t-0 border-primaryBg">
            <template #header>
              <div class="w-full flex space-x-2 px-1 rounded cursor-pointer">
                <div class="p-3">
                  <base-icon name="image" />
                </div>
                <div class="flex-grow flex justify-between space-y-0">
                  <p class="text-xl">
                    {{ item.name }}
                  </p>
                  <p class="text-lg text-textLight">
                    {{ formateNumber(item.stockDetail.quantity) }}
                  </p>
                </div>
              </div>
            </template>
            <div class="inline-flex space-x-3 w-full justify-between max-h-fit">
              <div class="inline-flex text-sm">sku {{ item.sku }}</div>
              <p
                v-if="item.brand"
                class="inline-flex flex-shrink-0 text-sm px-2 border border-primaryBg"
              >
                brand
                <span class="px-4 text-textDark">{{ item.brand }}</span>
              </p>
              <p
                v-if="item.size"
                class="flex-shrink-0 text-sm px-2 bg-primaryBg"
              >
                size
                <span class="px-4 text-textDark">{{
                  `${item.size} ${item.unit.shortName}`
                }}</span>
              </p>
              <!-- <p
              class="inline-flex flex-shrink-0 text-sm px-2 rounded border border-primaryBg"
            >
              on hand
              <span class="px-4 text-textDark">{{
                formateNumber(item.stockDetail.quantity)
              }}</span>
            </p> -->
            </div>
          </base-accordion>
          <div
            v-if="false"
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
            :autofocus="true"
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
import DataTable from "@/components/table/DataTable.vue"
import api from "../../Items/api.js"
import unitsApi from "../../MeasurementUnits/api.js"
import { useIssueStore } from "../store"
import { inject, onMounted, ref, watch } from "vue"
import { formateNumber } from "../../../utils"

const props = defineProps(["priceListOptions", "taxOptions"])
const issueItemsFormHeaders = [
  {
    label: "item",
    key: "_id",
  },
  {
    label: "quantity",
    type: "number",
    key: "quantity",
  },
  {
    label: "",
    key: "actions",
  },
].filter(({ filter }) => !filter || filter())
const store = useIssueStore()

let searchInput = ref("")
let issueItem = ref("")
let searching = ref(false)
let searchingSchema = ref("name")

const searchingSchemaOptions = ["name", "sku", "barcode"]

watch(
  () => issueItem.value,
  (item) => {
    if (item && item._id) {
      store.addItem(item, props.taxOptions)
      // reset active selected item , to select another item
      issueItem.value = ""
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

onMounted(() => {
  //initially search all items
  searchItems()
  getRequest(unitsApi.getAll).then((response) => {
    if (response.items) {
      unitsOptions.value = response.items
    }
  })
})
watch(
  () => searchInput.value,
  () => {
    if (searchInput.value) searchItems()
  },
  {
    immediate: false,
    deep: false,
  },
)
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
