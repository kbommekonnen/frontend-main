<template>
  <div class="flex flex-col space-y-3">
    <base-select
      v-model="measurementUnit"
      :label="label"
      :placeholder="placeholder"
      v-bind="$attrs"
      :items="measurementUnits"
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

let measurementUnits = ref([])
const props = defineProps({
  modelValue: {},
  label: { type: String, default: "name" },
  placeholder: { type: String, default: "select measurement unit" },
})
const measurementUnit = ref(props.modelValue)

const emit = defineEmits(["update:modelValue", "update:model-value"])

onMounted(async () => {
  const response = await getRequest(api.getAll)
  if (response) {
    measurementUnits.value = response.items.map(
      ({ name: label, _id: value, ...rest }) => ({ label, value, rest }),
    )
    autoPopulateDefaultValue()
  }
})

function autoPopulateDefaultValue() {
  const defaultMeasurementUnit = measurementUnits.value.find(
    ({ rest }) => rest.isDefault,
  )
  if (defaultMeasurementUnit) {
    measurementUnit.value = defaultMeasurementUnit.value
    emit("update:modelValue", defaultMeasurementUnit.value)
  } else if (measurementUnits.value.length == 1) { // auto select if there is only one option
    measurementUnit.value = measurementUnits.value[0].value
    emit("update:modelValue", measurementUnits.value[0].value)
  }
}

function reset() {
  measurementUnit.value = ""
  emit("update:modelValue", "")
}

function updateValue(value) {
  emit("update:modelValue", value)
}
</script>

<style scoped>
.measurementUnit {
  @apply bg-secondaryBg;
}
.measurementUnit:hover {
  @apply bg-primaryBg font-semibold;
}
</style>
