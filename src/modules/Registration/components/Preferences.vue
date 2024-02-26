<template>
  <div class="flex flex-col space-y-3 items-start">
    <div
      class="w-full capitalize text-xl tracking-wider border-b-2 border-primaryBg py-1"
    >
      Let's know your preferences
    </div>
    <div class="flex flex-col lg:flex-row lg:space-x-6 space-y-3 lg:space-y-0">
      <div
        class="flex-grow capitalize grid grid-cols-2 gap-4 content-start border-2 p-4 border-primaryBg"
      >
        <base-radio
          label="select your preferred language"
          class="col-span-2"
          :items="languageOptions"
          v-model="store.language"
        />
        <base-input
          type="date"
          label="inventory start date"
          required
          v-model="store.inventoryStartDate"
        />
        <base-input
          label="country"
          placeholder="Ethiopia"
          class=""
          v-model="store.country"
        />
      </div>
      <div
        class="flex-grow capitalize grid grid-cols-2 gap-4 content-start border-2 p-4 border-primaryBg"
      >
        <base-radio
          label="select industry that best fits your business"
          :items="industryOptions"
          v-model="store.industry"
          containerClass="grid grid-cols-2 gap-3 max-w-xl"
        >
          <template #item="{ item }">
            <div class="space-y-1">
              <div class="capitalize leading-tight flex flex-shrink-0 text-sm">
                {{ item.label }}
              </div>
              <div
                v-if="item.value == store.industry"
                class="lowercase text-sm text-textLight"
              >
                {{ item.detail }}
              </div>
            </div>
          </template>
        </base-radio>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePreferencesStore } from "../store.js"
let industryOptions = [
  {
    label: "steel",
    value: "steel",
  },
  {
    label: "food & drink",
    value: "food & drink",
  },
  {
    label: "flour",
    value: "flour",
  },
  {
    label: "general drink",
    value: "general drink",
  },
  {
    label: "other",
    value: "other",
  },
]
const languageOptions = [
  { label: "english", value: "english" },
  { label: "afaan oromo", value: "afaan oromo" },
  { label: "ኣማርኛ", value: "ኣማርኛ" },
  { label: "ትግርኛ", value: "ትግርኛ" },
]
let store = usePreferencesStore()
</script>

<style></style>
