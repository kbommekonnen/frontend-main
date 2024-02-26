<template>
  <div class="flex flex-col space-y-3 items-start">
    <div
      class="w-full capitalize text-xl tracking-wider border-b-2 border-primaryBg py-1"
    >
      organization detail
    </div>
    <div class="flex flex-col lg:flex-row lg:space-x-6 space-y-3 lg:space-y-0">
      <div
        class="slide-right flex-grow capitalize grid grid-cols-2 gap-4 content-start border-2 p-4 border-primaryBg"
      >
        <base-input
          label="organization name"
          placeholder="full organization name"
          class="col-span-2"
          required
          v-model="organizationStore.name"
          :error="organizationStore.jerrors.name"
        />
        <base-input
          label="short name"
          placeholder="2 - 8 characters"
          class=""
          required
          v-model="organizationStore.shortName"
          :error="organizationStore.jerrors.shortName"
        />
        <base-input
          label="unique code"
          placeholder="2 - 8 characters"
          class=""
          required
          v-model="organizationStore.code"
          :error="organizationStore.jerrors.code"
        >
          <template #suffix>
            <!-- <base-button icon="" type="secondary" /> -->
          </template>
        </base-input>
      </div>
      <div class="px-3 slide-right">
        <div class="text-xl lowercase tracking-wider">
          <base-radio
            label="Select business type that best fits your business"
            :items="businessTypeOptions"
            v-model="organizationStore.businessType"
            :error="organizationStore.jerrors.businessType"
            containerClass="grid grid-cols-2 gap-3 max-w-xl"
          >
            <template #item="{ item }">
              <div class="space-y-1">
                <div
                  class="capitalize leading-tight flex flex-shrink-0 text-sm"
                >
                  {{ item.label }}
                </div>
                <div
                  v-if="item.value == organizationStore.businessType"
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
  </div>
</template>

<script setup>
import BaseRadio from '@/components/base/BaseRadio.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import { useOrganizationStore } from "../store.js"
// import { useStore } from "pinia";
let businessTypeOptions = [
  {
    label: "super market",
    value: "super market",
    detail: "super market",
  },
  {
    label: "spare part",
    value: "spare part",
    detail: "spare part",
  },
  {
    label: "manufacturing",
    value: "manufacturing",
    detail: "purchasing ingredients and manufacturing own items",
  },
  {
    label: "restaurant",
    value: "restaurant",
    detail: "",
  },
  {
    label: "retail",
    value: "retail",
    detail: "purchasing in wholesale and selling for customers",
  },
  {
    label: "other",
    value: "other",
  },
]
let organizationStore = useOrganizationStore()
</script>

<style></style>
