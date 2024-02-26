<template>
  <div class="w-full h-full min-h-full space-y-0 max-w-8">
    <div class="flex h-full w-screen space-x-1 pl-8 pr-4 px-32">
      <div
        class="flex flex-col space-y-1 border-r-2 py-2 px-4 border-primaryBg"
      >
        <div
          v-for="({ label, success, error }, i) in steps"
          class="flex flex-shrink-0 space-x-3 items-center cursor-pointer rounded px-3"
          :class="{
            'text-white bg-primary ': i == active,
            'text-textMedium': i != active,
          }"
          :key="i"
          @click="goTo(i)"
        >
          <div class="flex h-full space-x-1 items-center">
            <!-- <div
							class="w-1 h-full py-2 rounded"
							:class="{
								'bg-primary': i == active,
								'bg-transparent': i != active,
							}"
						></div> -->
            <base-icon
              :name="error ? 'exclamation-triangle' : 'check-circle'"
              :class="{
                'text-white': i == active && !error,
                'text-primary': i != active && success,
                'opacity-50': !success && !error,
                'text-error': error,
              }"
            />
          </div>
          <div class="capitalize py-2">
            {{ label }}
          </div>
        </div>
      </div>
      <div class="flex-grow flex flex-col space-y-1">
        <component :is="activeComponent" class="flex-grow p-2"></component>
        <div
          class="flex justify-between px-4 py-2 border-t-2 border-primaryBg capitalize"
        >
          <base-button
            :disabled="active == 0"
            type="secondary"
            icon="chevron-left"
            label="prev"
          />
          <base-button
            :disabled="active == steps.length - 1"
            type="secondary"
            icon="chevron-right"
            :iconRight="true"
            label="next"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
export default {
  name: "StepsNavigation",
  props: {
    steps: {
      type: Array,
    },
    active: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {}
  },
  computed: {
    activeComponent() {
      return this.steps.find((step, i) => i == this.active).component
    },
    completedSuccessfully() {
      return this.steps.find(({ success }) => !success) ? false : true
    },
    canRegisterOrganization() {
      return this.completedSuccessfully && this.active == this.steps.length - 1
    },
  },
  methods: {
    goNext() {
      this.$emit("set-active-step", --this.active)
    },
    goPrev() {
      this.$emit("set-active-step", ++this.active)
    },
    goTo(step) {
      console.log(step)
      this.$emit("set-active-step", step)
    },
  },
}
</script>

<style></style>
