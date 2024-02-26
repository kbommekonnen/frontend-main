<template>
  <div class="flex flex-col space-y-3">
    <div class="flex space-x-1px bg-primaryBg">
      <div class="bg-white flex-grow space-y-3 p-3">
        <div class="flex space-x-2 items-start">
          <div class="space-y-2 flex-grow">
            <base-input
              v-model="searchInput"
              placeholder="search by name, sku, or barcode"
              @enter="searchItems"
            >
              <!-- <template #prefix>
            <div>
                schema
            </div>
        </template> -->
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
          <base-button
            icon="search"
            :iconRight="true"
            class="h-full py-4"
            @click="searchItems"
          />
        </div>
        <div class="space-y-1 bg-primaryBg w-full">
          <div
            v-if="searching"
            class="flex justify-center text-center bg-white"
          >
            searching...
          </div>
          <div v-else-if="items.length > 0" class="space-y-2 p-2 bg-white">
            <div
              class="item flex space-x-2 p-3 rounded cursor-pointer"
              v-for="(item, i) in itemsOptions"
              :key="item._id"
              :class="{
                'border border-primary bg-secondaryBg': item.selected,
                'border-b border-primaryBg': !item.selected,
              }"
              @click="toggleSelect(i)"
            >
              <div class="border border-primaryBg p-3">image</div>
              <div class="flex-grow space-y-2">
                <div class="">
                  {{ item.name }}
                </div>
                <div class="text-sm">sku {{ item.sku }}</div>
              </div>
            </div>
          </div>
          <div v-else class="flex justify-center text-lg bg-white text-center">
            no items found
          </div>
        </div>
      </div>
      <div v-if="selectedItems.length > 0" class="bg-white space-y-1 p-3">
        <div class="flex text-lg">selected items</div>
        <div class="flex-grow items-center space-y-2">
          <div
            v-for="item in selectedItems"
            :key="item.id"
            class="item border border-primaryBg p-4 grid grid-cols-3 gap-4 items-center"
          >
            <div class="col-span-2">
              {{ item.name }}
            </div>
            <base-input
              type="number"
              placeholder="quantity"
              v-model="item.quantity"
              class="text-lg w-24"
            >
            </base-input>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-end space-x-3">
      <base-button
        type="secondary"
        icon="times"
        label="cancel"
        @click="closeModal"
      />
      <base-button
        icon="chevron-right"
        :iconRight="true"
        label="continue"
        @click="handleContinue"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, inject, ref } from "vue"
import api from "../../Items/api.js"
import { closeModal } from "../../../plugins/modal"

const getRequest = inject("getRequest")
let searchInput = ref("")
let items = ref([])
let selectedItems = ref([])
let searching = ref(false)
let searchingSchema = ref("name")
let itemsOptions = computed(() =>
  items.value.filter(
    ({ _id }) => !selectedItems.value.find((item) => item._id == _id),
  ),
)
const props = defineProps(["addMoreItems", "excludeItems"])

const searchingSchemaOptions = ["name", "sku", "barcode"]

function toggleSelect(i) {
  const item = items.value[i]
  const index = selectedItems.value.findIndex(({ _id }) => _id == item._id)
  if (index > -1) {
    items.value[i].selected = false
    selectedItems.value.splice(index, 1)
  } else {
    items.value[i].selected = true
    selectedItems.value.push(item)
  }
}

function searchItems() {
  searching.value = true
  getRequest({
    ...api.search,
    query: { keyword: searchInput.value, searchWith: searchingSchema.value },
  }).then((response) => {
    if (response.error) {
    } else if (response.items) {
      items.value = response.items
      console.log(items)
    }
    searching.value = false
  })
}

function handleContinue() {
  console.log("props ", props.addMoreItems)
  props.addMoreItems(selectedItems.value)
  closeModal()
}
</script>

<style scoped>
.item {
  @apply bg-secondaryBg;
}
.item:hover {
  @apply bg-primaryBg font-semibold;
}
</style>
