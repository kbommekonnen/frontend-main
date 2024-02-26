<template>
  <div class="flex flex-col space-y-3 items-start">
    <div
      class="w-full capitalize text-xl tracking-wider border-b-2 border-primaryBg py-1"
    >
      contact address
    </div>
    <div
      class="w-full flex flex-col lg:flex-row lg:space-x-6 space-y-3 lg:space-y-0"
    >
      <div
        class="flex-grow capitalize grid grid-cols-2 gap-4 content-start border-2 p-4 border-primaryBg"
      >
        <base-input
          label="email"
          placeholder="example@domain.com"
          class="col-span-2"
          v-model="contactAddress.email"
        />
        <base-input
          label="website"
          placeholder="www.example.com"
          class="col-span-2"
          v-model="contactAddress.website"
        >
        </base-input>
        <div
          class="grid grid-cols-5 gap-x-3 gap-y-4 items-end"
          :class="{ 'col-span-2 ': contactAddress.tel.length == 1 }"
          v-for="(tel, i) in contactAddress.tel"
          :key="i"
        >
          <base-input
            label="phone number"
            placeholder="+251910101000"
            class="col-span-4"
            :required="i == 0"
            v-model="contactAddress.tel[i]"
          />

          <base-icon
            name="plus"
            @click="contactAddress.addTel"
            class="cursor-pointer mb-4 text-textDark"
            v-if="i == contactAddress.tel.length - 1"
          />
          <base-icon
            name="times"
            @click="contactAddress.delTel(i)"
            class="cursor-pointer mb-4 text-error"
            v-else
          />
        </div>
      </div>
      <div
        class="capitalize grid grid-cols-2 gap-4 content-start border-2 p-4 border-primaryBg"
      >
        <base-input
          label="country"
          placeholder="Ethiopia"
          class=""
          v-model="contactAddress.country"
        />
        <base-input
          label="region"
          placeholder="tigray"
          class=""
          required
          v-model="contactAddress.state"
        />
        <base-input
          label="city"
          placeholder="Mekelle"
          class=""
          required
          v-model="contactAddress.city"
        >
        </base-input>
        <base-input
          label="specific address"
          placeholder="mekelle adishumdhun"
          class=""
          v-model="contactAddress.address"
        >
        </base-input>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseIcon from '@/components/base/BaseIcon.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import { useContactAddressStore } from "../store.js"

let contactAddress = useContactAddressStore()
</script>

<style></style>
