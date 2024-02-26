<template>
  <div class="flex flex-col space-y-3">
    <base-select
      v-model="paymentMode"
      :label="label"
      :placeholder="placeholder"
      v-bind="attrs"
      :items="paymentModes"
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

let paymentModes = ref([])
const props = defineProps({
  modelValue: {},
  label: { type: String, default: "payment mode" },
  placeholder: { type: String, default: "select payment mode" },
})
const paymentMode = ref(props.modelValue)

const emit = defineEmits(["update:modelValue", "update:model-value"])

onMounted(async () => {
  const response = await getRequest(api.getAll)
  if (response) {
    paymentModes.value = response.items.map(
      ({ name: label, _id: value, ...rest }) => ({ label, value, rest }),
    )
    autoPopulateDefaultValue()
  }
})

function autoPopulateDefaultValue() {
  const defaultPaymentMode = paymentModes.value.find(
    ({ rest }) => rest.isDefault,
  )
  if (defaultPaymentMode) {
    paymentMode.value = defaultPaymentMode.value
    emit("update:modelValue", defaultPaymentMode.value)
  } else if (paymentModes.value.length == 1) { // auto select if there is only one option
    paymentMode.value = paymentModes.value[0].value
    emit("update:modelValue", paymentModes.value[0].value)
  }
}

function reset() {
  paymentMode.value = ""
  emit("update:modelValue", "")
}

function updateValue(value) {
  emit("update:modelValue", value)
}
</script>

<style scoped>
.paymentMode {
  @apply bg-secondaryBg;
}
.paymentMode:hover {
  @apply bg-primaryBg font-semibold;
}
</style>
