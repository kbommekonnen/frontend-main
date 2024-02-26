<template>
  <!-- upload image -->
  <div class="flex flex-col items-center space-y-3">
    <div class="font-bold text-textLight text-xl capitalize">{{ $t(props.label) }}</div>
    <div
      class="bg-primaryBg text-white rounded h-48 w-44 cursor-pointer"
      @click="openFileSelector"
    >
      <!-- placeholder -->
      <input
        type="file"
        class="hidden h-full w-full"
        ref="imageFileInput"
        @change="handleFileSelect"
      />
      <div v-if="pictureUrl" class="h-full w-full">
        <img ref="upload-img" :src="pictureUrl" class="h-full w-full" />
      </div>
      <!-- placeholder -->
      <div
        class="h-full flex flex-col space-y-6 justify-end items-center py-5 text-center cursor-pointer"
      >
        <input
          type="file"
          class="hidden h-full w-full"
          ref="imageFileInput"
          @change="handleFileSelect"
        />
        <base-icon :size="34" name="plus" />
        <div class="text-xl">{{ $t("upload image") }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue"

let props = defineProps({
  modelValue: {},
  size: { type: Number, default: 16 },
  vertical: { type: Boolean, default: false },
  horizontal: { type: Boolean, default: false },
  label: {type: String, default: 'Image'},
})
const emit = defineEmits(["input", "update:modelValue"])
let imageFileInput = ref(null)

const pictureUrl = computed(() =>
  props.modelValue ? URL.createObjectURL(props.modelValue) : "",
)

function openFileSelector() {
  imageFileInput.value.click()
}
function handleFileSelect() {
  emit("update:modelValue", imageFileInput.value.files[0])
}
</script>

<style></style>
