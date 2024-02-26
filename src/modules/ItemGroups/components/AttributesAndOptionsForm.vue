<template>
  <div
    class="flex flex-col space-y-3 h-full items-start"
    @mouseenter="showAddMore = true"
    @mouseleave="showAddMore = false"
  >
    <div
      class="w-full capitalize text-xl tracking-wider border-b-2 border-primaryBg py-1"
    >
      create attributes and options
    </div>
    <div class="w-full flex space-x-3 tracking-wider px-2">
      <div class="w-1/3 text-textDark">Attribute</div>
      <div class="w-2/3 text-textDark">Options</div>
    </div>
    <div
      class="slide-right flex-grow w-full px-2 capitalize space-y-2 flex flex-col justify-start"
    >
      <div
        v-for="(attribute, i) in store.attributes"
        :key="i"
        class="w-full flex space-x-3 bg-secondaryBg items-center rounded p-"
      >
        <base-input
          v-model="attribute.name"
          placeholder="e.g size"
          padding="small"
          class="w-1/3 text-xl"
        />
        <div class="w-2/3 flex items-center space-x-2">
          <base-chips
            v-model="attribute.options"
            :value="attribute.options"
            placeholder="e.g size"
            padding="small"
            class="text-center text-xl"
          />
          <base-icon
            name="times"
            class="text-lightDanger cursor-pointer"
            @click="removeAttribute(i)"
          />
        </div>
      </div>
    </div>
    <div
      class="flex items-center space-x-1 self-end cursor-pointer hover:bg-primaryBg hover:text-textDark p-2"
      @click="addMoreAttribute"
    >
      <base-icon name="plus" class="text-primary" />
      <div class="">add more attribute</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useItemGroupstore } from "../store.js"

let store = useItemGroupstore()

function addMoreAttribute() {
  store.attributes.push({ name: ref(""), options: ref([]) })
}
function removeAttribute(i) {
  store.attributes.splice(i, 1)
}
</script>

<style></style>
