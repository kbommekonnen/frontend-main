<template>
  <div
    class="group relative bg-brightGray rounded-ilg"
    :class="{
      'h-full min-h-screen space-y-0': align === 'vertical',
      'flex flex-wrap justify-center': align === 'horizontal',
    }"
  >
    <nav-item
      @toggle-active-nav="toggleActiveNav"
      @toggle-active-group="toggleActiveGroup"
      v-for="(nav, index) in grantedNavs"
      :key="index"
      :nav="nav"
      :active="active"
      :active_group="active_group"
    />
  </div>
</template>

<script>
/* eslint-disable no-undef */
export default {
  props: {
    align: {
      type: String,
      default: "Vertical",
    },
    navs: {
      type: Array,
    },
  },
  data() {
    return {
      active: "",
      active_group: "",
    }
  },
  computed: {
    grantedNavs() {
      return this.navs.filter(({ code }) => !code || this.isGranted(code))
    },
  },
  methods: {
    toggleActiveNav(nav) {
      this.active = nav
    },
    toggleActiveGroup(nav) {
      this.active_group = nav
    },
  },
}
</script>

<style></style>
