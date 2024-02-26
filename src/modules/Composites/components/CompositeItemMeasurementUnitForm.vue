<template>
  <div
    class="flex flex-col space-y-3 h-full items-start"
    @mouseenter="showMoreActions = true"
    @mouseleave="showMoreActions = false"
  >
    <div
      class="w-full capitalize text-xl tracking-wider border-b-2 border-primaryBg py-1"
    >
      unit of measurement
    </div>
    <div class="w-full flex justify-start">
      <base-select v-model="store.primaryMeasurementUnit" :composites="units" />
    </div>
    <div
      class="slide-right flex-grow w-full px-2 capitalize space-y-2 flex flex-col justify-center"
    >
      <div
        v-for="(unit, index) in store.measurements"
        :key="unit.unit"
        class="grid md:grid-cols-6 gap-3 w-full bg-secondaryBg text-center composites-center rounded p-"
      >
        <div class="text-end">1</div>
        <div class="flex-grow">
          {{ unit.shortName }}
        </div>

        <div
          class="flex space-x-1 col-span-2 h-full border-2 border-textLight composites-center"
        >
          <div
            class="bg-primaryBg pl-1 cursor-pointer"
            @click="--unit.quantity"
          >
            <base-icon name="minus" class="text-lightDanger" />
          </div>
          <base-input
            type="number"
            v-model="unit.quantity"
            padding="small"
            class="flex-grow text-center text-xl"
          />
          <div
            class="bg-primary-bg pr-1 cursor-pointer"
            @click="++unit.quantity"
          >
            <base-icon name="plus" class="text-primary" />
          </div>
        </div>
        <div>{{ primaryMeasurementUnit.shortName }}</div>
        <div
          v-if="showMoreActions"
          @click="removeUnit(index)"
          class="cursor-pointer text-error"
        >
          <base-icon name="times" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCompositestore } from "../store.js"
import measurementUnitApi from "../../MeasurementUnits/api.js"
import { computed, inject, ref } from "vue"

let store = useCompositestore()

const getRequest = inject("getRequest")
let showMoreActions = ref(false)
let units = ref([])

const primaryMeasurementUnit = computed(
  () =>
    units.value.find(({ value }) => (value = store.primaryMeasurementUnit)) ||
    {},
)

getRequest(measurementUnitApi.getAll).then(({ error, composites }) => {
  if (composites) {
    units.value = composites.map(({ id, name, shortName }) => ({
      label: name,
      value: id,
      shortName,
    }))
  }

  if (composites.length < 5) {
    store.measurements = units.value.map(({ label, value, shortName }) => ({
      name: ref(label),
      shortName: ref(shortName),
      unit: ref(value),
      quantity: ref(1),
    }))
  } else {
    store.measurements = units.value.slice(0, 3).map(({ label, value }) => ({
      name: ref(label),
      unit: ref(value),
      quantity: ref(0),
    }))
  }
})

function removeUnit(index) {
  store.measurements.splice(index, 1)
}

const measurementOptions = computed(() =>
  units.value.filter(
    ({ value }) => !store.measurements.find(({ unit }) => unit == value),
  ),
)
</script>

<style></style>
