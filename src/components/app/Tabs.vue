<template>
  <div class="space-y-1">
    <div class="flex group border-b border-primaryBg py-2">
      <div class="flex space-x-2">
        <div
          v-for="(tab, i) in realTabs"
          :key="i"
          class="flex-grow flex flex-col flex-shrink-0 tracking-widest hover:text-primary justify-center items-center space-y-1 space-x-2 cursor-pointer hover:opacity-75 pt-2 px-4"
          :class="{
            'text-primary ': tab.isActive,
            'text-textMedium': !tab.isActive,
          }"
          @click="selectTab(i)"
        >
          <div class="flex space-x-3">
            <div v-if="tab.icon">
              <BaseIcon :name="tab.icon" :size="18" />
            </div>
            <div :class="tab.icon ? 'text-sm' : ''" class="uppercase text-sm">
              {{ tab.title }}
            </div>
          </div>
          <div
            class="h-1 w-8 bg-primary rounded"
            :class="{
              'bg-primary': i == activeIndex,
              'bg-transparent': i != activeIndex,
            }"
          ></div>
        </div>
      </div>
      <slot name="more-actions"></slot>
    </div>
    <div>
      <slot>
        <component :is="activeTab.component"></component>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["tabs"],
  data() {
    return {
      activeIndex: 0, //selected index
    }
  },
  computed: {
    realTabs() {
      return this.tabs
    },
    activeTab() {
      return this.realTabs[this.activeIndex]
    },
  },
  methods: {
    selectTab(i) {
      this.activeIndex = i
      this.realTabs.forEach((tab, index) => {
        tab.isActive = index === i
      })
      this.$emit("toggle-tab", this.activeIndex)
    },
  },
  created() {
    this.$nextTick(() => {
      this.selectTab(0)
    })
  },
}
</script>

<style></style>
