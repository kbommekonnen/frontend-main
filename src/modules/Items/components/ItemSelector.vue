<template>
  <div class="flex flex-col space-y-3">
    <base-select
      v-model="item"
      :label="label"
      :placeholder="placeholder"
      v-bind="$attrs"
      searchable
      :items="items"
      @input="hanldeInput"
      @update:modelValue="updateValue"
    >
      <template #default="{ item }">
        <div
          v-if="!item"
          class="flex-shrink-0 flex-auto overflow-hidden text-overflow-ellipsis"
        >
          {{ placeholder }}
        </div>
        <div v-else class="w-full flex items-center flex-shrink-0 flex-auto">
          <div class="flex-grow">
            <slot :item="item" class="">{{ item.label }}</slot>
          </div>
          <div class="float-right" @click.stop="reset">
            <base-icon
              name="times"
              class="text-textLight hover:text-textDark cursor-pointer"
            />
          </div>
        </div>
      </template>
    </base-select>
  </div>
</template>

<script setup>
import { inject, onMounted, ref } from "vue"
import api from "../api.js"

const getRequest = inject("getRequest")

let items = ref([])
const props = defineProps({
  modelValue: {},
  label: { type: String, default: "item" },
  placeholder: { type: String, default: "select item" },
})
const item = ref(props.modelValue)

const emit = defineEmits(["update:modelValue", "update:model-value"])

onMounted(async () => {
  const response = await getRequest(api.getComplete)
  if (response) {
    items.value = response.items.map(
      ({ name: label, _id: value, ...rest }) => ({ label, value, rest }),
    )
    autoPopulateDefaultValue()
  }
})

function autoPopulateDefaultValue() {
  const defaultItem = items.value.find(({ rest }) => rest.isDefault)
  if (defaultItem) {
    item.value = defaultItem.value
    emit("update:modelValue", defaultItem.value)
  } else if (items.value.length == 1) {
    // auto select if there is only one option
    item.value = items.value[0].value
    emit("update:modelValue", items.value[0].value)
  }
}

function reset() {
  item.value = ""
  emit("update:modelValue", "")
}

function updateValue(value) {
  emit("update:modelValue", value)
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
